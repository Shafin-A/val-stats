import { getPlayerAccount, getPlayerMatches } from "../../../../apis/api";
import { getKASTForMatch, getPlayerAvgStatsForMatch } from "../../../helpers";
import { PlayerCardImage } from "../../../components/playerCardImage";
import { PlayerTagLine } from "../../../components/playerTagline";
import { PlayerGameName } from "../../../components/playerGameName";

const Page = async () => {
  const playerAccount = await getPlayerAccount("SEN tarik", "1337");

  const recentMatches = await getPlayerMatches(
    playerAccount.region,
    "SEN tarik",
    "1337",
    1,
    "competitive"
  );

  const playedAgents = {} as Record<string, number>;

  recentMatches.forEach((match) => {
    const player = match.players.all_players.find(
      (player) => player.puuid === playerAccount.puuid
    );

    if (player) {
      if (player.character in playedAgents) playedAgents[player.character] += 1;
      else playedAgents[player.character] = 1;
    }
  });

  const KAST = getKASTForMatch(playerAccount.puuid, recentMatches[0].rounds);

  const player = recentMatches[0].players.all_players.find(
    (matchPlayer) => matchPlayer.puuid === playerAccount.puuid
  );

  if (!player) throw new Error("Could not find player in match!");

  const playerAvgStats = getPlayerAvgStatsForMatch(
    player,
    recentMatches[0].rounds.length
  );

  console.log(`
  KAST      = ${KAST}
  ADD       = ${playerAvgStats.AvgDamageDeltaForMatch}
  ACS       = ${playerAvgStats.ACSForMatch}
  ADR       = ${playerAvgStats.ADRForMatch}
  Headshot% = ${playerAvgStats.avgHeadShotPercentage}
  Bodyshot% = ${playerAvgStats.avgBodyShotPercentage}
  Legshot%  = ${playerAvgStats.avgLegShotPercentage}

  `);
  return (
    <>
      <div>
        <PlayerCardImage src={playerAccount.card.small} />
        <div>
          <PlayerGameName gameName={playerAccount.name} />{" "}
          <PlayerTagLine tagLine={playerAccount.tag} />
        </div>
      </div>
    </>
  );
};

export default Page;
