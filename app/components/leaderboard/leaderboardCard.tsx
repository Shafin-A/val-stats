import styles from "./leaderboardCard.module.css";
import { PlayerCardImageClient } from "../playerCardImageClient";
import { PlayerGameNameClient } from "../playerGameNameClient";
import { PlayerTagLineClient } from "../playerTaglineClient";
import { Card } from "@tremor/react";

interface LeaderboardCardProps {
  puuid: string;
  playerCardID: string;
  leaderboardRank: number;
  gameName: string;
  tagLine: string;
  region: string;
  rankedRating: number;
  isAnonymized: boolean;
}

export const LeaderboardCard = ({
  puuid,
  playerCardID,
  leaderboardRank,
  gameName,
  tagLine,
  region,
  rankedRating,
  isAnonymized,
}: LeaderboardCardProps) => {
  const playerCardIdSrc = `https://media.valorant-api.com/playercards/${playerCardID}/smallart.png`;

  return (
    <Card className={styles.card_container}>
      <div className={styles.card_negative_margin}>
        <a
          className={styles.card_player_link}
          href={`/player/${encodeURIComponent(
            `${gameName}#${tagLine}`
          )}/${puuid}`}
        >
          <div className={styles.leaderboard_rank}>
            <div className={styles.leaderboard_rank_text}>
              <sup>#</sup>
              {leaderboardRank}
            </div>
          </div>
          <div>
            <PlayerCardImageClient margin="0.5rem auto" src={playerCardIdSrc} />
          </div>
          <div className={styles.game_name_container}>
            <PlayerGameNameClient
              gameName={isAnonymized ? "Secret Agent" : gameName}
            />
          </div>
          <div>
            <PlayerTagLineClient tagLine={tagLine} />
          </div>
          <div>
            <span className={styles.region_text}>
              Top <span className={styles.upper_case}>{region}</span> Rating
            </span>
          </div>
          <div>
            <span className={styles.ranked_rating}>{rankedRating}</span>
          </div>
        </a>
        <a
          className={styles.see_leaderboard_link}
          href={`/leaderboard?region=${region}`}
        >
          <span className={styles.see_leaderboard_text}>
            See <span className={styles.upper_case}>{region}</span> Leaderboard
          </span>
        </a>
      </div>
    </Card>
  );
};
