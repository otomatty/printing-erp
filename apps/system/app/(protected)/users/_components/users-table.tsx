'use client'; // テーブルのインタラクションのためにクライアントコンポーネントにする必要があるかも

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import { Badge } from '@kit/ui/badge';
import {
  CheckCircle,
  XCircle,
  Clock,
  MailQuestion,
  MoreHorizontal,
  UserCog,
  Trash2,
  Send,
} from 'lucide-react';
import type { UserRow } from '~/types/userRow'; // ★ UserRow 型をインポート
import type { Database } from '@kit/supabase/database'; // ★ Enum 型のためにインポート
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import { Button } from '@kit/ui/button';
import { formatDistanceToNowStrict } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { resendInvitationAction } from '~/_actions/users/resendInvitationAction';
import { cancelInvitationAction } from '~/_actions/users/cancelInvitationAction';

// TODO: ここも本当は any じゃなくて AdminUser 型を使うのよ！
// import type { AdminUser } from '~/types/adminUser';

// interface UsersTableProps {
//   users: AdminUser[];
// }
interface UsersTableProps {
  users: UserRow[]; // ★ any を UserRow[] に変更
}

export function UsersTable({ users }: UsersTableProps) {
  const [isPending, startTransition] = useTransition();

  // 役割表示用のヘルパー関数とか作ると綺麗かもね
  const getRoleBadge = (
    role: Database['public']['Enums']['admin_role'] | 'invited'
  ) => {
    switch (role) {
      case 'admin':
        // 管理者は Destructive (赤系) を維持。元々白文字のはず
        return (
          <Badge variant="destructive" className="text-white">
            管理者
          </Badge>
        );
      case 'staff':
        // スタッフは青系にしてみるわ
        return (
          <Badge className="border-transparent bg-blue-600 text-white hover:bg-blue-700">
            スタッフ
          </Badge>
        );
      case 'invited': // ★ 招待中ユーザー用の表示
        // 招待中はグレー系で
        return (
          <Badge className="border-transparent bg-gray-500 text-white hover:bg-gray-600">
            招待中
          </Badge>
        );
      default: {
        // 未知のロールが来た場合のフォールバック
        const exhaustiveCheck: never = role;
        console.error('Unknown user role:', exhaustiveCheck);
        // 不明な場合はデフォルトの outline に戻す
        return <Badge variant="outline">不明</Badge>;
      }
    }
  };

  // ★ ステータス表示用のヘルパー関数 (改善)
  const getStatusBadge = (
    status: UserRow['is_active'] | UserRow['invitation_status'], // 型を統合
    type: UserRow['type']
  ) => {
    if (type === 'admin_user') {
      return status ? ( // is_active
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          <CheckCircle className="mr-1 h-4 w-4" />
          アクティブ
        </Badge>
      ) : (
        <Badge variant="outline">
          <XCircle className="mr-1 h-4 w-4" />
          非アクティブ
        </Badge>
      );
    }
    // invitation_status
    switch (status) {
      case 'pending':
        return (
          <Badge variant="secondary">
            <MailQuestion className="mr-1 h-4 w-4" />
            承諾待ち
          </Badge>
        );
      case 'verified': // 多分これは「承諾済みだけどまだユーザー登録してない」状態よね？言葉を変えるわ
        return (
          <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Clock className="mr-1 h-4 w-4" />
            登録待ち {/* 「検証済み」から変更 */}
          </Badge>
        );
      // TODO: 他のステータス (expiredとか?) も考慮するべきじゃない？
      default:
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-4 w-4" />
            {status || '不明'}
          </Badge>
        );
    }
  };

  // ★ 有効期限表示用のヘルパー関数 (date-fns を使用)
  const getExpirationDate = (expiresAt: string | null) => {
    if (!expiresAt) return 'なし';
    try {
      const date = new Date(expiresAt);
      // 期限切れかどうかで表示を変える
      if (date < new Date()) {
        return (
          <span className="text-destructive">
            期限切れ (
            {formatDistanceToNowStrict(date, { addSuffix: true, locale: ja })})
          </span>
        );
      }
      return formatDistanceToNowStrict(date, { addSuffix: true, locale: ja });
    } catch (e) {
      console.error('Invalid date format for expiration:', expiresAt);
      return '無効な日付';
    }
  };

  // 再送処理
  const handleResend = (invitationId: string) => {
    startTransition(async () => {
      const result = await resendInvitationAction(invitationId);
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(result.success);
      }
    });
  };

  // 取り消し処理
  const handleCancel = (invitationId: string) => {
    // TODO: 本当は確認ダイアログを出すべき
    startTransition(async () => {
      const result = await cancelInvitationAction(invitationId);
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(result.success || '招待を取り消しました');
      }
    });
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>氏名</TableHead>
            <TableHead>メールアドレス</TableHead>
            <TableHead>役割</TableHead>
            <TableHead className="text-center">ステータス</TableHead>
            <TableHead>登録/招待日時</TableHead>
            <TableHead>有効期限</TableHead>
            <TableHead className="text-right">アクション</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                ユーザーがいません。「招待する」ボタンから追加してください。
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                className={user.type === 'invitation' ? 'bg-muted/50' : ''}
              >
                <TableCell>
                  {user.type === 'admin_user' ? (
                    `${user.last_name || ''} ${user.first_name || ''}`
                  ) : (
                    <span className="italic text-muted-foreground">
                      <MailQuestion className="mr-1 inline-block h-4 w-4" />
                      招待中ユーザー
                    </span>
                  )}
                </TableCell>
                <TableCell>{user.email || '-'}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell className="text-center">
                  {getStatusBadge(
                    user.type === 'admin_user'
                      ? user.is_active
                      : user.invitation_status,
                    user.type
                  )}
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleString('ja-JP', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell>
                  {user.type === 'admin_user'
                    ? 'なし'
                    : getExpirationDate(user.expires_at)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        disabled={isPending}
                      >
                        <span className="sr-only">アクションを開く</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user.type === 'admin_user' ? (
                        <>
                          <DropdownMenuItem
                            onClick={() => alert(`ユーザー編集: ${user.id}`)}
                            disabled={isPending}
                          >
                            <UserCog className="mr-2 h-4 w-4" />
                            編集
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`削除確認: ${user.id}`)}
                            className="text-destructive"
                            disabled={isPending}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            削除
                          </DropdownMenuItem>
                        </>
                      ) : (
                        // 招待中ユーザー用のアクション
                        <>
                          <DropdownMenuItem
                            onClick={() => handleResend(user.id)}
                            disabled={
                              user.invitation_status !== 'pending' || isPending
                            }
                          >
                            <Send className="mr-2 h-4 w-4" />
                            招待を再送
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleCancel(user.id)}
                            className="text-destructive"
                            disabled={isPending}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            招待を取り消し
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
