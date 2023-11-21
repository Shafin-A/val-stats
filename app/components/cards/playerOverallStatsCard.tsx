import { Card } from "@tremor/react";
import styles from "./playerOverallStatsCard.module.css";
import {
  getAvgStatsArrayForMatches,
  getOverallAverageStats,
} from "../../helpers";
import { getPlayerAccount, getPlayerMatches } from "../../../apis/api";

interface playerOverallAverageStatsCardProps {
  playerNameTag: string[];
}

export const PlayerOverallAverageStatsCard = async ({
  playerNameTag,
}: playerOverallAverageStatsCardProps) => {
  const playerAccount = await getPlayerAccount(
    playerNameTag[0],
    playerNameTag[1]
  );

  const recentMatches = await getPlayerMatches(
    playerAccount.region,
    playerAccount.name,
    playerAccount.tag,
    10,
    "competitive"
  );

  const avgStatsArray = getAvgStatsArrayForMatches(
    recentMatches,
    playerAccount.puuid
  );

  const overallAverageStats = getOverallAverageStats(
    avgStatsArray,
    recentMatches
  );

  return (
    <Card>
      <div className={styles.avg_stats_container}>
        <div className={styles.stat_container}>
          <span className={styles.stat_name}>K/D</span>
          <span
            className={styles.stat_value}
          >{`${overallAverageStats.KD.toFixed(2)}`}</span>
        </div>
        <div className={styles.stat_container}>
          <span className={styles.stat_name}>KAST</span>
          <span
            className={styles.stat_value}
          >{`${overallAverageStats.KAST.toFixed(1)}%`}</span>
        </div>
        <div className={styles.stat_container}>
          <span className={styles.stat_name}>DDΔ</span>
          <span className={styles.stat_value}>
            {overallAverageStats.AvgDamageDeltaForMatch > 0 && "+"}
            {`${Math.round(overallAverageStats.AvgDamageDeltaForMatch)}`}
          </span>
        </div>
        <div className={styles.stat_container}>
          <span className={styles.stat_name}>ACS</span>
          <span
            className={styles.stat_value}
          >{`${overallAverageStats.ACSForMatch.toFixed(1)}`}</span>
        </div>
        <div className={styles.stat_container}>
          <span className={styles.stat_name}>ADR</span>
          <span
            className={styles.stat_value}
          >{`${overallAverageStats.ADRForMatch.toFixed(1)}`}</span>
        </div>
        <div className={styles.stat_container}>
          <span className={styles.stat_name}>HSP</span>
          <span className={styles.stat_value}>
            {`${overallAverageStats.avgHeadShotPercentage.toFixed(1)}%`}
          </span>
        </div>
      </div>
    </Card>
  );
};
