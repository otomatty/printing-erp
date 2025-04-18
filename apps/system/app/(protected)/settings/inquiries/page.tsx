// サーバーコンポーネント
import InquirySettingsPage from './general/index';
import InquiryCategoriesPage from './categories/index';
import InquiryAutomationPage from './automation/index';
import ResponseTemplatesPage from './templates/index';
import ResponseTimeSettingsPage from './response-time/index';
import InquiryTabs from './components/inquiry-tabs';
import { Layers } from 'lucide-react';

export default async function InquiriesPage() {
  // 各タブのコンポーネントを事前にレンダリング
  const settingsContent = await Promise.resolve(<InquirySettingsPage />);
  const categoriesContent = await Promise.resolve(<InquiryCategoriesPage />);
  const automationContent = await Promise.resolve(<InquiryAutomationPage />);
  const templatesContent = await Promise.resolve(<ResponseTemplatesPage />);
  const responseTimeContent = await Promise.resolve(
    <ResponseTimeSettingsPage />
  );

  const TAB_CONFIG = [
    {
      id: 'general',
      label: '基本設定',
      iconName: 'settings',
      content: settingsContent,
    },
    {
      id: 'categories',
      label: 'カテゴリ',
      iconName: 'tag',
      content: categoriesContent,
    },
    {
      id: 'automation',
      label: '自動化',
      iconName: 'zap',
      content: automationContent,
    },
    {
      id: 'templates',
      label: '応答テンプレート',
      iconName: 'fileText',
      content: templatesContent,
    },
    {
      id: 'response-time',
      label: '応答時間',
      iconName: 'clock',
      content: responseTimeContent,
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Layers className="mr-2" />
          問い合わせ設定
        </h1>
      </div>
      <InquiryTabs tabConfig={TAB_CONFIG} />
    </div>
  );
}
