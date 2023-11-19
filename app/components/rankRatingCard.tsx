import { Card } from "@tremor/react";
import styles from "./rankRatingCard.module.css";

interface rankRatingCardProps {
  currentRank: string;
  currentRankImgSrc: string;
  peakRank: string;
  peakRankImgSrc: string;
}

interface rankRatingProps {
  rankTitle: string;
  imgSrc: string;
  rank: string;
}

const RankRating = ({ rankTitle, imgSrc, rank }: rankRatingProps) => {
  return (
    <div className={styles.rank_container}>
      <span className={styles.rank_title}>{rankTitle}</span>
      <img src={imgSrc} />
      <span className={styles.rank}>{rank}</span>
    </div>
  );
};

export const RankRatingCard = ({
  currentRank,
  currentRankImgSrc,
  peakRank,
  peakRankImgSrc,
}: rankRatingCardProps) => {
  return (
    <Card>
      <div className={styles.ranks_container}>
        <RankRating
          rankTitle={"CURRENT RANK"}
          imgSrc={currentRankImgSrc}
          rank={currentRank}
        />
        <div className={styles.vertical_line}></div>
        <RankRating
          rankTitle={"PEAK RANK"}
          imgSrc={peakRankImgSrc}
          rank={peakRank}
        />
      </div>
    </Card>
  );
};
