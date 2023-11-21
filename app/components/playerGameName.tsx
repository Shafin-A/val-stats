import { getPlayerAccount } from "../../apis/api";
import styles from "./playerGameName.module.css";

interface playerGameNameProps {
  playerNameTag?: string[];
  gameName?: string;
  fontSize?: string;
  fontWeight?: string;
}

export const PlayerGameName = async ({
  playerNameTag,
  gameName,
  fontSize,
  fontWeight,
}: playerGameNameProps) => {
  const componentStyle = {
    fontSize,
    fontWeight,
  };

  let playerGameName = gameName;

  if (playerNameTag) {
    const playerAccount = await getPlayerAccount(
      playerNameTag[0],
      playerNameTag[1]
    );

    playerGameName = playerAccount.name;
  }

  return (
    <span className={styles.game_name} style={componentStyle}>
      {playerGameName}
    </span>
  );
};
