// Error components must be Client Components
"use client";
import { useEffect } from "react";
import styles from "./error.module.css";

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const [status, message] = error.message.split(":");

  return (
    <div className={styles.error_container}>
      <span className={styles.error_title}>{status}</span>
      <span className={styles.error_message}>{message}</span>
    </div>
  );
};

export default Error;
