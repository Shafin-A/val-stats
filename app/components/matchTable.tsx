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
import { getAllCompetitiveTiers, getCompetitiveTiers } from "../../apis/api";

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

  console.log(match.teams.blue);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Player</TableHeaderCell>
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
      <TableBody>
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
