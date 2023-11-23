"use client";
import React, { useState } from "react";
import { CommentSectionComment } from "../../../types/types";
import { Button, Card } from "@tremor/react";
import { CommentInput } from "./commentInput";
import xss from "xss";

interface commentProps {
  comment: CommentSectionComment;
  maxDepth: number;
}

interface commentsSectionProps {
  comments: CommentSectionComment[];
  maxDepth: number;
}

const allowedTags = ["strong", "em", "s", "code"];

const Comment = ({ comment, maxDepth }: commentProps) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <Card style={{ marginTop: "1rem" }}>
      <p>
        <strong>{comment.user}</strong> - {comment.timestamp}
      </p>
      {
        <div
          dangerouslySetInnerHTML={{
            __html: xss(comment.content, {
              whiteList: {
                em: [],
                s: [],
                code: [],
                strong: [],
                p: [],
              },
            }),
          }}
        />
      }
      <Button
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        onClick={() => setShowReplyBox(!showReplyBox)}
      >
        {!showReplyBox ? "Reply" : "Cancel"}
      </Button>
      {showReplyBox && <CommentInput onSubmit={() => {}} />}
      {comment.replies && comment.replies.length > 0 && (
        <div
          style={{
            margin: comment.depth < maxDepth ? "" : "0 -1.5rem -1.5rem",
          }}
        >
          {comment.replies.map((reply, index) => (
            <Comment key={index} comment={reply} maxDepth={maxDepth} />
          ))}
        </div>
      )}
    </Card>
  );
};

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

// Example usage:
export const commentsData = [
  {
    user: "User1",
    timestamp: "2023-01-01 12:00 PM",
    content: "<p>Comment 1</p>",
    depth: 0,
    replies: [
      {
        user: "User2",
        timestamp: "2023-01-01 12:05 PM",
        content: "<code>Reply</code> <em>to</em> <strong>Comment 1</strong>",
        depth: 1,
        replies: [
          {
            user: "User1",
            timestamp: "2023-01-01 12:10 PM",
            content: "<ul><li>Nested Reply</li></ul> to Comment 1",
            depth: 2,
            replies: [
              {
                user: "User2",
                timestamp: "2023-01-01 12:15 PM",
                content: "<s>aaa</s>",
                depth: 3,
                replies: [
                  {
                    user: "User1",
                    timestamp: "2023-01-01 12:20 PM",
                    content:
                      "Nested Reply to Comment 1Nested Reply to Comment 1Nested Reply to Comment 1Nested Reply to Comment 1",
                    depth: 4,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    user: "User3",
    timestamp: "2023-01-01 1:00 PM",
    content: "Comment 2",
    depth: 0,
  },
];
