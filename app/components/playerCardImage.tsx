import styles from "./playerCardImage.module.css";

interface playerCardImageProps {
  src: string;
}

export const PlayerCardImage = ({ src }: playerCardImageProps) => {
  return (
    <img
      className={styles.card_image}
      src={src}
      alt="player in-game card image"
    />
  );
};
