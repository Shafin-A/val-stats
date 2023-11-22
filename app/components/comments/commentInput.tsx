import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Badge, Button, Card, Textarea } from "@tremor/react";
import Placeholder from "@tiptap/extension-placeholder";
import "./styles.css";

interface commentInputProps {
  onSubmit: Function;
}
const MenuBar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="menu-bar-container">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <Badge
          color={
            !editor.can().chain().focus().toggleBold().run()
              ? "slate"
              : editor.isActive("bold")
              ? "lime"
              : ""
          }
        >
          <strong>B</strong>
        </Badge>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <Badge
          color={
            !editor.can().chain().focus().toggleItalic().run()
              ? "slate"
              : editor.isActive("italic")
              ? "lime"
              : ""
          }
        >
          <i>I</i>
        </Badge>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <Badge
          color={
            !editor.can().chain().focus().toggleStrike().run()
              ? "slate"
              : editor.isActive("strike")
              ? "lime"
              : ""
          }
        >
          <s>S</s>
        </Badge>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
      >
        <Badge
          color={
            !editor.can().chain().focus().toggleCode().run()
              ? "slate"
              : editor.isActive("code")
              ? "lime"
              : ""
          }
        >
          <code>{"<>"}</code>
        </Badge>
      </button>
    </div>
  );
};

export const CommentInput = ({ onSubmit }: commentInputProps) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Add a comment...",
      }),
    ],
  });

  if (!editor) return null;

  return (
    <Card>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Card>
  );
};
