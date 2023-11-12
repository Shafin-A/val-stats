import { Player, Round } from "../types/types";

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
  player: Player,
  totalRounds: number
) => {
  const damageMade = player.damage_made;
  const damageReceived = player.damage_received;
  const damageDelta = damageMade - damageReceived;
  const score = player.stats.score;

  const AvgDamageDeltaForMatch = damageDelta / totalRounds;
  const ADRForMatch = damageDelta / totalRounds;
  const ACSForMatch = score / totalRounds;

  const totalShots =
    player.stats.headshots + player.stats.bodyshots + player.stats.legshots;
  const totalHeadShots = player.stats.headshots;
  const totalBodyShots = player.stats.bodyshots;
  const totalLegShots = player.stats.legshots;

  const avgHeadShotPercentage = (totalHeadShots / totalShots) * 100;
  const avgBodyShotPercentage = (totalBodyShots / totalShots) * 100;
  const avgLegShotPercentage = (totalLegShots / totalShots) * 100;

  return {
    AvgDamageDeltaForMatch,
    ADRForMatch,
    ACSForMatch,
    avgHeadShotPercentage,
    avgBodyShotPercentage,
    avgLegShotPercentage,
  };
};
