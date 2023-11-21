import { Card } from "@tremor/react";
import styles from "./rankRatingCard.module.css";
import {
  getCompetitiveTiers,
  getPlayerAccount,
  getPlayerMMR,
} from "../../../apis/api";

interface rankRatingCardProps {
  playerNameTag: string[];
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

export const RankRatingCard = async ({
  playerNameTag,
}: rankRatingCardProps) => {
  const playerAccount = await getPlayerAccount(
    playerNameTag[0],
    playerNameTag[1]
  );

  const playerMMR = await getPlayerMMR(
    playerAccount.region,
    playerAccount.name,
    playerAccount.tag
  );

  const currentRankImgSrc = playerMMR.current_data.images.small;
  const currentRank = playerMMR.current_data.currenttierpatched;

  const rankUUID = playerMMR.current_data.images.small.split("/")[4];
  const peakRankTier = playerMMR.highest_rank.patched_tier;

  const competitiveTiers = await getCompetitiveTiers(rankUUID);
  const peakRankImgSrc = competitiveTiers.tiers.find(
    (tier) => tier.tierName.toLowerCase() === peakRankTier.toLowerCase()
  )!.smallIcon;
  const peakRank = playerMMR.highest_rank.patched_tier;

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
