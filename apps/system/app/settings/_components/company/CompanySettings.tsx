'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { CompanyInfo } from './CompanyInfo';

export function CompanySettings() {
  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>会社情報設定</CardTitle>
          <CardDescription>
            会社情報と関連するブランディング設定を管理します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyInfo />
        </CardContent>
      </Card>
    </div>
  );
}
