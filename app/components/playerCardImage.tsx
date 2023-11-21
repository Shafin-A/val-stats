import { getPlayerAccount } from "../../apis/api";
import styles from "./playerCardImage.module.css";

interface playerCardImageProps {
  src?: string;
  playerNameTag?: string[];
  borderRadius?: string;
  padding?: string;
  minHeight?: string;
  minWidth?: string;
  height?: string;
  width?: string;
  margin?: string;
  position?: string;
  boxShadow?: string;
  verticalAlign?: string;
}

export const PlayerCardImage = async ({
  src,
  playerNameTag,
  borderRadius,
  padding,
  minHeight,
  minWidth,
  height,
  width,
  margin,
  boxShadow,
  verticalAlign,
}: playerCardImageProps) => {
  const componentStyle = {
    borderRadius,
    padding,
    minHeight,
    minWidth,
    height,
    width,
    margin,
    boxShadow,
    verticalAlign,
  };

  let imgSrc = src;
  if (playerNameTag) {
    const playerAccount = await getPlayerAccount(
      playerNameTag[0],
      playerNameTag[1]
    );

    imgSrc = playerAccount.card.small;
  }

  return (
    <img
      className={styles.card_image}
      style={componentStyle}
      src={imgSrc}
      alt="player in-game card image"
    />
  );
};
