'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@kit/ui/table';
import { Button } from '@kit/ui/button';
import { Edit, Trash2 } from 'lucide-react';

/**
 * トピックタグ管理テーブル
 */
interface TagTableProps {
  tags: { id: string; name: string; slug: string }[];
}

export default function TagTable({ tags }: TagTableProps) {
  if (tags.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        タグが登録されていません。
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>名前</TableHead>
          <TableHead>スラッグ</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag) => (
          <TableRow key={tag.id}>
            <TableCell>{tag.name}</TableCell>
            <TableCell>{tag.slug}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" className="mr-2">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
