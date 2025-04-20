'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import slugify from 'slugify';

import { createTopic } from '~/actions/topics/index';
import { topicFormSchema, type TopicFormData } from '~/types/topics';

import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from '~/components/custom/segmented-controle';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@kit/ui/form';
import { Input } from '@kit/ui/input';
import { Textarea } from '@kit/ui/textarea';
import { Button } from '@kit/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@kit/ui/select';
import { DatePicker } from '~/components/custom/date-picker';
import { ImageUploader } from '~/components/custom/image-uploader';
import { SimpleEditor } from '~/components/tiptap/tiptap-templates/simple/simple-editor';
import type { JSONContent } from '@tiptap/react';

interface CreateTopicClientProps {
  categories: { id: string; name: string; slug: string }[];
}

export default function CreateTopicClient({
  categories,
}: CreateTopicClientProps) {
  const [view, setView] = useState<'info' | 'content'>('info');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<TopicFormData & { content: JSONContent }>({
    resolver: zodResolver(topicFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: { type: 'doc', content: [] },
      thumbnail_url: '',
      status: 'draft',
      published_at: '',
      category_id: '',
    },
  });

  const onSubmit = (data: TopicFormData) => {
    startTransition(async () => {
      const result = await createTopic(data);
      if (result.success) {
        toast.success('特集記事を作成しました');
        router.push('/website/topics');
      } else {
        toast.error(`エラー: ${result.error}`);
      }
    });
  };

  const headerControls = (
    <SegmentedControl
      value={view}
      onValueChange={(v) => setView(v as 'info' | 'content')}
    >
      <SegmentedControlIndicator />
      <SegmentedControlItem value="info">記事情報</SegmentedControlItem>
      <SegmentedControlItem value="content">記事本文</SegmentedControlItem>
    </SegmentedControl>
  );

  const saveAction = (
    <Button onClick={() => form.handleSubmit(onSubmit)()} disabled={isPending}>
      作成
    </Button>
  );

  const handleGenerateSlug = () => {
    const title = form.getValues('title');
    if (!title) {
      toast.error('スラッグを生成するにはタイトルを入力してください');
      return;
    }
    const newSlug = slugify(title, { lower: true, strict: true, locale: 'ja' });
    form.setValue('slug', newSlug);
    form.trigger('slug');
  };

  const status = form.watch('status');

  return (
    <>
      <PageHeader
        title="新規記事作成"
        description="ホームページの記事を作成します"
        backLink={{ href: '/website/topics', label: '記事一覧' }}
        actions={
          <div className="flex gap-2 items-end">
            {headerControls}
            {saveAction}
          </div>
        }
        className="max-w-5xl mx-auto"
      />
      <Container maxWidth="5xl" padding="p-0">
        <div className="bg-white rounded-md p-4">
          {view === 'info' ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* タイトル */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>タイトル *</FormLabel>
                      <FormControl>
                        <Input placeholder="記事のタイトル" {...field} />
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
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={handleGenerateSlug}
                        >
                          タイトルから生成
                        </Button>
                      </div>
                      <FormControl>
                        <Input placeholder="記事のスラッグ" {...field} />
                      </FormControl>
                      <FormDescription>
                        URLの一部として使用されます (例: /topics/your-slug)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 抜粋 */}
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>抜粋</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="記事の抜粋 (オプション)"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        記事一覧やOGP用に表示されます
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
                      <FormLabel>カテゴリ *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ''}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="カテゴリを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ステータス */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ステータス</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ''}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="ステータスを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">下書き</SelectItem>
                            <SelectItem value="published">公開</SelectItem>
                            <SelectItem value="archived">アーカイブ</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {status === 'published' && (
                  <FormField
                    control={form.control}
                    name="published_at"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>公開日時</FormLabel>
                        <FormControl>
                          <DatePicker
                            initialValue={field.value ?? undefined}
                            onChange={field.onChange}
                            required
                          />
                        </FormControl>
                        <FormDescription>
                          記事を公開する日時を指定
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* サムネイル */}
                <FormField
                  control={form.control}
                  name="thumbnail_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>サムネイル画像</FormLabel>
                      <FormControl>
                        <ImageUploader
                          initialImageUrl={field.value ?? undefined}
                          onFileChange={(file) => {
                            const url = URL.createObjectURL(file);
                            field.onChange(url);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        記事のサムネイルとして表示されます
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          ) : (
            <Controller
              control={form.control}
              name="content"
              render={({ field }) => (
                <SimpleEditor initialContent={field.value} />
              )}
            />
          )}
        </div>
      </Container>
    </>
  );
}
