import { getPlayerAccount } from "../../apis/api";
import styles from "./playerTagline.module.css";

interface playerTagLineProps {
  playerNameTag?: string[];
  tagLine?: string;
  fontSize?: string;
  fontWeight?: string;
}

export const PlayerTagLine = async ({
  playerNameTag,
  tagLine,
  fontSize,
  fontWeight,
}: playerTagLineProps) => {
  const componentStyle = {
    fontSize,
    fontWeight,
  };

  let playerGameTag = tagLine;
  if (playerNameTag) {
    const playerAccount = await getPlayerAccount(
      playerNameTag[0],
      playerNameTag[1]
    );

    playerGameTag = playerAccount.tag;
  }

  return (
    <span className={styles.tag_line} style={componentStyle}>
      #{playerGameTag}
    </span>
  );
};
