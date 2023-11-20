import {
  getAgents,
  getCompetitiveTiers,
  getMaps,
  getPlayerAccount,
  getPlayerMMR,
  getPlayerMatches,
} from "../../../../apis/api";
import { PlayerAccuracyCard } from "../../../components/cards/playerAccuracyCard";
import { PlayerCardImage } from "../../../components/playerCardImage";
import { PlayerGameName } from "../../../components/playerGameName";
import { PlayerOverallAverageStatsCard } from "../../../components/cards/playerOverallStatsCard";
import { PlayerTagLine } from "../../../components/playerTagline";
import {
  getAvgStatsArrayForMatches,
  getMapsAndAgentsPlayed,
  getOverallAverageStats,
} from "../../../helpers";
import styles from "./page.module.css";
import { StatAreaChartCard } from "../../../components/cards/statAreaChartCard";
import { RankRatingCard } from "../../../components/cards/rankRatingCard";
import { MapsCard } from "../../../components/cards/mapsCard";
import { MatchWinRatesCard } from "../../../components/cards/matchWinRatesCard";
import { GameModeSelectCard } from "../../../components/cards/gameModeSelectCard";
import { RecentMatchesCard } from "../../../components/cards/recentMatchesCard";

const Page = async ({ params }: { params: { playerTag: string } }) => {
  const playerNameTag = decodeURIComponent(params.playerTag).split("#");

  const playerAccount = await getPlayerAccount(
    playerNameTag[0],
    playerNameTag[1]
  );

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

  const peakRankTier = playerMMR.highest_rank.patched_tier;
  const rankUUID = playerMMR.current_data.images.small.split("/")[4];

  const competitiveTiers = await getCompetitiveTiers(rankUUID);

  const peakRankSmallIcon = competitiveTiers.tiers.find(
    (tier) => tier.tierName.toLowerCase() === peakRankTier.toLowerCase()
  )!.smallIcon;

  const maps = await getMaps();

  const agents = await getAgents();

  const { mapsPlayed } = getMapsAndAgentsPlayed(
    recentMatches,
    playerAccount,
    maps
  );

  const avgStatsArray = getAvgStatsArrayForMatches(
    recentMatches,
    playerAccount.puuid
  );

  const overallAverageStats = getOverallAverageStats(
    avgStatsArray,
    recentMatches
  );

  return (
    <div className={styles.page_container}>
      <div className={styles.image_name_container}>
        <PlayerCardImage
          src={playerAccount.card.small}
          boxShadow="0 0 0 0.25rem #2f2f2f inset"
        />
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
          <GameModeSelectCard />
          <RankRatingCard
            currentRank={playerMMR.current_data.currenttierpatched}
            currentRankImgSrc={playerMMR.current_data.images.small}
            peakRank={playerMMR.highest_rank.patched_tier}
            peakRankImgSrc={peakRankSmallIcon}
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
          <MapsCard mapsData={mapsPlayed} />
        </div>

        <div className={styles.matches_container}>
          <MatchWinRatesCard mapsData={mapsPlayed} />
          <RecentMatchesCard
            playerPuuid={playerAccount.puuid}
            recentMatches={recentMatches}
            agents={agents}
            matchesStats={avgStatsArray}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
