'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@kit/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@kit/ui/select';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo,
  Redo,
  Text,
} from 'lucide-react';
import type {
  ControllerRenderProps,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

/**
 * Editor toolbar for topic content
 */
function TopicToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  const getCurrentHeadingLevel = () => {
    if (editor.isActive('heading', { level: 1 })) return '1';
    if (editor.isActive('heading', { level: 2 })) return '2';
    if (editor.isActive('heading', { level: 3 })) return '3';
    return 'paragraph';
  };
  const changeHeadingLevel = (value: string) => {
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({
          level: Number.parseInt(value, 10) as 1 | 2 | 3,
        })
        .run();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 rounded-t-md border-b">
      <Select
        value={getCurrentHeadingLevel()}
        onValueChange={changeHeadingLevel}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="段落スタイル" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">
            <div className="flex items-center">
              <Text className="h-4 w-4 mr-2" />
              <span>本文</span>
            </div>
          </SelectItem>
          <SelectItem value="1">
            <div className="flex items-center">
              <Heading1 className="h-4 w-4 mr-2" />
              <span>見出し1</span>
            </div>
          </SelectItem>
          <SelectItem value="2">
            <div className="flex items-center">
              <Heading2 className="h-4 w-4 mr-2" />
              <span>見出し2</span>
            </div>
          </SelectItem>
          <SelectItem value="3">
            <div className="flex items-center">
              <Heading3 className="h-4 w-4 mr-2" />
              <span>見出し3</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-accent' : ''}
        title="太字"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-accent' : ''}
        title="斜体"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-accent' : ''}
        title="箇条書き"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-accent' : ''}
        title="番号付きリスト"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => {
          const url = window.prompt('リンクのURLを入力:');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          } else if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run();
          }
        }}
        className={editor.isActive('link') ? 'bg-accent' : ''}
        title="リンク"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="元に戻す"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="やり直し"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
}

/**
 * Topic content editor integrated with react-hook-form
 */
export function TopicContentEditor<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  placeholder = '記事本文を入力...',
  className = '',
  minHeight = '300px',
  editable = true,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  editable?: boolean;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      LinkExtension,
      Placeholder.configure({ placeholder }),
    ],
    content: field.value || '',
    editable,
    onUpdate: ({ editor }) => {
      field.onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const html = field.value || '';
    if (html !== editor.getHTML()) {
      editor.commands.setContent(html);
    }
  }, [field.value, editor]);

  return (
    <div className={`border rounded-md bg-white ${className}`}>
      <TopicToolbar editor={editor} />
      <EditorContent editor={editor} className="p-4" style={{ minHeight }} />
    </div>
  );
}

export default TopicContentEditor;
