"use client";

import React, { useEffect, useState } from "react";
import { CommentInput } from "./commentInput";
import { Comment } from "./comment";
import { CommentSectionComment, User } from "../../../types/types";
import { getCurrentLoggedInUser } from "../../../apis/api";
import "./styles.css";
import { LoginModal } from "../loginModal";

interface commentsSectionProps {
  comments: CommentSectionComment[];
  maxDepth: number;
}

export const CommentsSection = ({
  comments,
  maxDepth,
}: commentsSectionProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
    location.reload();
  };

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
            <strong> {currentUser?.user_name}</strong>. Click here to{" "}
            <strong className="cursor" onClick={clearToken}>
              logout
            </strong>
            .
          </>
        ) : (
          <>
            <strong className="cursor" onClick={openModal}>
              Log in
            </strong>{" "}
            by trying to post
          </>
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
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};
