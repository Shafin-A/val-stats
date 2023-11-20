import { Card } from "@tremor/react";
import styles from "./playerOverallStatsCard.module.css";

interface playerOverallAverageStatsCardProps {
  overallAverageStats: Record<string, number>;
}

export const PlayerOverallAverageStatsCard = ({
  overallAverageStats,
}: playerOverallAverageStatsCardProps) => (
  <Card>
    <div className={styles.avg_stats_container}>
      <div className={styles.stat_container}>
        <span className={styles.stat_name}>K/D</span>
        <span className={styles.stat_value}>{`${overallAverageStats.KD.toFixed(
          2
        )}`}</span>
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
