import { Card } from "@tremor/react";
import styles from "./rankRatingCard.module.css";

interface rankRatingCardProps {
  currentRating: string;
  currentRatingImgSrc: string;
  peakRating: string;
  peakRatingImgSrc: string;
}

interface rankRatingProps {
  ratingTitle: string;
  imgSrc: string;
  rating: string;
}

const RankRating = ({ ratingTitle, imgSrc, rating }: rankRatingProps) => {
  return (
    <div className={styles.rating_container}>
      <span className={styles.rating_title}>{ratingTitle}</span>
      <img src={imgSrc} />
      <span className={styles.rating}>{rating}</span>
    </div>
  );
};

export const RankRatingCard = ({
  currentRating,
  currentRatingImgSrc,
  peakRating,
  peakRatingImgSrc,
}: rankRatingCardProps) => {
  return (
    <Card>
      <div className={styles.ratings_container}>
        <RankRating
          ratingTitle={"CURRENT RATING"}
          imgSrc={currentRatingImgSrc}
          rating={currentRating}
        />
        <div className={styles.vertical_line}></div>
        <RankRating
          ratingTitle={"PEAK RATING"}
          imgSrc={peakRatingImgSrc}
          rating={peakRating}
        />
      </div>
    </Card>
  );
};
