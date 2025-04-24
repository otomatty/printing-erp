'use client';

import { useState, useRef, useTransition, useEffect } from 'react';
import { File, Trash2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@kit/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@kit/ui/alert-dialog';
import { Progress } from '@kit/ui/progress';
import { format, formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

import {
  getAttachmentUploadUrl,
  saveAttachmentMetadata,
  deleteAttachment,
} from '~/_actions/news';
import type { AttachmentMetadata } from '~/types/news';

/**
 * ファイルアップロードのステータス
 */
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

/**
 * ファイルサイズを人間が読める形式に変換
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

/**
 * ファイルの種類を取得
 */
function getFileIconAndType(fileName: string): {
  icon: React.ReactNode;
  typeName: string;
} {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  // デフォルト値
  let typeName = '不明なファイル';
  let icon = <File className="h-5 w-5" />;

  // 拡張子に基づいてファイルタイプを判定
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
    typeName = '画像ファイル';
    icon = <File className="h-5 w-5 text-blue-500" />;
  } else if (['pdf'].includes(extension)) {
    typeName = 'PDFファイル';
    icon = <File className="h-5 w-5 text-red-500" />;
  } else if (['doc', 'docx'].includes(extension)) {
    typeName = 'Wordファイル';
    icon = <File className="h-5 w-5 text-blue-700" />;
  } else if (['xls', 'xlsx'].includes(extension)) {
    typeName = 'Excelファイル';
    icon = <File className="h-5 w-5 text-green-600" />;
  } else if (['ppt', 'pptx'].includes(extension)) {
    typeName = 'PowerPointファイル';
    icon = <File className="h-5 w-5 text-orange-500" />;
  } else if (['zip', 'rar', '7z'].includes(extension)) {
    typeName = '圧縮ファイル';
    icon = <File className="h-5 w-5 text-yellow-500" />;
  } else if (['txt', 'csv'].includes(extension)) {
    typeName = 'テキストファイル';
    icon = <File className="h-5 w-5 text-gray-500" />;
  }

  return { icon, typeName };
}

interface AttachmentsManagerProps {
  newsId: string;
}

export default function AttachmentsManager({
  newsId,
}: AttachmentsManagerProps) {
  const [attachments, setAttachments] = useState<AttachmentMetadata[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // コンポーネントマウント時に添付ファイル一覧を取得
  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const response = await fetch(`/api/news/${newsId}/attachments`);
        if (!response.ok) throw new Error('添付ファイルの取得に失敗しました');

        const data = await response.json();
        setAttachments(data.attachments || []);
      } catch (error) {
        console.error('添付ファイル取得エラー:', error);
        toast.error('添付ファイルの取得に失敗しました');
      }
    };

    fetchAttachments();
  }, [newsId]);

  // ファイル選択ハンドラー
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0] || null);
    }
  };

  // ファイル選択をリセット
  const resetFileSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ファイルアップロード処理
  const uploadFile = async () => {
    if (!selectedFile) return;

    try {
      setUploadStatus('uploading');
      setUploadProgress(0);

      // ファイルタイプの確認
      const fileType = selectedFile.type || 'application/octet-stream';

      // 署名付きURLの取得
      const { uploadUrl, filePath, error } = await getAttachmentUploadUrl(
        newsId,
        selectedFile.name,
        fileType
      );

      if (error || !uploadUrl || !filePath) {
        throw new Error(error || 'アップロードURLの取得に失敗しました');
      }

      // ファイルアップロード
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          setUploadProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // メタデータの保存
          const result = await saveAttachmentMetadata(newsId, {
            file_name: selectedFile.name,
            file_path: filePath,
            file_type: fileType,
            file_size: selectedFile.size,
          });

          if (result.success && result.data) {
            setAttachments((prev) => [...prev, result.data]);
            setUploadStatus('success');
            toast.success('ファイルがアップロードされました');
            resetFileSelection();
          } else {
            throw new Error(result.error || 'メタデータの保存に失敗しました');
          }
        } else {
          throw new Error(`アップロード失敗: ${xhr.status}`);
        }
      });

      xhr.addEventListener('error', () => {
        throw new Error('ネットワークエラーが発生しました');
      });

      xhr.addEventListener('abort', () => {
        throw new Error('アップロードが中断されました');
      });

      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', fileType);
      xhr.send(selectedFile);
    } catch (error) {
      console.error('アップロードエラー:', error);
      setUploadStatus('error');
      toast.error(
        `アップロードエラー: ${error instanceof Error ? error.message : '不明なエラー'}`
      );
    }
  };

  // ファイル削除処理
  const handleDeleteAttachment = (attachmentId: string) => {
    startTransition(async () => {
      try {
        const result = await deleteAttachment(attachmentId);

        if (result.success) {
          setAttachments((prev) =>
            prev.filter((attachment) => attachment.id !== attachmentId)
          );
          toast.success('ファイルを削除しました');
        } else {
          throw new Error(result.error || 'ファイルの削除に失敗しました');
        }
      } catch (error) {
        console.error('削除エラー:', error);
        toast.error(
          `削除エラー: ${error instanceof Error ? error.message : '不明なエラー'}`
        );
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* ファイルアップロードセクション */}
      <Card>
        <CardHeader>
          <CardTitle>ファイルアップロード</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!selectedFile ? (
              <button
                type="button"
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  クリックしてファイルを選択、または
                  <br />
                  ここにファイルをドラッグ＆ドロップ
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </button>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIconAndType(selectedFile.name).icon}
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFileSelection}
                    disabled={uploadStatus === 'uploading'}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {uploadStatus === 'uploading' && (
                  <div className="mt-3 space-y-2">
                    <Progress value={uploadProgress} />
                    <p className="text-xs text-muted-foreground text-center">
                      {uploadProgress}% アップロード中...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex space-x-2 justify-end w-full">
            <Button
              type="button"
              variant="outline"
              disabled={!selectedFile || uploadStatus === 'uploading'}
              onClick={resetFileSelection}
            >
              キャンセル
            </Button>
            <Button
              type="button"
              disabled={!selectedFile || uploadStatus === 'uploading'}
              onClick={uploadFile}
            >
              アップロード
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* 添付ファイル一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>添付ファイル一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {attachments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              添付ファイルはありません
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ファイル名</TableHead>
                  <TableHead>種類</TableHead>
                  <TableHead>サイズ</TableHead>
                  <TableHead>アップロード日時</TableHead>
                  <TableHead className="w-[100px]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attachments.map((attachment) => {
                  const { icon, typeName } = getFileIconAndType(
                    attachment.file_name
                  );
                  return (
                    <TableRow key={attachment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          {icon}
                          <span className="truncate max-w-[250px]">
                            {attachment.file_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{typeName}</Badge>
                      </TableCell>
                      <TableCell>
                        {formatFileSize(attachment.file_size)}
                      </TableCell>
                      <TableCell>
                        <span
                          title={format(
                            new Date(attachment.created_at),
                            'PPpp',
                            { locale: ja }
                          )}
                        >
                          {formatDistanceToNow(
                            new Date(attachment.created_at),
                            {
                              addSuffix: true,
                              locale: ja,
                            }
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ファイルを削除しますか？
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                この操作は元に戻せません。ファイル「
                                {attachment.file_name}
                                」を削除してよろしいですか？
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>キャンセル</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteAttachment(attachment.id)
                                }
                                disabled={isPending}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {isPending ? '削除中...' : '削除する'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
