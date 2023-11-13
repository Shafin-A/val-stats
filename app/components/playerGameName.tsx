import styles from "./playerGameName.module.css";

interface playerGameNameProps {
  gameName: string;
}

export const PlayerGameName = ({ gameName }: playerGameNameProps) => {
  return <span className={styles.game_name}>{gameName}</span>;
};
