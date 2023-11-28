"use client";

import React, { useState } from "react";
import { CommentSectionComment, User } from "../../../types/types";
import { Button, Card, Divider } from "@tremor/react";
import { CommentInput } from "./commentInput";
import xss from "xss";

import "./styles.css";

interface commentProps {
  comment: CommentSectionComment;
  maxDepth: number;
  currentUser: User | null;
}

export const Comment = ({ comment, maxDepth, currentUser }: commentProps) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

  const sanitizedCommentContent = xss(comment.content, {
    whiteList: {
      em: [],
      s: [],
      code: [],
      strong: [],
      p: [],
    },
  });

  const timeStamp = new Date(comment.timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <Card className="comment-container">
      <p>
        <strong>{comment.user_name}</strong> - {timeStamp}
      </p>
      <Divider />
      {
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizedCommentContent,
          }}
        />
      }
      <Button
        className="reply-button"
        onClick={() => setShowReplyBox(!showReplyBox)}
      >
        <strong>{!showReplyBox ? "Reply" : "Cancel"}</strong>
      </Button>
      {showReplyBox && (
        <CommentInput currentUser={currentUser} comment={comment} />
      )}
      {comment.replies.length > 0 && (
        <div className={comment.depth < maxDepth ? "" : "comment-margin"}>
          {comment.replies.map((reply, index) => (
            <Comment
              key={index}
              comment={reply}
              maxDepth={maxDepth}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </Card>
  );
};
