"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Badge, Button, Card, TextInput, Textarea } from "@tremor/react";
import Placeholder from "@tiptap/extension-placeholder";
import "./styles.css";
import { MouseEvent, useEffect, useState } from "react";
import { Modal } from "../modal";
import { LoginModal } from "../loginModal";
import { CommentSectionComment, User } from "../../../types/types";
import { getPlayerAccount, postComment } from "../../../apis/api";

interface commentInputProps {
  currentUser: User | null;
  comment?: CommentSectionComment;
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

export const CommentInput = ({ currentUser, comment }: commentInputProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [puuid, setPuuid] = useState("");
  const [token, setToken] = useState<string | null>("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  useEffect(() => {
    const url = location.href.split("/");
    setPuuid(url[url.length - 1]);
    setToken(localStorage.getItem("token"));
  }, []);

  if (!editor) return null;

  const handlePostComment = async () => {
    if (token) {
      await postComment(puuid, token, editor.getHTML(), comment?.id);
      location.reload();
    }
  };

  const handleOnClick = async () => {
    return currentUser ? await handlePostComment() : openModal();
  };

  return (
    <Card className="comment-input-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <Button
        disabled={editor.isEmpty}
        className="comment-post-button"
        onClick={handleOnClick}
      >
        <strong>Post</strong>
      </Button>
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
    </Card>
  );
};
