import { FileText, Image, Download, Eye, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Button } from '@kit/ui/button';
import { Separator } from '@kit/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';

type ProductionFilesProps = {
  jobId: string;
};

// モックファイルデータ
const mockFiles = [
  {
    id: 'file-1',
    name: 'デザインデータ_最終版.ai',
    type: 'design',
    size: '8.2 MB',
    uploadedBy: '鈴木デザイン',
    uploadedAt: '2023/07/05 14:30',
    icon: <Image className="h-6 w-6 text-blue-500" />,
  },
  {
    id: 'file-2',
    name: '印刷指示書.pdf',
    type: 'instruction',
    size: '1.5 MB',
    uploadedBy: '佐藤営業',
    uploadedAt: '2023/07/06 10:15',
    icon: <FileText className="h-6 w-6 text-red-500" />,
  },
  {
    id: 'file-3',
    name: '校正データ_承認済み.pdf',
    type: 'approval',
    size: '4.7 MB',
    uploadedBy: '顧客承認',
    uploadedAt: '2023/07/07 16:45',
    icon: <FileText className="h-6 w-6 text-green-500" />,
  },
  {
    id: 'file-4',
    name: '製造仕様書.pdf',
    type: 'instruction',
    size: '0.8 MB',
    uploadedBy: '佐藤営業',
    uploadedAt: '2023/07/08 09:20',
    icon: <FileText className="h-6 w-6 text-orange-500" />,
  },
];

// ファイルタイプ別のフィルター
const getFilesByType = (type: string) => {
  if (type === 'all') return mockFiles;
  return mockFiles.filter((file) => file.type === type);
};

export function ProductionFiles({ jobId }: ProductionFilesProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">関連ファイル</CardTitle>
          <Button size="sm">ファイルをアップロード</Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">すべて</TabsTrigger>
            <TabsTrigger value="design">デザイン</TabsTrigger>
            <TabsTrigger value="instruction">指示書</TabsTrigger>
            <TabsTrigger value="approval">承認書類</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <FileList files={getFilesByType('all')} />
          </TabsContent>

          <TabsContent value="design">
            <FileList files={getFilesByType('design')} />
          </TabsContent>

          <TabsContent value="instruction">
            <FileList files={getFilesByType('instruction')} />
          </TabsContent>

          <TabsContent value="approval">
            <FileList files={getFilesByType('approval')} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// ファイルリストコンポーネント
function FileList({ files }: { files: typeof mockFiles }) {
  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        ファイルが見つかりません
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {files.map((file, index) => (
        <div key={file.id}>
          <div className="flex items-center py-3 px-2 hover:bg-gray-50 rounded-md">
            <div className="mr-3">{file.icon}</div>
            <div className="flex-1">
              <p className="font-medium">{file.name}</p>
              <div className="flex text-xs text-muted-foreground mt-1">
                <p>{file.size}</p>
                <span className="mx-2">•</span>
                <p>アップロード: {file.uploadedAt}</p>
                <span className="mx-2">•</span>
                <p>{file.uploadedBy}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {index < files.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
