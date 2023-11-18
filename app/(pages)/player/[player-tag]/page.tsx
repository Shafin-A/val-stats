import {
  getPlayerAccount,
  getPlayerMMR,
  getPlayerMatches,
} from "../../../../apis/api";
import { Card } from "@tremor/react";
import { PlayerAccuracyCard } from "../../../components/playerAccuracyCard";
import { PlayerCardImage } from "../../../components/playerCardImage";
import { PlayerGameName } from "../../../components/playerGameName";
import { PlayerOverallAverageStatsCard } from "../../../components/playerOverallStatsCard";
import { PlayerTagLine } from "../../../components/playerTagline";
import {
  getAvgStatsArrayForMatches,
  getOverallAverageStats,
} from "../../../helpers";
import styles from "./page.module.css";
import { StatAreaChartCard } from "../../../components/statAreaChartCard";

const Page = async () => {
  const playerAccount = await getPlayerAccount("PlzHireMeAsDev", "layof");

  const recentMatches = await getPlayerMatches(
    playerAccount.region,
    playerAccount.name,
    playerAccount.tag,
    10,
    "competitive"
  );

  const playerMMR = await getPlayerMMR(
    playerAccount.region,
    playerAccount.name,
    playerAccount.tag
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

  const avgStatsArray = getAvgStatsArrayForMatches(
    recentMatches,
    playerAccount.puuid
  );

  const overallAverageStats = getOverallAverageStats(
    avgStatsArray,
    recentMatches
  );

  console.log(`
  Stats across ${recentMatches.length} matches
  KAST      = ${overallAverageStats.KAST}
  ADD       = ${overallAverageStats.AvgDamageDeltaForMatch}
  ACS       = ${overallAverageStats.ACSForMatch}
  ADR       = ${overallAverageStats.ADRForMatch}
  Headshot% = ${overallAverageStats.avgHeadShotPercentage}
  Bodyshot% = ${overallAverageStats.avgBodyShotPercentage}
  Legshot%  = ${overallAverageStats.avgLegShotPercentage}
  KD        = ${overallAverageStats.KD}
  `);

  return (
    <div className={styles.page_container}>
      <div className={styles.image_name_container}>
        <PlayerCardImage src={playerAccount.card.small} />
        <div>
          <PlayerGameName
            gameName={playerAccount.name}
            fontSize="2rem"
            fontWeight="500"
          />{" "}
          <PlayerTagLine tagLine={playerAccount.tag} fontSize="1.825rem" />
        </div>
      </div>
      <div className={styles.stats_container}>
        <div className={styles.sidebar_container}>
          <Card>
            Game Mode
            <select>
              <option>123</option>
            </select>
          </Card>
          <Card>
            Current Rating
            <img src={playerMMR.current_data.images.small} />
            {playerMMR.current_data.currenttierpatched}
            {/* Peak Rating */}
          </Card>
          <PlayerOverallAverageStatsCard
            overallAverageStats={overallAverageStats}
          />
          <PlayerAccuracyCard
            numGames={recentMatches.length}
            headPercent={Number(
              overallAverageStats.avgHeadShotPercentage.toFixed(1)
            )}
            bodyPercent={Number(
              overallAverageStats.avgBodyShotPercentage.toFixed(1)
            )}
            legsPercent={Number(
              overallAverageStats.avgLegShotPercentage.toFixed(1)
            )}
          />
          <StatAreaChartCard data={avgStatsArray} />
          <Card>Maps??</Card>
        </div>

        <div className={styles.matches_container}>
          <Card>Agents DEETS</Card>
          <Card>Match Histyory</Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
