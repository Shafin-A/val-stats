"use client"; // Error components must be Client Components

import { useEffect } from "react";
import styles from "./error.module.css";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.error_container}>
      <span className={styles.error_title}>404</span>
      <span className={styles.error_message}>{error.message}</span>
      <span className={styles.error_sub_message}>
        Make sure you have the right player name and tag!
      </span>
    </div>
  );
}
