import {
  getCompetitiveTiers,
  getMaps,
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
  getMapAndPlayerData,
  getOverallAverageStats,
} from "../../../helpers";
import styles from "./page.module.css";
import { StatAreaChartCard } from "../../../components/statAreaChartCard";
import { RankRatingCard } from "../../../components/rankRatingCard";

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

  const peakRankTier = playerMMR.highest_rank.tier;
  const rankUUID = playerMMR.current_data.images.small.split("/")[4];

  const competitiveTiers = await getCompetitiveTiers(rankUUID);

  const peakRankSmallIcon = competitiveTiers.tiers.find(
    (tier) => tier.tier === peakRankTier
  )!.smallIcon;

  const maps = await getMaps();

  const { mapData } = getMapAndPlayerData(recentMatches, playerAccount, maps);

  console.log(mapData);

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
          <RankRatingCard
            currentRating={playerMMR.current_data.currenttierpatched}
            currentRatingImgSrc={playerMMR.current_data.images.small}
            peakRating={playerMMR.highest_rank.patched_tier}
            peakRatingImgSrc={peakRankSmallIcon}
          />
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
