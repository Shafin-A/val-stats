import React from "react";
import styles from "./modal.module.css";
import { Card } from "@tremor/react";

interface modalProps {
  isOpen: boolean;
  onClose: Function;
  closeOnOverlayClick?: boolean;
  children: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  closeOnOverlayClick,
  children,
}: modalProps) => {
  return (
    <div
      className={`${styles.overlay} ${
        isOpen ? styles.overlay_display_flex : styles.overlay_display_none
      }`}
      onClick={() => closeOnOverlayClick && onClose()}
    >
      <Card className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </Card>
    </div>
  );
};
