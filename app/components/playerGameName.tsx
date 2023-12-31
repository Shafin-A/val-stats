import { getPlayerAccount } from "../../apis/api";
import styles from "./playerGameName.module.css";

interface playerGameNameProps {
  playerNameTag: string[];
  fontSize?: string;
  fontWeight?: string;
}

export const PlayerGameName = async ({
  playerNameTag,
  fontSize,
  fontWeight,
}: playerGameNameProps) => {
  const componentStyle = {
    fontSize,
    fontWeight,
  };

  const playerAccount = await getPlayerAccount(
    playerNameTag[0],
    playerNameTag[1]
  );

  const playerGameName = playerAccount.name;

  return (
    <span className={styles.game_name} style={componentStyle}>
      {playerGameName}
    </span>
  );
};
