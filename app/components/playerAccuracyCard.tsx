import { Card } from "@tremor/react";
import AccuracyDummy from "../components/accuracyDummy";
import styles from "./playerAccuracyCard.module.css";

interface playerAccuracyCardProps {
  numGames: number;
  headPercent: number;
  bodyPercent: number;
  legsPercent: number;
}

export const PlayerAccuracyCard = ({
  numGames,
  headPercent,
  bodyPercent,
  legsPercent,
}: playerAccuracyCardProps) => {
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
