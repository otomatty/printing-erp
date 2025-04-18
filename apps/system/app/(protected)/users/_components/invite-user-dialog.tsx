'use client'; // ダイアログの開閉状態を管理するためにクライアントコンポーネントにする

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { Button } from '@kit/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, // フッターも使うかも
} from '@kit/ui/dialog';
import InviteUserForm from './invite-user-form';

export function InviteUserDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleInviteSuccess = () => {
    setIsOpen(false); // 招待成功したらダイアログを閉じる
    // ここで一覧を再取得する処理とか呼べると良いわね (例: router.refresh())
    // import { useRouter } from 'next/navigation';
    // const router = useRouter(); router.refresh();
    // alert('招待を送信しました。（メール送信未実装）'); // InviteUserForm側でtoast表示するので不要
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          ユーザーを招待
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ユーザーを招待</DialogTitle>
          <DialogDescription>
            招待したいユーザーのメールアドレスを入力してください。招待メールが送信されます。
          </DialogDescription>
        </DialogHeader>
        {/* フォームをここに配置 */}
        <InviteUserForm onSuccess={handleInviteSuccess} />
        {/* <DialogFooter>
          フッターにボタンを置くなら InviteUserForm の外に出す
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
