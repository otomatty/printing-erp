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
import { createSamplePage, updateSamplePage } from '~/_actions/sample';
import { pageFormSchema, type PageFormData } from '~/types/faq';

interface PageFormProps {
  /** ページIDがある場合は編集モード */
  pageId?: string;
  /** フォームの初期値 */
  defaultValues?: Partial<PageFormData>;
}

export default function PageForm({ pageId, defaultValues }: PageFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<PageFormData>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: defaultValues || { slug: '', title: '', description: '' },
  });

  const onSubmit = (data: PageFormData) => {
    startTransition(async () => {
      const action = pageId
        ? updateSamplePage(pageId, data)
        : createSamplePage(data);
      const result = await action;
      if (result.success) {
        toast.success(
          pageId
            ? 'サンプルページを更新しました'
            : 'サンプルページを作成しました'
        );
        router.push('/website/sample');
      } else {
        toast.error(`エラー: ${result.error || '保存中に問題が発生しました'}`);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>スラッグ *</FormLabel>
              <FormControl>
                <Input placeholder="ページのスラッグ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input placeholder="ページタイトル" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>説明</FormLabel>
              <FormControl>
                <Textarea placeholder="ページ説明" rows={3} {...field} />
              </FormControl>
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
