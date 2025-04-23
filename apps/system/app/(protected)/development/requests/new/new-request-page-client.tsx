'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlIndicator,
} from '~/components/custom/segmented-controle';
import { SimpleEditor } from '~/components/tiptap/tiptap-templates/simple/simple-editor';

// 定義するテンプレートのプレースホルダー
const TEMPLATE_CONTENTS: Record<string, string> = {
  bug: `### バグ報告

**概要**:
- 発生した操作:
- 期待する動作:
- 実際の動作:
`,
  improvement: `### 機能改善

**要望内容**:
- 改善したい点:
- 理由:
`,
  feature: `### 新機能提案

**機能概要**:
- 提案内容:
- 利用シナリオ:
`,
};

export default function NewRequestPageClient() {
  const router = useRouter();
  // Retrieve screenshot from sessionStorage
  const [screenshotData, setScreenshotData] = useState<string | null>(null);
  useEffect(() => {
    const data = sessionStorage.getItem('feedback_screenshot');
    if (data) {
      setScreenshotData(data);
      sessionStorage.removeItem('feedback_screenshot');
    }
  }, []);
  const [templateType, setTemplateType] = useState<string>('bug');
  const [editorTemplate, setEditorTemplate] = useState<string>(
    TEMPLATE_CONTENTS.bug || ''
  );

  // テンプレート選択時にエディター内容を更新
  useEffect(() => {
    setEditorTemplate(TEMPLATE_CONTENTS[templateType] || '');
  }, [templateType]);

  // フォーム送信処理（サンプル）
  const handleSubmit = async () => {
    // ここでAPI呼び出し等を実装
    console.log('submit request:', { templateType, editorTemplate });
    // 完了後に一覧に戻る
    router.push('/development/requests');
  };

  return (
    <>
      <PageHeader
        title="要望を新規作成"
        backLink={{ href: '/development/requests', label: '要望一覧に戻る' }}
      />
      <Container>
        {screenshotData && (
          <div className="mb-6">
            <h2 className="font-medium mb-2">
              自動取得されたスクリーンショット
            </h2>
            <img
              src={screenshotData}
              alt="スクリーンショット"
              className="w-full border rounded"
            />
          </div>
        )}

        <div className="mb-4">
          <SegmentedControl
            value={templateType}
            onValueChange={(val) => setTemplateType(val)}
          >
            <SegmentedControlItem value="bug">バグ報告</SegmentedControlItem>
            <SegmentedControlItem value="improvement">
              機能改善
            </SegmentedControlItem>
            <SegmentedControlItem value="feature">
              新機能提案
            </SegmentedControlItem>
            <SegmentedControlIndicator />
          </SegmentedControl>
        </div>

        <div className="mb-6">
          <SimpleEditor templateContent={editorTemplate} />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          送信
        </button>
      </Container>
    </>
  );
}
