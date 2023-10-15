"use client";

import React, { useState } from "react";
import { LeaderboardPlayer } from "../../types/types";
import styles from "./leaderboardTable.module.css";

interface LeaderboardTableProps {
  players: LeaderboardPlayer[];
  playersPerPage: number;
}

export const LeaderboardTable = ({
  players,
  playersPerPage,
}: LeaderboardTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const lastPlayerIndex = currentPage * playersPerPage;
  const firstPlayerIndex = lastPlayerIndex - playersPerPage;

  const currentPagePlayers = players.slice(firstPlayerIndex, lastPlayerIndex);

  const totalPages = Math.ceil(players.length / playersPerPage);

  const renderTableRows = currentPagePlayers.map((player) => (
    <tr key={player.leaderboardRank}>
      <td>{player.leaderboardRank}</td>
      <td>
        {player.IsAnonymized
          ? "Secret Agent"
          : `${player.gameName}#${player.tagLine}`}
      </td>
      <td>{player.rankedRating}</td>
      <td>{player.numberOfWins}</td>
    </tr>
  ));

  return (
    <div className={styles.leaderboard}>
      <table className={styles.leaderboard_table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Ranked Rating</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>{renderTableRows}</tbody>
      </table>
      <div className={styles.pagination}>
        <button
          className={styles.pagination_button}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={styles.pagination_button}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <p className={styles.page_info}>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default LeaderboardTable;
