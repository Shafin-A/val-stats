import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";
import { PlayerGameNameClient } from "./playerGameNameClient";
import { PlayerTagLineClient } from "./playerTaglineClient";
import { Match, Player } from "../../types/types";
import styles from "./matchTable.module.css";
import { getKASTForMatch, getPlayerAvgStatsForMatch } from "../helpers";
import { getAllCompetitiveTiers } from "../../apis/api";
import PartyIcon from "../../assets/party.svg";

interface MatchTableProps {
  match: Match;
  players: Player[];
}

const MatchTable = async ({ match, players }: MatchTableProps) => {
  const competitiveTiers = await getAllCompetitiveTiers();

  const latestCompTier = competitiveTiers[competitiveTiers.length - 1];

  const sortedPlayers = players.sort((a, b) => b.stats.score - a.stats.score);

  const allPlayerMatchStats = sortedPlayers.reduce((acc, player) => {
    const playerAvgStatsForMatch = getPlayerAvgStatsForMatch(
      player.puuid,
      match
    );
    const playerKASTForMatch = getKASTForMatch(player.puuid, match.rounds);

    const playerMatchStats = {
      ...playerAvgStatsForMatch,
      KAST: playerKASTForMatch,
    };
    acc[player.puuid] = playerMatchStats;
    return acc;
  }, {} as Record<string, Record<string, number>>);

  const partiedPlayers = players.reduce((groupedPlayers, player) => {
    const partyID = player.party_id;
    groupedPlayers[partyID] = groupedPlayers[partyID] || [];
    groupedPlayers[partyID].push(player);
    return groupedPlayers;
  }, {} as Record<string, Player[]>);

  const team = players[0].team;

  const partyColors =
    team === "Blue" ? ["#32cd32", "#ff7f50"] : [" #ff4500", "#00ced1"];

  const partyColorsMap = Object.keys(partiedPlayers).reduce((acc, key, i) => {
    if (partiedPlayers[key].length > 1) acc[key] = partyColors[i];

    return acc;
  }, {} as Record<string, string>);

  return (
    <Table className={styles.table}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>
            <span className={styles.table_player_header}>Player</span>
          </TableHeaderCell>
          <TableHeaderCell>Rank</TableHeaderCell>
          <TableHeaderCell>ACS</TableHeaderCell>
          <TableHeaderCell>K</TableHeaderCell>
          <TableHeaderCell>D</TableHeaderCell>
          <TableHeaderCell>A</TableHeaderCell>
          <TableHeaderCell>K/D</TableHeaderCell>
          <TableHeaderCell>DDΔ</TableHeaderCell>
          <TableHeaderCell>ADR</TableHeaderCell>
          <TableHeaderCell>HS%</TableHeaderCell>
          <TableHeaderCell>KAST</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody
        className={team === "Blue" ? styles.blue_gradient : styles.red_gradient}
      >
        {players.map((player) => {
          const rankImg = latestCompTier.tiers.find(
            (tier) =>
              tier.tierName.toLowerCase() ===
              player.currenttier_patched.toLowerCase()
          )!.smallIcon;

          return (
            <TableRow key={player.puuid} className={styles.table_row}>
              <TableCell>
                <div className={styles.table_player_cell}>
                  {partiedPlayers[player.party_id].length > 1 && (
                    <div
                      className={styles.partied_icon}
                      style={{
                        fill: partyColorsMap[player.party_id],
                      }}
                    >
                      <PartyIcon />
                    </div>
                  )}
                  <img
                    className={styles.agent_img}
                    src={player.assets.agent.small}
                    alt={player.character}
                  />
                  <div className={styles.player_name}>
                    <PlayerGameNameClient
                      gameName={player.name}
                      fontSize="0.875rem"
                    />{" "}
                    <PlayerTagLineClient
                      tagLine={player.tag}
                      fontSize="0.875rem"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <img className={styles.rank_img} src={rankImg} />
              </TableCell>
              <TableCell>
                {allPlayerMatchStats[player.puuid].ACSForMatch.toFixed(1)}
              </TableCell>
              <TableCell>{player.stats.kills}</TableCell>
              <TableCell>{player.stats.deaths}</TableCell>
              <TableCell>{player.stats.assists}</TableCell>
              <TableCell>
                {allPlayerMatchStats[player.puuid].KD.toFixed(2)}
              </TableCell>
              <TableCell>
                {allPlayerMatchStats[
                  player.puuid
                ].AvgDamageDeltaForMatch.toFixed(1)}
              </TableCell>
              <TableCell>
                {allPlayerMatchStats[player.puuid].ADRForMatch.toFixed(1)}
              </TableCell>
              <TableCell>
                {allPlayerMatchStats[
                  player.puuid
                ].avgHeadShotPercentage.toFixed(1)}
                %
              </TableCell>
              <TableCell>
                {allPlayerMatchStats[player.puuid].KAST.toFixed(1)}%
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default MatchTable;
