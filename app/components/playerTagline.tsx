import styles from "./playerTagline.module.css";

interface playerTagLineProps {
  tagLine: string;
  fontSize?: string;
  fontWeight?: string;
}

export const PlayerTagLine = ({
  tagLine,
  fontSize,
  fontWeight,
}: playerTagLineProps) => {
  const componentStyle = {
    fontSize,
    fontWeight,
  };

  return (
    <span className={styles.tag_line} style={componentStyle}>
      #{tagLine}
    </span>
  );
};
