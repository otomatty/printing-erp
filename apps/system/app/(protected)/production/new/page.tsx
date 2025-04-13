'use client';

import { NewJobHeader } from './_components/new-job-header';
import { BasicInfoForm } from './_components/basic-info-form';
import { ProductSpecsForm } from './_components/product-specs-form';
import { ProcessSettingsForm } from './_components/process-settings-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // フォームデータの取得
    const formData = new FormData(event.currentTarget);

    try {
      // TODO: APIエンドポイントへのPOSTリクエスト
      console.log('フォームデータを送信:', Object.fromEntries(formData));

      // 一時的に製造管理ページへリダイレクト
      // 実際の実装では、APIレスポンスを待ってからリダイレクト
      setTimeout(() => {
        router.push('/system/production');
      }, 1000);
    } catch (error) {
      console.error('エラー:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <NewJobHeader />

      <form id="new-job-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicInfoForm />
          <ProductSpecsForm />
          <ProcessSettingsForm />
        </div>

        {/* 非表示の送信ボタン (NewJobHeaderのボタンからフォーム送信) */}
        <button type="submit" hidden disabled={isSubmitting}>
          登録する
        </button>
      </form>
    </div>
  );
}
