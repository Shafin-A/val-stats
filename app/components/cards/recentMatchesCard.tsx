import { Badge, Card } from "@tremor/react";
import { formatDate, getAgentImg } from "../../helpers";
import { Agent, Match } from "../../../types/types";
import styles from "./recentMatchesCard.module.css";

interface recentMatchesProps {
  recentMatches: Match[];
  playerPuuid: string;
  agents: Agent[];
  matchesStats: Record<string, number>[];
}

interface matchPositionBadge {
  position: number;
}

const MatchPositionBadge = ({ position }: matchPositionBadge) => {
  const getPositionLabelAndColor = () => {
    if (position === 1) return { label: "MVP", color: "red" };
    if (position === 2) return { label: "2nd", color: "orange" };
    if (position === 3) return { label: "3rd", color: "amber" };
    return { label: `${position}th`, color: "gray" };
  };

  const { label, color } = getPositionLabelAndColor();

  return (
    <Badge className={styles.badge} color={color}>
      {label}
    </Badge>
  );
};

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
            className={`${styles.match_container} ${styles.border_bottom} ${
              isPlayerOnWinningTeam ? styles.win_gradient : styles.loss_gradient
            }`}
          >
            <img
              className={styles.agent_img}
              src={agentImg}
              alt={`player match agent - ${agentPlayed}`}
            />
            <div className={styles.match_time_map}>
              <span className={styles.small_gray_text}>
                {matchStartTimeFormatted}
              </span>
              <span className={styles.match_map_text}>{matchMap}</span>
            </div>

            <div className={styles.match_score}>
              <div className={styles.match_score_text_container}>
                <span>
                  {playerTeam === "Blue"
                    ? match.teams.blue.rounds_won
                    : match.teams.red.rounds_won}
                </span>
                <span>:</span>
                <span>
                  {playerTeam === "Blue"
                    ? match.teams.red.rounds_won
                    : match.teams.blue.rounds_won}
                </span>
              </div>
              <MatchPositionBadge position={playerMatchPosition} />
            </div>

            <div className={styles.stat_container}>
              <span className={styles.small_gray_text}>K / D / A</span>
              <span className={styles.stat_text}>
                {kills} / {deaths} / {assists}
              </span>
            </div>

            <div className={styles.stat_container}>
              <span className={styles.small_gray_text}>K/D</span>
              <span className={styles.stat_text}>
                {matchesStats[index].KD.toFixed(2)}
              </span>
            </div>

            <div className={styles.stat_container}>
              <span className={styles.small_gray_text}>DDΔ</span>
              <span className={styles.stat_text}>
                {Math.round(matchesStats[index].AvgDamageDeltaForMatch)}
              </span>
            </div>

            <div className={styles.stat_container}>
              <span className={styles.small_gray_text}>HS%</span>
              <span className={styles.stat_text}>
                {matchesStats[index].avgHeadShotPercentage.toFixed(1)}
              </span>
            </div>

            <div className={styles.stat_container}>
              <span className={styles.small_gray_text}>ADR</span>
              <span className={styles.stat_text}>
                {matchesStats[index].ADRForMatch.toFixed(1)}
              </span>
            </div>

            <div className={styles.stat_container}>
              <span className={styles.small_gray_text}>ACS</span>
              <span className={styles.stat_text}>
                {matchesStats[index].ACSForMatch.toFixed(1)}
              </span>
            </div>

            <div className={styles.stat_container}>
              <span className={styles.small_gray_text}>KAST</span>
              <span className={styles.stat_text}>
                {matchesStats[index].KAST.toFixed(1)}
              </span>
            </div>
          </div>
        );
      })}
    </Card>
  );
};
