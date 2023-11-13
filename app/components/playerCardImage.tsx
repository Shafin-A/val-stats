import styles from "./playerCardImage.module.css";

interface playerCardImageProps {
  src: string;
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

export const PlayerCardImage = ({
  src,
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

  return (
    <img
      className={styles.card_image}
      style={componentStyle}
      src={src}
      alt="player in-game card image"
    />
  );
};
