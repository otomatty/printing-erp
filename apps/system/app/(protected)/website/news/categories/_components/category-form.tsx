'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { Input } from '@kit/ui/input';
import { Textarea } from '@kit/ui/textarea';
import { DialogClose } from '@kit/ui/dialog';

import { createCategory, updateCategory } from '~/_actions/news';
import { categoryFormSchema, type CategoryFormData } from '~/types/news';
import slugify from 'slugify';

interface CategoryFormProps {
  categoryId?: string;
  defaultValues?: Partial<CategoryFormData>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CategoryForm({
  categoryId,
  defaultValues,
  onSuccess,
  onCancel,
}: CategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

  // フォーム初期値設定
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: defaultValues || {
      name: '',
      slug: '',
      description: '',
    },
  });

  // フォーム送信処理
  const onSubmit = (data: CategoryFormData) => {
    startTransition(async () => {
      try {
        // 作成または更新
        const action = categoryId
          ? updateCategory(categoryId, data)
          : createCategory(data);

        const result = await action;

        if (result.success) {
          toast.success(
            categoryId ? 'カテゴリを更新しました' : 'カテゴリを作成しました'
          );
          onSuccess?.();
          form.reset();
        } else {
          toast.error(
            `エラー: ${result.error || 'カテゴリの保存中に問題が発生しました'}`
          );
        }
      } catch (error) {
        console.error('カテゴリフォームエラー:', error);
        toast.error('予期せぬエラーが発生しました');
      }
    });
  };

  // スラッグ自動生成
  const generateSlug = () => {
    const name = form.getValues('name');
    if (!name) {
      toast.error('スラッグを生成するには名前を入力してください');
      return;
    }

    setIsGeneratingSlug(true);
    const newSlug = slugify(name, {
      lower: true,
      strict: true,
      locale: 'ja',
    });
    form.setValue('slug', newSlug);
    form.trigger('slug');
    setIsGeneratingSlug(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* カテゴリ名 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>カテゴリ名 *</FormLabel>
              <FormControl>
                <Input placeholder="例: お知らせ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* スラッグ */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>スラッグ *</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateSlug}
                  disabled={isGeneratingSlug}
                >
                  名前から生成
                </Button>
              </div>
              <FormControl>
                <Input placeholder="例: news" {...field} />
              </FormControl>
              <FormDescription>
                URLの一部として使用されます (例: /news/categories/news)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 説明 */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>説明</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="カテゴリの説明（任意）"
                  rows={3}
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ボタン */}
        <div className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
              キャンセル
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            {isPending ? '保存中...' : categoryId ? '更新' : '作成'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
