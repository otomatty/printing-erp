'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { InviteUserFormSchema, type InviteUserFormData } from '~/types/invite';

interface InviteUserFormProps {
  onSuccess?: () => void;
}

export default function InviteUserForm({ onSuccess }: InviteUserFormProps) {
  const form = useForm<InviteUserFormData>({
    resolver: zodResolver(InviteUserFormSchema),
    defaultValues: {
      email: '',
      role: 'staff',
    },
  });

  const onSubmit = async (data: InviteUserFormData) => {
    console.log('[InviteUserForm] 送信開始', data);
    try {
      const res = await fetch('/api/users/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = (await res.json()) as {
        success: boolean;
        message: string;
      };
      console.log('[InviteUserForm] API結果', result);
      if (res.ok && result.success) {
        toast.success(result.message || '招待を送信しました。');
        form.reset();
        onSuccess?.();
      } else {
        toast.error(result.message || '招待の送信に失敗しました。');
      }
    } catch (error) {
      console.error('[InviteUserForm] エラー', error);
      toast.error('招待の送信中にエラーが発生しました。');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>役割</FormLabel>
              <FormControl>
                <select {...field} className="w-full border rounded px-2 py-2">
                  <option value="staff">スタッフ</option>
                  <option value="admin">管理者</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? '送信中...' : '招待を送信'}
        </Button>
      </form>
    </Form>
  );
}
