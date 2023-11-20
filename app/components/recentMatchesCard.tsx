import { Card } from "@tremor/react";
import { formatDate, getAgentImg } from "../helpers";
import { Agent, Match } from "../../types/types";

interface recentMatchesProps {
  recentMatches: Match[];
  playerPuuid: string;
  agents: Agent[];
  matchesStats: Record<string, number>[];
}
export const RecentMatchesCard = ({
  recentMatches,
  playerPuuid,
  agents,
  matchesStats,
}: recentMatchesProps) => {
  return (
    <Card>
      {recentMatches.map((match, index) => {
        const allPlayersSortedByACS = match.players.all_players.sort(
          (a, b) => b.stats.score - a.stats.score
        );

        const playerIndex = allPlayersSortedByACS.findIndex(
          (matchPlayer) => matchPlayer.puuid === playerPuuid
        );

        if (playerIndex === -1)
          throw new Error("Could not find player in match!");

        const player = allPlayersSortedByACS[playerIndex];

        const playerMatchPosition = playerIndex + 1;

        const kills = player.stats.kills;
        const deaths = player.stats.deaths;
        const assists = player.stats.assists;

        const { character: agentPlayed, team: playerTeam } = player;
        const matchScore =
          playerTeam === "Blue"
            ? `${match.teams.blue.rounds_won} : ${match.teams.red.rounds_won}`
            : `${match.teams.red.rounds_won} : ${match.teams.blue.rounds_won}`;

        const agentImg = getAgentImg(agentPlayed, agents);

        const winningTeam = match.teams.blue.has_won ? "Blue" : "Red";
        const matchMap = match.metadata.map;

        const isPlayerOnWinningTeam = playerTeam === winningTeam;

        const matchStartTimeUnix = match.metadata.game_start;
        const matchStartTimeFormatted = formatDate(matchStartTimeUnix);
        return (
          <div
            key={match.metadata.matchid}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>{matchStartTimeFormatted}</div>
            <div>{matchMap}</div>
            <img src={agentImg} height="48px" width="48px" />
            <div>{matchScore}</div>
            <div>
              {kills}/{deaths}/{assists}
            </div>
            <div>{playerMatchPosition}</div>
            <div>{Math.round(matchesStats[index].AvgDamageDeltaForMatch)}</div>
            <div>{matchesStats[index].avgHeadShotPercentage.toFixed(1)}</div>
            <div>{matchesStats[index].KAST.toFixed(1)}</div>
            <div>{matchesStats[index].ACSForMatch.toFixed(1)}</div>
            <div>{matchesStats[index].ADRForMatch.toFixed(1)}</div>
            <div>{matchesStats[index].KD.toFixed(2)}</div>
          </div>
        );
      })}
    </Card>
  );
};
