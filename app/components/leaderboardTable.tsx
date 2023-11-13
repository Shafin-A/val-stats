"use client";

import React, { useState } from "react";
import { LeaderboardPlayer } from "../../types/types";
import styles from "./leaderboardTable.module.css";
import { PlayerTagLine } from "./playerTagline";
import { Pagination } from "./pagination";
import { REGIONS } from "../(pages)/search/page";
import { useSearchParams, useRouter } from "next/navigation";
import { PlayerGameName } from "./playerGameName";

interface LeaderboardTableProps {
  leaderboardData: Record<string, LeaderboardPlayer[]>;
  playersPerPage: number;
  paginationPageNumber: number;
}

export const LeaderboardTable = ({
  leaderboardData,
  playersPerPage,
  paginationPageNumber,
}: LeaderboardTableProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const urlRegion = searchParams.get("region");

  const initalRegion = urlRegion ?? REGIONS.NA;

  const [selectedRegion, setSelectedRegion] = useState(initalRegion);
  const [currentPage, setCurrentPage] = useState(1);

  const players = leaderboardData[selectedRegion];

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
            <PlayerGameName gameName={player.gameName} />{" "}
            <PlayerTagLine tagLine={player.tagLine} />
          </span>
        )}
      </td>
      <td>{player.rankedRating}</td>
      <td>{player.numberOfWins}</td>
    </tr>
  ));

  return (
    <div className={styles.leaderboard}>
      <div className={styles.region_select_container}>
        <label>Region</label>
        <select
          defaultValue={initalRegion}
          onChange={(e) => {
            setSelectedRegion(e.target.value);
            router.replace(`/leaderboard?region=${e.target.value}`);
          }}
        >
          {Object.values(REGIONS).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

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
