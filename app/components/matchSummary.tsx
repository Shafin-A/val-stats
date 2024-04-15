"use client";
import { useState } from "react";
import { Match } from "../../types/types";
import { getRoundOutcomeImg } from "../helpers";
import styles from "./matchSummary.module.css";

interface MatchSummary {
  match: Match;
  isClickable?: boolean;
  onClick?: (index: number) => void;
}

export const MatchSummary = ({
  match,
  isClickable = false,
  onClick,
}: MatchSummary) => {
  const [highlightedRound, setHighlightedRound] = useState<number | null>(
    isClickable ? 0 : null
  );

  const handleClick = (index: number) => {
    if (onClick) {
      onClick(index);
      setHighlightedRound(index);
    }
  };

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
        const isHighlighted = index === highlightedRound;

        return (
          <div
            key={index}
            className={`${styles.rounds_container} ${
              isClickable ? styles.clickable : ""
            } ${isHighlighted ? styles.highlighted : ""}`}
            onClick={isClickable ? () => handleClick(index) : undefined}
          >
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
            <div className={styles.grey_text}>{index + 1}</div>
          </div>
        );
      })}
    </div>
  );
};
