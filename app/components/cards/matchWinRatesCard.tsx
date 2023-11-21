import { Card } from "@tremor/react";
import styles from "./matchWinRatesCard.module.css";
import { getMaps, getPlayerAccount, getPlayerMatches } from "../../../apis/api";
import { getMapsAndAgentsPlayed } from "../../helpers";

interface matchWinRatesCardProps {
  playerNameTag: string[];
}

interface winRateStatProps {
  children: React.ReactNode;
}

interface winRateBarProps {
  winPercentage: number;
}

const WinRateStat = ({ children }: winRateStatProps) => (
  <div className={styles.win_rates_stats}>{children}</div>
);

const WinRateBar = ({ winPercentage }: winRateBarProps) => (
  <div className={styles.win_rate_bar}>
    <span
      className={styles.win_rate_bar_win}
      style={{
        width: `calc(${winPercentage}%)`,
      }}
    />
    <span
      className={styles.win_rate_bar_loss}
      style={{
        width: `calc(${100 - winPercentage}%)`,
      }}
    />
  </div>
);

export const MatchWinRatesCard = async ({
  playerNameTag,
}: matchWinRatesCardProps) => {
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

  const maps = await getMaps();

  const { mapsPlayed } = getMapsAndAgentsPlayed(
    recentMatches,
    playerAccount,
    maps
  );

  const winLosses = Object.values(mapsPlayed).reduce(
    (acc, map) => {
      acc.wins += map.win;
      acc.losses += map.loss;
      return acc;
    },
    { wins: 0, losses: 0 }
  );

  const totalMatches = winLosses.wins + winLosses.losses;
  const winPercentage = (winLosses.wins / totalMatches) * 100;

  return (
    <Card>
      <div className={styles.win_rates_container}>
        <div className={styles.win_rates}>
          <WinRateStat>
            <div>
              <span className={styles.stat_top_text}>{winLosses.wins}</span>
              <span className={`${styles.stat_top_text} ${styles.win}`}>
                {" W"}
              </span>
              {" - "}
              <span className={styles.stat_top_text}>{winLosses.losses}</span>
              <span className={`${styles.stat_top_text} ${styles.loss}`}>
                {" L"}
              </span>
            </div>
            <span
              className={styles.stat_bottom_text}
            >{`Last ${totalMatches} games`}</span>
          </WinRateStat>
          <WinRateStat>
            <span
              className={`${styles.stat_top_text} ${
                winPercentage >= 50 ? styles.win : styles.loss
              }`}
            >{`${Math.round(winPercentage)}%`}</span>
            <span className={styles.stat_bottom_text}>Winrate</span>
          </WinRateStat>
        </div>
        <WinRateBar winPercentage={winPercentage} />
      </div>
    </Card>
  );
};
