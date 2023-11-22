import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card, Textarea } from "@tremor/react";
import Placeholder from "@tiptap/extension-placeholder";
import "./styles.css";

interface commentInputProps {
  onSubmit: Function;
}
const MenuBar = ({ editor }: { editor: Editor }) => {
  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
    </>
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
