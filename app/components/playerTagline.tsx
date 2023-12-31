import { getPlayerAccount } from "../../apis/api";
import styles from "./playerTagline.module.css";

interface playerTagLineProps {
  playerNameTag: string[];
  fontSize?: string;
  fontWeight?: string;
}

export const PlayerTagLine = async ({
  playerNameTag,
  fontSize,
  fontWeight,
}: playerTagLineProps) => {
  const componentStyle = {
    fontSize,
    fontWeight,
  };

  const playerAccount = await getPlayerAccount(
    playerNameTag[0],
    playerNameTag[1]
  );

  const playerGameTag = playerAccount.tag;

  return (
    <span className={styles.tag_line} style={componentStyle}>
      #{playerGameTag}
    </span>
  );
};
