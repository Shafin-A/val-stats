"use client";

import React, { useEffect, useState } from "react";
import { CommentInput } from "./commentInput";
import { Comment } from "./comment";
import { CommentSectionComment, User } from "../../../types/types";
import { getCurrentLoggedInUser } from "../../../apis/api";
import "./styles.css";

interface commentsSectionProps {
  comments: CommentSectionComment[];
  maxDepth: number;
}

export const CommentsSection = ({
  comments,
  maxDepth,
}: commentsSectionProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = await getCurrentLoggedInUser(token);
          setCurrentUser(user);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <span className="user-text">
        {currentUser ? (
          <>
            Logged in as
            <strong> {currentUser?.user_name}</strong>
          </>
        ) : (
          <>Log in by trying to post</>
        )}
      </span>
      <CommentInput currentUser={currentUser} />
      {comments.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          maxDepth={maxDepth}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};
