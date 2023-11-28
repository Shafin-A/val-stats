import { PlayerAccuracyCard } from "../../../../components/cards/playerAccuracyCard";
import { PlayerCardImage } from "../../../../components/playerCardImage";
import { PlayerGameName } from "../../../../components/playerGameName";
import { PlayerOverallAverageStatsCard } from "../../../../components/cards/playerOverallStatsCard";
import { PlayerTagLine } from "../../../../components/playerTagline";
import styles from "./page.module.css";
import { StatAreaChartCard } from "../../../../components/cards/statAreaChartCard";
import { RankRatingCard } from "../../../../components/cards/rankRatingCard";
import { MapsCard } from "../../../../components/cards/mapsCard";
import { MatchWinRatesCard } from "../../../../components/cards/matchWinRatesCard";
import { GameModeSelectCard } from "../../../../components/cards/gameModeSelectCard";
import { RecentMatchesCard } from "../../../../components/cards/recentMatchesCard";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, Divider } from "@tremor/react";
import { CommentsSection } from "../../../../components/comments/commentsSection";
import { getPuuidComments } from "../../../../../apis/api";
import { CommentSectionComment } from "../../../../../types/types";

const Page = async ({
  params,
}: {
  params: { playerTag: string; puuid: string };
}) => {
  const playerNameTag = decodeURIComponent(params.playerTag).split("#");

  const fetchComments = async () => {
    try {
      const comments = await getPuuidComments(params.puuid);

      return comments;
    } catch (e) {
      console.error(e);

      return [] as CommentSectionComment[];
    }
  };

  const comments = await fetchComments();

  return (
    <div className={styles.page_container}>
      <div className={styles.image_name_container}>
        <Suspense
          fallback={
            <div className={styles.skeleton_container}>
              <Skeleton
                baseColor="gray"
                circle={true}
                height={60}
                width={60}
                containerClassName={styles.skeleton_circle}
              />
              <Skeleton baseColor="gray" height={36} width={200} />
            </div>
          }
        >
          <PlayerCardImage
            playerNameTag={playerNameTag}
            boxShadow="0 0 0 0.25rem #2f2f2f inset"
          />

          <div>
            <PlayerGameName
              playerNameTag={playerNameTag}
              fontSize="2rem"
              fontWeight="500"
            />{" "}
            <PlayerTagLine playerNameTag={playerNameTag} fontSize="1.825rem" />
          </div>
        </Suspense>
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
                <Skeleton baseColor="gray" count={40} />
              </Card>
            }
          >
            <RecentMatchesCard playerNameTag={playerNameTag} />
          </Suspense>
        </div>
      </div>
      <Divider>Comments</Divider>
      <CommentsSection comments={comments} maxDepth={5} />
    </div>
  );
};

export default Page;
