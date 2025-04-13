'use client';

import { useEffect } from 'react';
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  type Editor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@kit/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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

interface TipTapToolbarProps {
  editor: Editor;
}

/**
 * リッチテキストエディターのツールバー
 */
export function TipTapToolbar({ editor }: TipTapToolbarProps) {
  if (!editor) {
    return null;
  }

  // 現在のアクティブな見出しレベルを特定
  const getCurrentHeadingLevel = () => {
    if (editor.isActive('heading', { level: 1 })) return '1';
    if (editor.isActive('heading', { level: 2 })) return '2';
    if (editor.isActive('heading', { level: 3 })) return '3';
    return 'paragraph';
  };

  // 見出しレベルを変更する
  const changeHeadingLevel = (value: string) => {
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: Number.parseInt(value) })
        .run();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-2 p-2 bg-muted rounded-t-md border-b">
      {/* 見出しセレクター */}
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

      <div className="h-6 border-l mx-1"></div>

      {/* フォーマットボタン */}
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

      <div className="h-6 border-l mx-1"></div>

      {/* リスト */}
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

      <div className="h-6 border-l mx-1"></div>

      {/* リンク */}
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

      <div className="h-6 border-l mx-1"></div>

      {/* アンドゥ・リドゥ */}
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

export interface RichTextEditorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  editable?: boolean;
}

/**
 * リッチテキストエディターコンポーネント
 * React Hook Formと統合可能なTipTapエディター
 */
export function RichTextEditor<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  placeholder = 'テキストを入力...',
  className = '',
  minHeight = '200px',
  editable = true,
}: RichTextEditorProps<TFieldValues, TName>) {
  // Tiptapエディタの設定
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {},
        orderedList: {},
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
        validate: (href) => /^https?:\/\//.test(href),
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-md max-w-full',
        },
      }),
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
      }),
    ],
    content: field.value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      field.onChange(html);
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-slate prose-headings:my-3 prose-headings:font-bold focus:outline-none max-w-none',
        style: `min-height: ${minHeight}`,
      },
    },
    editable,
  });

  // エディタの内容をフォームと同期
  useEffect(() => {
    if (editor && field.value !== editor.getHTML()) {
      editor.commands.setContent(field.value || '', false);
    }
  }, [editor, field.value]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`border rounded-md overflow-hidden ${className}`}>
      {editable && <TipTapToolbar editor={editor} />}

      {/* 選択したテキストに表示されるメニュー */}
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // 選択範囲があり、かつ編集可能な場合のみ表示
          return from !== to && editor.isEditable;
        }}
      >
        <div className="flex gap-1 p-1 rounded-md shadow-md bg-white border">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-accent/50' : ''}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-accent/50' : ''}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              const url = window.prompt('リンクのURLを入力:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={editor.isActive('link') ? 'bg-accent/50' : ''}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
      </BubbleMenu>

      <style jsx global>{`
        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin-top: 0.67em;
          margin-bottom: 0.67em;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 0.83em;
          margin-bottom: 0.83em;
        }
        .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin-top: 1em;
          margin-bottom: 1em;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin: 1em 0;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin: 1em 0;
        }
        .ProseMirror p {
          margin: 1em 0;
        }
        .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
        }
      `}</style>

      <EditorContent editor={editor} className="p-3 prose-sm overflow-auto" />
    </div>
  );
}
