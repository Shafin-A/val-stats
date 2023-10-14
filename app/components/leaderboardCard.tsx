import styles from "./leaderboardCard.module.css";

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
          <img
            className={styles.card_image}
            src={playerCardIdSrc}
            alt="player in-game card image"
          />
        </div>
        <div className={styles.game_name_container}>
          <span className={styles.game_name}>
            {isAnonymized ? "Secret Agent" : gameName}
          </span>
        </div>
        <div>
          <span className={styles.tag_line}>#{tagLine}</span>
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
      <a className={styles.see_leaderboard_link} href="/player/123">
        <span className={styles.see_leaderboard_text}>
          See <span className={styles.upper_case}>{region}</span> Leaderboard
        </span>
      </a>
    </div>
  );
};
