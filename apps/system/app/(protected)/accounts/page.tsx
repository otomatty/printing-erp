export const dynamic = 'force-dynamic';

import { Save } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { Input } from '@kit/ui/input';
import { Container } from '~/components/custom/container';
import { PageHeader } from '~/components/custom/page-header';
import { fetchAdminProfile, updateAdminProfile } from '~/_actions/accounts';

export default async function AccountsPage() {
  const { data: profile, error } = await fetchAdminProfile();

  if (error) {
    return (
      <Container>
        <PageHeader title="アカウント設定" />
        <p className="text-red-500">{error.message}</p>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container>
        <PageHeader title="アカウント設定" />
        <p>プロフィールが見つかりません。</p>
      </Container>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="アカウント設定"
        backLink={{ href: '/', label: 'ホームに戻る' }}
      />
      <Container>
        <form action={updateAdminProfile} id="profile-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                メールアドレス
              </label>
              <Input
                id="email"
                name="email"
                defaultValue={profile.email ?? ''}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                名
              </label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={profile.first_name ?? ''}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                姓
              </label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={profile.last_name ?? ''}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button type="submit" form="profile-form">
              <Save className="mr-2 h-4 w-4" />
              保存
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
