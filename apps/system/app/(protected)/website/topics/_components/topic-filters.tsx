'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { z } from 'zod';
import { Input } from '@kit/ui/input';
import { Button } from '@kit/ui/button';
import { Card, CardContent } from '@kit/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@kit/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@kit/ui/select';
import { Search, X } from 'lucide-react';

// カテゴリ型
interface Category {
  id: string;
  name: string;
  slug: string;
}

// フィルターフォームスキーマ
const filterFormSchema = z.object({
  status: z.enum(['all', 'published', 'draft', 'archived']).default('all'),
  categoryId: z.string().optional(),
  query: z.string().optional(),
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

export interface TopicFiltersProps {
  categories: Category[];
}

export default function TopicFilters({ categories }: TopicFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      status:
        (searchParams.get('status') as FilterFormValues['status']) || 'all',
      categoryId: searchParams.get('categoryId') || undefined,
      query: searchParams.get('query') || '',
    },
  });

  function handleSubmit(values: FilterFormValues) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (values.status && values.status !== 'all')
        params.set('status', values.status);
      else params.delete('status');
      if (values.categoryId && values.categoryId !== 'all')
        params.set('categoryId', values.categoryId);
      else params.delete('categoryId');
      if (values.query) params.set('query', values.query);
      else params.delete('query');
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleReset() {
    form.reset({ status: 'all', categoryId: 'all', query: '' });
    router.push(pathname);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 md:flex-row md:items-end"
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>ステータス</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="すべて" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="published">公開中</SelectItem>
                        <SelectItem value="draft">下書き</SelectItem>
                        <SelectItem value="archived">アーカイブ</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>カテゴリ</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || 'all'}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="すべてのカテゴリ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべてのカテゴリ</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>検索</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="タイトル、内容を検索..."
                        className="pl-8"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-2 mt-2 md:mt-0">
              <Button type="submit" disabled={isPending}>
                フィルター
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isPending}
              >
                <X className="h-4 w-4 mr-1" /> リセット
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
