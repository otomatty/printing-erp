'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { useEffect } from 'react';

interface RichTextViewerProps {
  content: string;
  className?: string;
}

export default function RichTextViewer({
  content,
  className = '',
}: RichTextViewerProps) {
  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content,
    editable: false,
  });

  // コンテンツが変更されたときにエディタを更新
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className={className}>
      <EditorContent editor={editor} />
    </div>
  );
}
