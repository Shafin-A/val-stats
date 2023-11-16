import styles from "./card.module.css";

interface cardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: cardProps) => (
  <div className={styles.card_container}>{children}</div>
);
