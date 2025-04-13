'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Check, ChevronsUpDown, X, CalendarIcon, Upload } from 'lucide-react';
import slugify from 'slugify';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

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
import { Popover, PopoverContent, PopoverTrigger } from '@kit/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { Input } from '@kit/ui/input';
import { Textarea } from '@kit/ui/textarea';
import { Switch } from '@kit/ui/switch';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@kit/ui/command';
import { Calendar } from '@kit/ui/calendar';
import { Separator } from '@kit/ui/separator';
import { cn } from '@kit/ui/utils';

import { createNews, updateNews, getNewsById } from '~/actions/news';
import { newsFormSchema, type NewsFormData } from '~/types/news';
import AttachmentsManager from './attachments-manager';
import { RichTextEditor } from './rich-text-editor';

// お知らせフォームのProps
interface NewsFormProps {
  newsId?: string;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  }>;
  defaultValues?: Partial<NewsFormData>;
}

export default function NewsForm({
  newsId,
  categories,
  defaultValues,
}: NewsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

  // フォーム初期値の設定
  const form = useForm<NewsFormData>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: defaultValues || {
      title: '',
      content: '',
      summary: '',
      slug: '',
      status: 'draft',
      is_featured: false,
      category_id: null,
      thumbnail_url: null,
      published_at: '',
      publish_end_date: null,
    },
  });

  // フォーム送信時の処理
  const onSubmit = (data: NewsFormData) => {
    startTransition(async () => {
      const action = newsId ? updateNews(newsId, data) : createNews(data);
      const result = await action;

      if (result.success) {
        toast.success(
          newsId ? 'お知らせを更新しました' : 'お知らせを作成しました'
        );
        router.push('/website/news');
      } else {
        toast.error(
          `エラー: ${result.error || 'お知らせの保存中に問題が発生しました'}`
        );
      }
    });
  };

  // スラッグの自動生成
  const generateSlug = () => {
    const title = form.getValues('title');
    if (!title) {
      toast.error('スラッグを生成するにはタイトルを入力してください');
      return;
    }

    setIsGeneratingSlug(true);
    const newSlug = slugify(title, {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* タイトル */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル *</FormLabel>
              <FormControl>
                <Input placeholder="お知らせのタイトル" {...field} />
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
                  タイトルから生成
                </Button>
              </div>
              <FormControl>
                <Input placeholder="news-title-slug" {...field} />
              </FormControl>
              <FormDescription>
                URLの一部として使用されます (例: /news/news-title-slug)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 概要 */}
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>概要</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="お知らせの簡潔な概要"
                  rows={3}
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>
                一覧ページなどで表示される短い説明文
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* カテゴリ */}
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>カテゴリ</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category.id === field.value
                          )?.name
                        : 'カテゴリを選択'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="カテゴリを検索..." />
                    <CommandEmpty>カテゴリが見つかりません</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.name}
                          onSelect={() => {
                            form.setValue('category_id', category.id);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              category.id === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {category.name}
                        </CommandItem>
                      ))}
                      <CommandItem
                        value="none"
                        onSelect={() => {
                          form.setValue('category_id', null);
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        カテゴリなし
                      </CommandItem>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                お知らせのカテゴリを選択してください
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 公開状態 */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>公開状態</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="公開状態を選択" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">下書き</SelectItem>
                  <SelectItem value="published">公開</SelectItem>
                  <SelectItem value="archived">アーカイブ</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                下書き: 非公開 / 公開: 一般公開 / アーカイブ: 非表示
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 公開日時 */}
        <FormField
          control={form.control}
          name="published_at"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>公開日時</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), 'PPP', { locale: ja })
                      ) : (
                        <span>日付を選択</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(date.toISOString());
                      } else {
                        field.onChange('');
                      }
                    }}
                    initialFocus
                    locale={ja}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                未設定の場合、公開時に現在日時が設定されます
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 公開終了日時 */}
        <FormField
          control={form.control}
          name="publish_end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>公開終了日時 (任意)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), 'PPP', { locale: ja })
                      ) : (
                        <span>日付を選択</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(date.toISOString());
                      } else {
                        field.onChange(null);
                      }
                    }}
                    initialFocus
                    locale={ja}
                  />
                  <div className="p-2 border-t border-border">
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => field.onChange(null)}
                    >
                      クリア
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <FormDescription>
                この日時を過ぎると自動的に非公開になります
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 注目記事フラグ */}
        <FormField
          control={form.control}
          name="is_featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">注目記事</FormLabel>
                <FormDescription>
                  トップページなどで優先的に表示されます
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 本文（リッチテキストエディタ） */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文 *</FormLabel>
              <FormControl>
                <RichTextEditor
                  field={field}
                  placeholder="お知らせの内容を入力..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 添付ファイル管理（newsId存在時のみ表示） */}
        {newsId && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">添付ファイル</h3>
              <AttachmentsManager newsId={newsId} />
            </div>
          </>
        )}

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/website/news')}
          >
            キャンセル
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? '保存中...'
              : newsId
                ? 'お知らせを更新'
                : 'お知らせを作成'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
