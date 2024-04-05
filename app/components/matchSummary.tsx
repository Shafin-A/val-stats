import { Match } from "../../types/types";
import { getRoundOutcomeImg } from "../helpers";
import styles from "./matchSummary.module.css";

interface MatchSummary {
  match: Match;
}

export const MatchSummary = ({ match }: MatchSummary) => {
  return (
    <div className={styles.match_summary_container}>
      <div className={styles.match_score_container}>
        <span className={styles.bold_text} style={{ color: "#74d5d3" }}>
          {match.teams.blue.rounds_won}
        </span>
        <span className={styles.bold_text} style={{ color: "#df3a3a" }}>
          {match.teams.red.rounds_won}
        </span>
      </div>
      {match.rounds.map((round, index) => {
        const winningTeam = round.winning_team;
        return (
          <div key={index} className={styles.rounds_container}>
            {winningTeam === "Blue" ? (
              <img
                className={styles.round_end_img}
                src={getRoundOutcomeImg(round.end_type, winningTeam)}
              />
            ) : (
              <div className={styles.round_lost}>•</div>
            )}
            {winningTeam === "Red" ? (
              <img
                className={styles.round_end_img}
                src={getRoundOutcomeImg(round.end_type, winningTeam)}
              />
            ) : (
              <div className={styles.round_lost}>•</div>
            )}
            <div className={styles.grey_text}>{index}</div>
          </div>
        );
      })}
    </div>
  );
};
