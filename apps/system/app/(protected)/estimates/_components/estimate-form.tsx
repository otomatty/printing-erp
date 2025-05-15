'use client';

import { useState } from 'react';
import { Button } from '@kit/ui/button';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { Textarea } from '@kit/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kit/ui/tabs';
import { Popover, PopoverTrigger, PopoverContent } from '@kit/ui/popover';
import { Calendar as DateCalendar } from '@kit/ui/calendar';
import { ja } from 'date-fns/locale';
import { format } from 'date-fns';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@kit/ui/select';

interface EstimateFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EstimateForm({ onSuccess, onCancel }: EstimateFormProps) {
  // Tab1: 情報
  const [issueDate, setIssueDate] = useState<Date | undefined>(new Date());
  const [validDate, setValidDate] = useState<Date | undefined>(undefined);
  const [mainServiceCategory, setMainServiceCategory] = useState<string>('');
  const [projectType, setProjectType] = useState<string>('');
  const [projectOverview, setProjectOverview] = useState<string>('');
  const [generalNotes, setGeneralNotes] = useState<string>('');
  const [pricingContextNotes, setPricingContextNotes] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  // Tab2: 条件＆価格
  const [expectedDeadline, setExpectedDeadline] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);
  const [deliveryLocation, setDeliveryLocation] = useState<string>('');
  const [paymentTerms, setPaymentTerms] = useState<string>('');
  const [discountType, setDiscountType] = useState<string>('');
  const [discountValue, setDiscountValue] = useState<string>('');
  const [discountReason, setDiscountReason] = useState<string>('');
  const [currency, setCurrency] = useState<string>('JPY');
  const [taxRate, setTaxRate] = useState<string>('0.10');
  // Tab3: 添付
  const [attachments, setAttachments] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: サーバーアクションで送信
    console.log({
      issueDate,
      validDate,
      mainServiceCategory,
      projectType,
      projectOverview,
      generalNotes,
      pricingContextNotes,
      tags,
      expectedDeadline,
      deliveryDate,
      deliveryLocation,
      paymentTerms,
      discountType,
      discountValue,
      discountReason,
      currency,
      taxRate,
      attachments,
    });
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <Tabs defaultValue="basic" className="w-full max-w-md mx-auto">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">基本情報</TabsTrigger>
          <TabsTrigger value="overview">概要・注意事項</TabsTrigger>
          <TabsTrigger value="delivery">納期情報</TabsTrigger>
          <TabsTrigger value="pricing">価格条件</TabsTrigger>
          <TabsTrigger value="attachments">添付</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">発行日</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {format(issueDate || new Date(), 'yyyy/MM/dd', {
                      locale: ja,
                    })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DateCalendar
                    mode="single"
                    selected={issueDate}
                    onSelect={setIssueDate}
                    locale={ja}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="validDate">有効期限</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {validDate
                      ? format(validDate, 'yyyy/MM/dd', { locale: ja })
                      : '日付を選択'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DateCalendar
                    mode="single"
                    selected={validDate}
                    onSelect={setValidDate}
                    locale={ja}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="mainServiceCategory">主要サービスカテゴリ</Label>
              <Select
                value={mainServiceCategory}
                onValueChange={setMainServiceCategory}
              >
                <SelectTrigger id="mainServiceCategory">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRINTING">印刷</SelectItem>
                  <SelectItem value="WEBSITE_PRODUCTION">Web制作</SelectItem>
                  <SelectItem value="SYSTEM_DEVELOPMENT">
                    業務システム
                  </SelectItem>
                  <SelectItem value="APPLICATION_DEVELOPMENT">
                    アプリ開発
                  </SelectItem>
                  <SelectItem value="OTHER_SERVICES">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">プロジェクトタイプ</Label>
              <Input
                id="projectType"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="tags">タグ</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectOverview">プロジェクト概要</Label>
              <Textarea
                id="projectOverview"
                value={projectOverview}
                onChange={(e) => setProjectOverview(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="generalNotes">一般注意事項</Label>
              <Textarea
                id="generalNotes"
                value={generalNotes}
                onChange={(e) => setGeneralNotes(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="pricingContextNotes">
                価格コンテキスト注意事項
              </Label>
              <Textarea
                id="pricingContextNotes"
                value={pricingContextNotes}
                onChange={(e) => setPricingContextNotes(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="delivery">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expectedDeadline">予定納期</Label>
              <Input
                id="expectedDeadline"
                value={expectedDeadline}
                onChange={(e) => setExpectedDeadline(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">納期</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {deliveryDate
                      ? format(deliveryDate, 'yyyy/MM/dd', { locale: ja })
                      : '日付を選択'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DateCalendar
                    mode="single"
                    selected={deliveryDate}
                    onSelect={setDeliveryDate}
                    locale={ja}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="deliveryLocation">納期場所</Label>
              <Input
                id="deliveryLocation"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pricing">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">支払条件</Label>
              <Input
                id="paymentTerms"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="discountType">割引タイプ</Label>
              <Input
                id="discountType"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="discountValue">割引値</Label>
              <Input
                id="discountValue"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="discountReason">割引理由</Label>
              <Input
                id="discountReason"
                value={discountReason}
                onChange={(e) => setDiscountReason(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="currency">通貨</Label>
              <Input
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate">税率</Label>
              <Input
                id="taxRate"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attachments">{/* 添付部分の実装 */}</TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-3 mt-4">
        <Button variant="outline" size="sm" onClick={() => onCancel?.()}>
          キャンセル
        </Button>
        <Button type="submit" variant="default" size="sm">
          作成
        </Button>
      </div>
    </form>
  );
}
