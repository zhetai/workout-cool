// src/shared/ui/tiptap-editor.tsx
"use client";

import React from "react";
import clsx from "clsx";
import { StarterKit } from "@tiptap/starter-kit";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { Strike } from "@tiptap/extension-strike";
import { Placeholder } from "@tiptap/extension-placeholder";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { ListItem } from "@tiptap/extension-list-item";
import { Italic } from "@tiptap/extension-italic";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Bold } from "@tiptap/extension-bold";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({ value, onChange, onBlur, placeholder = "Write something…", className }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Bold,
      Italic,
      Strike,
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "tiptap-placeholder",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onBlur: () => {
      if (onBlur) {
        onBlur();
      }
    },
  });

  if (!editor) return null;

  return (
    <div className={className}>
      <TiptapMenuBar editor={editor} />
      <div className="min-h-[120px] rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 shadow-sm transition-all focus-within:border-primary dark:border-zinc-700/50 dark:bg-zinc-800">
        <EditorContent editor={editor} />
      </div>
      <style global jsx>{`
        p {
          margin: 0;
        }
        .tiptap-placeholder::before {
          content: attr(data-placeholder);
          color: #a0aec0;
          opacity: 0.7;
          font-style: italic;
          pointer-events: none;
          position: absolute;
        }
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror {
          min-height: 80px;
          color: var(--foreground);
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          color: var(--muted-foreground);
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
        .ProseMirror li {
          margin-bottom: 0.25rem;
        }
        .ProseMirror strong {
          font-weight: bold;
        }
        .ProseMirror em {
          font-style: italic;
        }
        .ProseMirror s,
        .ProseMirror strike {
          text-decoration: line-through;
        }
      `}</style>
    </div>
  );
};

interface MenuBarProps {
  editor: Editor;
}

const buttonBase = "rounded-md px-2 py-1 text-sm transition-all border border-transparent";

const TiptapMenuBar: React.FC<MenuBarProps> = ({ editor }) => (
  <div className="mb-2 flex flex-wrap gap-1">
    <ToolbarButton active={editor.isActive("bold")} ariaLabel="Bold" onClick={() => editor.chain().focus().toggleBold().run()}>
      <b>B</b>
    </ToolbarButton>
    <ToolbarButton active={editor.isActive("italic")} ariaLabel="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
      <i>I</i>
    </ToolbarButton>
    <ToolbarButton active={editor.isActive("strike")} ariaLabel="Strike" onClick={() => editor.chain().focus().toggleStrike().run()}>
      <s>S</s>
    </ToolbarButton>
    <ToolbarButton
      active={editor.isActive("bulletList")}
      ariaLabel="Bullet List"
      onClick={() => editor.chain().focus().toggleBulletList().run()}
    >
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="8" x2="21" y1="6" y2="6"></line>
        <line x1="8" x2="21" y1="12" y2="12"></line>
        <line x1="8" x2="21" y1="18" y2="18"></line>
        <line x1="3" x2="3.01" y1="6" y2="6"></line>
        <line x1="3" x2="3.01" y1="12" y2="12"></line>
        <line x1="3" x2="3.01" y1="18" y2="18"></line>
      </svg>
    </ToolbarButton>
    <ToolbarButton
      active={editor.isActive("orderedList")}
      ariaLabel="Ordered List"
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
    >
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="10" x2="21" y1="6" y2="6"></line>
        <line x1="10" x2="21" y1="12" y2="12"></line>
        <line x1="10" x2="21" y1="18" y2="18"></line>
        <path d="M4 6h1v4"></path>
        <path d="M4 10h2"></path>
        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
      </svg>
    </ToolbarButton>
  </div>
);

const ToolbarButton: React.FC<{
  onClick: () => void;
  active?: boolean;
  ariaLabel?: string;
  children: React.ReactNode;
}> = ({ onClick, active, ariaLabel, children }) => (
  <button
    aria-label={ariaLabel}
    aria-pressed={active}
    className={clsx(
      buttonBase,
      "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary dark:hover:bg-primary/20 dark:focus:bg-primary/20",
      active ? "bg-primary/20 text-primary dark:bg-primary/30" : "text-gray-700 dark:text-gray-300",
      "transform transition-transform duration-150 ease-out",
      "hover:scale-[1.05]",
      "active:scale-[0.95]",
      "flex items-center justify-center gap-1",
    )}
    onClick={onClick}
    tabIndex={0}
    type="button"
  >
    {children}
  </button>
);
