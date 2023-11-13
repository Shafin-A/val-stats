import styles from "./leaderboardCard.module.css";
import { PlayerCardImage } from "./playerCardImage";
import { PlayerGameName } from "./playerGameName";
import { PlayerTagLine } from "./playerTagline";

interface LeaderboardCardProps {
  playerCardID: string;
  leaderboardRank: number;
  gameName: string;
  tagLine: string;
  region: string;
  rankedRating: number;
  isAnonymized: boolean;
}

export const LeaderboardCard = ({
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
    <div className={styles.card_container}>
      <a className={styles.card_player_link} href="#">
        <div className={styles.leaderboard_rank}>
          <div className={styles.leaderboard_rank_text}>
            <sup>#</sup>
            {leaderboardRank}
          </div>
        </div>
        <div>
          <PlayerCardImage src={playerCardIdSrc} />
        </div>
        <div className={styles.game_name_container}>
          <PlayerGameName gameName={isAnonymized ? "Secret Agent" : gameName} />
        </div>
        <div>
          <PlayerTagLine tagLine={tagLine} />
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
  );
};
