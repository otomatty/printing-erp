// apps/system/app/(protected)/settings/company/page.tsx
import { Building2, Save } from 'lucide-react';
import { Button } from '@kit/ui/button';

// コンポーネントをインポート。ファイル名から推測するわよ
import { CompanyInfo } from './company-info'; // 仮に CompanyInfo
// company-settings.tsx はサイズが小さいけど、どう使うのかしらね？
// もし CompanyInfo の中で使われてないなら、ここに追加する必要があるかも。
// import { CompanySettings } from './company-settings';

export default function CompanySettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Building2 className="mr-2" />
          会社情報設定
        </h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          設定を保存
        </Button>
      </div>

      {/* ファイルが少ないから、タブは要らないわね */}
      {/* company-info.tsx がメインコンテンツでしょ？ */}
      <CompanyInfo />

      {/* もし company-settings.tsx も表示する必要があるなら、ここに追加しなさい */}
      {/* <CompanySettings /> */}
    </div>
  );
}
