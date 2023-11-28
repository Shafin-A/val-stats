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
      className={styles.overlay}
      style={{ display: isOpen ? "flex" : "none" }}
      onClick={() => closeOnOverlayClick && onClose()}
    >
      <Card className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </Card>
    </div>
  );
};
