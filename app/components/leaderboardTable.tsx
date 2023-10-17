"use client";

import React, { useState } from "react";
import { LeaderboardPlayer } from "../../types/types";
import styles from "./leaderboardTable.module.css";
import { PlayerTagLine } from "./playerTagline";
import { Pagination } from "./pagination";

interface LeaderboardTableProps {
  players: LeaderboardPlayer[];
  playersPerPage: number;
  paginationPageNumber: number;
}

export const LeaderboardTable = ({
  players,
  playersPerPage,
  paginationPageNumber,
}: LeaderboardTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const lastPlayerIndex = currentPage * playersPerPage;
  const firstPlayerIndex = lastPlayerIndex - playersPerPage;

  const currentPagePlayers = players.slice(firstPlayerIndex, lastPlayerIndex);
  const totalPages = Math.ceil(players.length / playersPerPage);

  const renderTableRows = currentPagePlayers.map((player) => (
    <tr key={player.leaderboardRank} className={styles.text_style}>
      <td>{player.leaderboardRank}</td>
      <td>
        <img
          className={styles.card_image}
          src={`https://media.valorant-api.com/playercards/${player.PlayerCardID}/smallart.png`}
          alt="player in-game card image"
        />
        {player.IsAnonymized ? (
          "Secret Agent"
        ) : (
          <span>
            {player.gameName} <PlayerTagLine tagLine={player.tagLine} />
          </span>
        )}
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

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginationPageNumber={paginationPageNumber}
      />
    </div>
  );
};

export default LeaderboardTable;
