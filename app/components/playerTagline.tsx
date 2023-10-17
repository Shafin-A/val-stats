import styles from "./playerTagline.module.css";

interface playerTagLineProps {
  tagLine: string;
}

export const PlayerTagLine = ({ tagLine }: playerTagLineProps) => {
  return <span className={styles.tag_line}>#{tagLine}</span>;
};
