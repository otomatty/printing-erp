import { PlusCircle } from 'lucide-react';

import { Container } from '~/components/custom/container';
import { PageHeader } from '~/components/custom/page-header';
import { fetchAllUsersAndInvitations } from '~/actions/users/fetchAllUsersAndInvitations'; // これを使う
import { UsersTable } from './_components/users-table';
import { InviteUserDialog } from './_components/invite-user-dialog';
// import { Button } from '@kit/ui/button'; // InviteUserDialog が Button を内包する形にするわ
// import { UserRow } from '~/types/userRow'; // UsersTable に渡す型 (UsersTable側でimportするのでここでは不要)

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  // サーバーサイドでユーザーリストを取得
  const { data: users, error } = await fetchAllUsersAndInvitations();

  if (error) {
    // エラーハンドリングはちゃんとするのよ！ とりあえず今回はエラーメッセージ表示だけ
    return (
      <Container>
        <PageHeader
          title="ユーザー管理"
          description="ユーザー一覧の取得に失敗しました。"
        />
        <p className="text-red-500">{error.message}</p>
      </Container>
    );
  }

  if (!users) {
    // データがない場合も考慮しなさい
    return (
      <Container>
        <PageHeader
          title="ユーザー管理"
          description="システムを利用する管理者とスタッフを管理します。"
          actions={
            <InviteUserDialog /> // ユーザーがいなくても招待はできるようにするわ
          }
        />
        <p>ユーザーが見つかりません。</p>
      </Container>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="ユーザー管理"
        description="システムを利用する管理者とスタッフを管理します。"
        backLink={{
          href: '/',
          label: 'ホームに戻る',
        }}
        actions={
          <InviteUserDialog /> // 招待ボタンはダイアログコンポーネントにする
          // <Button>
          //   <PlusCircle className="mr-2 h-4 w-4" />
          //   招待する
          // </Button>
        }
      />

      <Container>
        {/* ユーザー一覧テーブル */}
        {/* TODO: users の型が any だから本当は直すのよ！ -> UserRow型を使うように UsersTable を修正する */}
        <UsersTable users={users} /> {/* UserRow[] を渡す */}
      </Container>
    </div>
  );
}
