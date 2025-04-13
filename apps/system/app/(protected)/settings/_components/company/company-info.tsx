'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { Button } from '@kit/ui/button';
import { Upload, Building2, Mail, Phone, Palette, Info } from 'lucide-react';
import { Textarea } from '@kit/ui/textarea';
import {
  SegmentedControl,
  SegmentedControlContent,
  type SegmentOption,
} from '../ui/segmented-control';

export function CompanyInfo() {
  const [activeSegment, setActiveSegment] = useState('basic');

  const [companyData, setCompanyData] = useState({
    name: 'ニイヌマ企画印刷株式会社',
    shortName: 'ニイヌマ企画',
    postal: '123-4567',
    prefecture: '東京都',
    address: '新宿区西新宿1-1-1',
    phone: '03-1234-5678',
    fax: '03-1234-5679',
    email: 'info@ninuma-kikaku.co.jp',
    website: 'https://www.ninuma-kikaku.co.jp',
    description:
      '総合印刷業として、お客様の様々なニーズにお応えします。デザインから印刷、加工まで一貫してサポートいたします。',
    foundedYear: '1995',
    employees: '45',
    representative: '新沼 太郎',
  });

  const handleChange = (field: string, value: string) => {
    setCompanyData({ ...companyData, [field]: value });
  };

  const segmentOptions: SegmentOption[] = [
    { value: 'basic', label: '基本情報', icon: <Info className="h-4 w-4" /> },
    {
      value: 'branding',
      label: 'ブランディング',
      icon: <Palette className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>会社情報設定</CardTitle>
          <CardDescription>
            システムで使用する会社情報を設定します。
          </CardDescription>
          <SegmentedControl
            options={segmentOptions}
            value={activeSegment}
            onValueChange={setActiveSegment}
            className="mt-4"
          />
        </CardHeader>
        <CardContent>
          <SegmentedControlContent value="basic" activeValue={activeSegment}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">会社名</Label>
                  <Input
                    id="company-name"
                    value={companyData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-short-name">略称</Label>
                  <Input
                    id="company-short-name"
                    value={companyData.shortName}
                    onChange={(e) => handleChange('shortName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-representative">代表者</Label>
                  <Input
                    id="company-representative"
                    value={companyData.representative}
                    onChange={(e) =>
                      handleChange('representative', e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-founded">設立年</Label>
                  <Input
                    id="company-founded"
                    value={companyData.foundedYear}
                    onChange={(e) =>
                      handleChange('foundedYear', e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-postal">郵便番号</Label>
                  <Input
                    id="company-postal"
                    value={companyData.postal}
                    onChange={(e) => handleChange('postal', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-prefecture">都道府県</Label>
                  <Input
                    id="company-prefecture"
                    value={companyData.prefecture}
                    onChange={(e) => handleChange('prefecture', e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company-address">住所</Label>
                  <Input
                    id="company-address"
                    value={companyData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">電話番号</Label>
                  <Input
                    id="company-phone"
                    value={companyData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-fax">FAX番号</Label>
                  <Input
                    id="company-fax"
                    value={companyData.fax}
                    onChange={(e) => handleChange('fax', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">メールアドレス</Label>
                  <Input
                    id="company-email"
                    value={companyData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Webサイト</Label>
                  <Input
                    id="company-website"
                    value={companyData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company-description">会社概要</Label>
                  <Textarea
                    id="company-description"
                    value={companyData.description}
                    onChange={(e) =>
                      handleChange('description', e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </SegmentedControlContent>

          <SegmentedControlContent value="branding" activeValue={activeSegment}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-logo">会社ロゴ</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 border rounded-md flex items-center justify-center bg-muted">
                    <img
                      src="/company-logo.png"
                      alt="会社ロゴ"
                      className="max-w-full max-h-full p-2"
                    />
                  </div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    ロゴをアップロード
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  推奨サイズ: 400 x 400 ピクセル、最大ファイルサイズ: 2MB
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-favicon">ファビコン</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 border rounded-md flex items-center justify-center bg-muted">
                    <img
                      src="/favicon.ico"
                      alt="ファビコン"
                      className="max-w-full max-h-full p-2"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    ファビコンをアップロード
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  推奨サイズ: 32 x 32 ピクセル、形式: ICOまたはPNG
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">メインカラー</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600" />
                    <Input id="primary-color" defaultValue="#2563EB" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">サブカラー</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-800" />
                    <Input id="secondary-color" defaultValue="#1F2937" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label>システム名表示設定</Label>
                <div className="flex items-center mt-2">
                  <div className="flex items-center space-x-2 p-4 border rounded-md w-full">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{companyData.name}</span>
                    <span className="text-sm text-muted-foreground">
                      業務管理システム
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">
                    書類テンプレートのプレビュー
                  </Label>
                  <Button variant="outline" size="sm">
                    詳細設定
                  </Button>
                </div>
                <div className="border rounded-md mt-2 p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-lg font-bold">
                        {companyData.name}
                      </div>
                      <div className="text-sm">
                        〒{companyData.postal} {companyData.prefecture}
                        {companyData.address}
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{companyData.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{companyData.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-16 border flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">
                        ロゴ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SegmentedControlContent>
        </CardContent>
      </Card>
    </div>
  );
}
