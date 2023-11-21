import { PlayerAccuracyCard } from "../../../components/cards/playerAccuracyCard";
import { PlayerCardImage } from "../../../components/playerCardImage";
import { PlayerGameName } from "../../../components/playerGameName";
import { PlayerOverallAverageStatsCard } from "../../../components/cards/playerOverallStatsCard";
import { PlayerTagLine } from "../../../components/playerTagline";
import styles from "./page.module.css";
import { StatAreaChartCard } from "../../../components/cards/statAreaChartCard";
import { RankRatingCard } from "../../../components/cards/rankRatingCard";
import { MapsCard } from "../../../components/cards/mapsCard";
import { MatchWinRatesCard } from "../../../components/cards/matchWinRatesCard";
import { GameModeSelectCard } from "../../../components/cards/gameModeSelectCard";
import { RecentMatchesCard } from "../../../components/cards/recentMatchesCard";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card } from "@tremor/react";

const Page = async ({ params }: { params: { playerTag: string } }) => {
  const playerNameTag = decodeURIComponent(params.playerTag).split("#");

  return (
    <div className={styles.page_container}>
      <div className={styles.image_name_container}>
        <Suspense
          fallback={
            <Card>
              <Skeleton baseColor="gray" />
            </Card>
          }
        >
          <PlayerCardImage
            playerNameTag={playerNameTag}
            boxShadow="0 0 0 0.25rem #2f2f2f inset"
          />
        </Suspense>

        <div>
          <Suspense
            fallback={
              <Card>
                <Skeleton baseColor="gray" />
              </Card>
            }
          >
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
          <Suspense
            fallback={
              <Card>
                <Skeleton baseColor="gray" count={8} />
              </Card>
            }
          >
            <RankRatingCard playerNameTag={playerNameTag} />
          </Suspense>
          <Suspense
            fallback={
              <Card>
                <Skeleton baseColor="gray" count={5} />
              </Card>
            }
          >
            <PlayerOverallAverageStatsCard playerNameTag={playerNameTag} />
          </Suspense>
          <Suspense
            fallback={
              <Card>
                <Skeleton baseColor="gray" count={5} />
              </Card>
            }
          >
            <PlayerAccuracyCard playerNameTag={playerNameTag} />
          </Suspense>
          <Suspense
            fallback={
              <Card>
                <Skeleton baseColor="gray" count={6} />
              </Card>
            }
          >
            <StatAreaChartCard playerNameTag={playerNameTag} />
          </Suspense>
          <Suspense
            fallback={
              <Card>
                <Skeleton baseColor="gray" count={8} />
              </Card>
            }
          >
            <MapsCard playerNameTag={playerNameTag} />
          </Suspense>
        </div>
        <div className={styles.matches_container}>
          <Suspense
            fallback={
              <Card>
                <Skeleton baseColor="gray" />
              </Card>
            }
          >
            <MatchWinRatesCard playerNameTag={playerNameTag} />
          </Suspense>
          <Suspense
            fallback={
              <Card>
                <Skeleton baseColor="gray" count={15} />
              </Card>
            }
          >
            <RecentMatchesCard playerNameTag={playerNameTag} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
