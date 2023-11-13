import styles from "./playerGameName.module.css";

interface playerGameNameProps {
  gameName: string;
  fontSize?: string;
  fontWeight?: string;
}

export const PlayerGameName = ({
  gameName,
  fontSize,
  fontWeight,
}: playerGameNameProps) => {
  const componentStyle = {
    fontSize,
    fontWeight,
  };

  return (
    <span className={styles.game_name} style={componentStyle}>
      {gameName}
    </span>
  );
};
