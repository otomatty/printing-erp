'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@kit/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { Input } from '@kit/ui/input';
import { Textarea } from '@kit/ui/textarea';
import { Switch } from '@kit/ui/switch';
import { createFaqItem } from '~/actions/faq';
import { faqFormSchema, type FaqFormData } from '~/types/faq';

interface FaqFormProps {
  /** ページID */
  pageId: string;
  /** 入力フォームの初期値 */
  defaultValues?: Partial<FaqFormData>;
}

export default function FaqForm({ pageId, defaultValues }: FaqFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FaqFormData>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: defaultValues || {
      page_id: pageId,
      question: '',
      answer: '',
      sort_order: 0,
      is_active: true,
    },
  });

  const onSubmit = (data: FaqFormData) => {
    startTransition(async () => {
      const result = await createFaqItem(data);
      if (result.success) {
        toast.success('FAQ項目を作成しました');
        router.refresh();
      } else {
        toast.error(`エラー: ${result.error || '作成中に問題が発生しました'}`);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>質問 *</FormLabel>
              <FormControl>
                <Input placeholder="質問を入力" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>回答 *</FormLabel>
              <FormControl>
                <Textarea placeholder="回答を入力" rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sort_order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>表示順</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3">
              <FormControl>
                <Switch
                  checked={Boolean(field.value)}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
              <FormLabel>公開状態</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="mt-4">
          保存
        </Button>
      </form>
    </Form>
  );
}
