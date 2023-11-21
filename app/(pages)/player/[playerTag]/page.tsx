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
import { Suspense } from "react";

const Page = async ({ params }: { params: { playerTag: string } }) => {
  const playerNameTag = decodeURIComponent(params.playerTag).split("#");

  return (
    <div className={styles.page_container}>
      <div className={styles.image_name_container}>
        <Suspense fallback={<>KLoading</>}>
          <PlayerCardImage
            playerNameTag={playerNameTag}
            boxShadow="0 0 0 0.25rem #2f2f2f inset"
          />
        </Suspense>

        <div>
          <Suspense fallback={<>KLoading</>}>
            <PlayerGameName
              playerNameTag={playerNameTag}
              fontSize="2rem"
              fontWeight="500"
            />{" "}
            <PlayerTagLine playerNameTag={playerNameTag} fontSize="1.825rem" />
          </Suspense>
        </div>
      </div>
      <div className={styles.stats_container}>
        <div className={styles.sidebar_container}>
          <GameModeSelectCard />
          <Suspense fallback={<div>TESTING</div>}>
            <RankRatingCard playerNameTag={playerNameTag} />
          </Suspense>
          <Suspense fallback={<div>TESTING</div>}>
            <PlayerOverallAverageStatsCard playerNameTag={playerNameTag} />
          </Suspense>
          <Suspense fallback={<div>TESTING1234</div>}>
            <PlayerAccuracyCard playerNameTag={playerNameTag} />
          </Suspense>
          <Suspense fallback={<div>fasd1234123</div>}>
            <StatAreaChartCard playerNameTag={playerNameTag} />
          </Suspense>
          <Suspense fallback={<div>1232fasd1234123</div>}>
            <MapsCard playerNameTag={playerNameTag} />
          </Suspense>
        </div>

        <div className={styles.matches_container}>
          <Suspense fallback={<div>fasd1234123</div>}>
            <MatchWinRatesCard playerNameTag={playerNameTag} />
          </Suspense>
          <Suspense fallback={<div>fasd1234123</div>}>
            <RecentMatchesCard playerNameTag={playerNameTag} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
