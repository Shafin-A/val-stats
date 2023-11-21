import { Card } from "@tremor/react";
import AccuracyDummy from "../accuracyDummy";
import styles from "./playerAccuracyCard.module.css";
import { getPlayerAccount, getPlayerMatches } from "../../../apis/api";
import {
  getAvgStatsArrayForMatches,
  getOverallAverageStats,
} from "../../helpers";

interface playerAccuracyCardProps {
  playerNameTag: string[];
}

export const PlayerAccuracyCard = async ({
  playerNameTag,
}: playerAccuracyCardProps) => {
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

  const numGames = recentMatches.length;

  const headPercent = Number(
    overallAverageStats.avgHeadShotPercentage.toFixed(1)
  );
  const bodyPercent = Number(
    overallAverageStats.avgBodyShotPercentage.toFixed(1)
  );
  const legsPercent = Number(
    overallAverageStats.avgLegShotPercentage.toFixed(1)
  );

  const greatestPercent = Math.max(headPercent, bodyPercent, legsPercent);

  return (
    <Card>
      <div>
        <span
          className={styles.accuracy_games_text}
        >{`Accuracy - Last ${numGames} games`}</span>
        <div className={styles.accuracy_dummy_container}>
          <AccuracyDummy bodyColor="#74d5d3" />
          <div className={styles.accuracy_values}>
            <div className={styles.stat_container}>
              <span className={styles.stat_name}>Head</span>
              <span
                className={`${styles.stat_value}  ${
                  greatestPercent === headPercent ? styles.greatest_stat : ""
                }`}
              >{`${headPercent}%`}</span>
            </div>
            <div className={styles.stat_container}>
              <span className={styles.stat_name}>Body</span>
              <span
                className={`${styles.stat_value}  ${
                  greatestPercent === bodyPercent ? styles.greatest_stat : ""
                }`}
              >{`${bodyPercent}%`}</span>
            </div>
            <div className={styles.stat_container}>
              <span className={styles.stat_name}>Legs</span>
              <span
                className={`${styles.stat_value}  ${
                  greatestPercent === legsPercent ? styles.greatest_stat : ""
                }`}
              >{`${legsPercent}%`}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
