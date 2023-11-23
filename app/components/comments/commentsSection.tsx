"use client";
import React, { useState } from "react";
import { CommentInput } from "./commentInput";
import { Comment } from "./comment";
import { CommentSectionComment } from "../../../types/types";

interface commentsSectionProps {
  comments: CommentSectionComment[];
  maxDepth: number;
}

export const CommentsSection = ({
  comments,
  maxDepth,
}: commentsSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (htmlContent: any) => {
    // Handle the submitted comment (you may want to send it to a server, etc.)
    console.log("New Comment:", htmlContent);

    // Clear the input area
    setNewComment("");
  };

  return (
    <div style={{ width: "100%" }}>
      <CommentInput onSubmit={handleCommentSubmit} />
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} maxDepth={maxDepth} />
      ))}
    </div>
  );
};
