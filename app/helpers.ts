import {
  MapData,
  Match,
  Map,
  PlayerAccount,
  Round,
  Agent,
  KillEvent,
} from "../types/types";
import eliminationloss1 from "../assets/eliminationloss1.png";
import eliminationwin1 from "../assets/eliminationwin1.png";
import defuseloss1 from "../assets/diffuseloss1.png";
import defusewin1 from "../assets/diffusewin1.png";
import surrender from "../assets/EarlySurrender_Flag.png";
import timeloss1 from "../assets/timeloss1.png";
import timewin1 from "../assets/timewin1.png";
import explosionloss1 from "../assets/explosionloss1.png";
import explosionwin1 from "../assets/explosionwin1.png";

export const getKASTForMatch = (
  playerPuuid: string,
  rounds: Round[]
): number => {
  let roundsWithImpact = 0;

  rounds.forEach((round) => {
    const playerStats = round.player_stats.find(
      (stats) => stats.player_puuid === playerPuuid
    );

    if (!playerStats) return;

    // Check if the player got a kill in the round
    if (playerStats.kills > 0) {
      roundsWithImpact++;
      return;
    }

    // Check if the player got an assist in the round
    const assistsInRound = round.player_stats
      .filter((stats) => stats.player_puuid !== playerPuuid)
      .flatMap((stats) => stats.kill_events)
      .filter((killEvent) =>
        killEvent.assistants.some(
          (assistant) => assistant.assistant_puuid === playerPuuid
        )
      ).length;

    if (assistsInRound > 0) {
      roundsWithImpact++;
      return;
    }

    // Store players that killed current player and time of kill
    // Sage res might allow for multiple killers per round, or same killer multiple times
    const playerKillersInRound = {} as Record<string, number[]>;

    if (
      !playerStats.was_afk &&
      !playerStats.was_penalized &&
      !playerStats.stayed_in_spawn
    ) {
      // Check if the player survived the round
      const wasKilledInRound =
        round.player_stats
          .flatMap((stats) => stats.kill_events)
          .filter((killEvent) => {
            // If player killed current player
            if (killEvent.victim_puuid === playerPuuid) {
              // If player is on enemy team
              if (killEvent.killer_team !== playerStats.player_team) {
                const killerPuuid = killEvent.killer_puuid;

                // Create or add to array of time of kills for puuid in playerKillersInRound
                !(killerPuuid in playerKillersInRound)
                  ? (playerKillersInRound[killerPuuid] = [
                      killEvent.kill_time_in_round,
                    ])
                  : playerKillersInRound[killerPuuid].push(
                      killEvent.kill_time_in_round
                    );
              }
              return true;
            }
            return false;
          }).length > 0;

      if (!wasKilledInRound) {
        roundsWithImpact++;
        return;
      }
    }

    const TIME_THRESHOLD_FOR_TRADE = 5000;

    // If player was killed in the round
    if (Object.keys(playerKillersInRound).length > 0) {
      // Check if the player's death was traded by teammates in the same round
      const tradedByTeammates = round.player_stats.some(
        (otherPlayerStats) =>
          otherPlayerStats.player_team === playerStats.player_team && // If player on the same team
          otherPlayerStats.player_puuid !== playerPuuid && // And not the current player
          otherPlayerStats.kill_events.some(
            // Check if other player has killed the current player's killer within 5 seconds
            (killEvent) =>
              killEvent.victim_puuid in playerKillersInRound &&
              playerKillersInRound[killEvent.victim_puuid].some((time) => {
                return (
                  killEvent.kill_time_in_round - time <=
                  TIME_THRESHOLD_FOR_TRADE
                );
              })
          )
      );

      if (tradedByTeammates) {
        roundsWithImpact++;
      }
    }
  });

  // Calculate KAST as percentage
  const totalRounds = rounds.length;
  const kast = (roundsWithImpact / totalRounds) * 100;

  return kast;
};

export const getPlayerAvgStatsForMatch = (
  playerPuuid: string,
  match: Match
): Record<string, number> => {
  const player = match.players.all_players.find(
    (matchPlayer) => matchPlayer.puuid === playerPuuid
  );

  if (!player) throw new Error("Could not find player in match!");

  const totalRounds = match.rounds.length;

  const damageMade = player.damage_made;
  const damageReceived = player.damage_received;
  const damageDelta = damageMade - damageReceived;
  const score = player.stats.score;

  const AvgDamageDeltaForMatch = damageDelta / totalRounds;
  const ADRForMatch = damageMade / totalRounds;
  const ACSForMatch = score / totalRounds;

  const totalShots =
    player.stats.headshots + player.stats.bodyshots + player.stats.legshots;
  const totalHeadShots = player.stats.headshots;
  const totalBodyShots = player.stats.bodyshots;
  const totalLegShots = player.stats.legshots;

  const avgHeadShotPercentage = (totalHeadShots / totalShots) * 100;
  const avgBodyShotPercentage = (totalBodyShots / totalShots) * 100;
  const avgLegShotPercentage = (totalLegShots / totalShots) * 100;

  const KD = player.stats.kills / player.stats.deaths;

  return {
    AvgDamageDeltaForMatch,
    ADRForMatch,
    ACSForMatch,
    avgHeadShotPercentage,
    avgBodyShotPercentage,
    avgLegShotPercentage,
    KD,
  };
};

export const getAvgStatsArrayForMatches = (
  matches: Match[],
  playerPuuid: string
) =>
  matches.map((match) => {
    const playerAvgStats = getPlayerAvgStatsForMatch(playerPuuid, match);
    playerAvgStats.KAST = getKASTForMatch(playerPuuid, match.rounds);
    playerAvgStats.gameStartTime = match.metadata.game_start;

    return playerAvgStats;
  });

export const getOverallAverageStats = (
  averageStatsForEachMatch: Record<string, number>[],
  matches: Match[]
) => {
  // Add stats up into object
  const overallAverageStats = averageStatsForEachMatch.reduce((acc, stats) => {
    for (const stat in stats) {
      acc[stat] = (acc[stat] || 0) + stats[stat];
    }
    return acc;
  }, {} as Record<string, number>);

  const numberOfMatches = matches.length;

  // Divide to get average
  for (const stat in overallAverageStats) {
    overallAverageStats[stat] /= numberOfMatches;
  }

  return overallAverageStats;
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-indexed
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours % 12 || 12;
  const period = hours < 12 ? "AM" : "PM";

  return `${year}/${month}/${day}, ${formattedHours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${period}`;
};

export const getMapsAndAgentsPlayed = (
  recentMatches: Match[],
  playerAccount: PlayerAccount,
  maps: Map[]
) => {
  const agentsPlayed = {} as Record<string, number>;
  const mapsPlayed = {} as MapData;

  recentMatches.forEach((match) => {
    const player = match.players.all_players.find(
      (p) => p.puuid === playerAccount.puuid
    );

    if (!player) throw new Error("Could not find player in match!");

    const { character, team } = player;
    const winningTeam = match.teams.blue.has_won ? "Blue" : "Red";
    const matchMap = match.metadata.map;
    const isPlayerOnWinningTeam = team === winningTeam;

    agentsPlayed[character] = (agentsPlayed[character] || 0) + 1;

    const matchMapImage = maps.find(
      (map) => map.displayName.toLowerCase() === matchMap.toLowerCase()
    )?.listViewIcon;

    if (!mapsPlayed.hasOwnProperty(matchMap)) {
      mapsPlayed[matchMap] = { win: 0, loss: 0, imgSrc: matchMapImage };
    }

    isPlayerOnWinningTeam
      ? mapsPlayed[matchMap].win++
      : mapsPlayed[matchMap].loss++;
  });

  return { mapsPlayed, agentsPlayed };
};

export const getAgentImg = (agentName: string, agents: Agent[]) => {
  const imgSrc = agents.find(
    (agent) => agent.displayName === agentName
  )?.displayIconSmall;

  if (!imgSrc) throw new Error("Could not find agent!");

  return imgSrc;
};

export const getFirstBloodsAndDeaths = (rounds: Round[]) => {
  const killEvents: KillEvent[] = [];
  for (const round of rounds) {
    let killEvent: KillEvent | null = null;

    round.player_stats.forEach((player) => {
      if (!player.kill_events) return;

      player.kill_events.forEach((kill) => {
        if (
          !killEvent ||
          kill.kill_time_in_round < killEvent?.kill_time_in_round
        )
          killEvent = kill;
      });
    });

    if (killEvent) killEvents.push(killEvent);
  }

  const firstBloodsAndDeaths = killEvents.map((killEvent) => ({
    [killEvent.killer_puuid]: killEvent.victim_puuid,
  }));

  return firstBloodsAndDeaths as Record<string, string>[];
};

export const getRoundOutcomeImg = (outcome: string, team: string) => {
  switch (outcome) {
    case "Eliminated":
      if (team === "Blue") return eliminationwin1.src;
      if (team === "Red") return eliminationloss1.src;
    case "Bomb defused":
      if (team === "Blue") return defusewin1.src;
      if (team === "Red") return defuseloss1.src;
    case "Surrendered":
      if (team === "Blue" || team === "Red") return surrender.src;
    case "Bomb detonated":
      if (team === "Blue") return explosionwin1.src;
      if (team === "Red") return explosionloss1.src;
    case "Round timer expired":
      if (team === "Blue") return timewin1.src;
      if (team === "Red") return timeloss1.src;
    default:
      return outcome;
  }
};
