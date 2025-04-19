'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import { Card } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { Textarea } from '@kit/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@kit/ui/select';
import type {
  InquirySource,
  InquiryType,
  PriorityLevel,
} from '~/types/inquiries';

interface InquiryFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function InquiryForm({ onSuccess, onCancel }: InquiryFormProps) {
  const [source, setSource] = useState<InquirySource>('web');
  const [type, setType] = useState<InquiryType>('quote_request');
  const [companyName, setCompanyName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: サーバーアクションでフォームデータを送信
    console.log({
      source,
      type,
      companyName,
      customerName,
      email,
      phone,
      preferredContact,
      priority,
      subject,
      content,
    });
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="source">受付チャネル</Label>
          <Select
            value={source}
            onValueChange={(v) => setSource(v as InquirySource)}
          >
            <SelectTrigger id="source" className="mt-1 w-full">
              <SelectValue placeholder="チャネルを選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="phone">電話</SelectItem>
              <SelectItem value="email">メール</SelectItem>
              <SelectItem value="other">その他</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="type">問い合わせ種別</Label>
          <Select value={type} onValueChange={(v) => setType(v as InquiryType)}>
            <SelectTrigger id="type" className="mt-1 w-full">
              <SelectValue placeholder="種類を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quote_request">見積依頼</SelectItem>
              <SelectItem value="product_inquiry">製品相談</SelectItem>
              <SelectItem value="order_status">注文状況</SelectItem>
              <SelectItem value="complaint">苦情・クレーム</SelectItem>
              <SelectItem value="support">サポート</SelectItem>
              <SelectItem value="other">その他</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="companyName">会社名</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 w-full"
          />
        </div>
        <div>
          <Label htmlFor="customerName">氏名</Label>
          <Input
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 w-full"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full"
          />
        </div>
        <div>
          <Label htmlFor="phone">電話番号</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full"
          />
        </div>
        <div>
          <Label htmlFor="preferredContact">希望連絡方法</Label>
          <Input
            id="preferredContact"
            value={preferredContact}
            onChange={(e) => setPreferredContact(e.target.value)}
            className="mt-1 w-full"
          />
        </div>
        <div>
          <Label htmlFor="priority">優先度</Label>
          <Select
            value={priority}
            onValueChange={(v) => setPriority(v as PriorityLevel)}
          >
            <SelectTrigger id="priority" className="mt-1 w-full">
              <SelectValue placeholder="優先度を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">低</SelectItem>
              <SelectItem value="medium">中</SelectItem>
              <SelectItem value="high">高</SelectItem>
              <SelectItem value="urgent">緊急</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="subject">件名</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 w-full"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="content">内容</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 w-full"
            rows={5}
          />
        </div>
      </div>
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
