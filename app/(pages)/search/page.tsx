import Search from "../../components/search";
import styles from "./page.module.css";
import ValorantLogo from "../../../assets/valorant.svg";
import { getAllLeaderboardData } from "../../../apis/api";
import { Suspense } from "react";
import { LeaderboardPlayer } from "../../../types/types";
import { LeaderboardCard } from "../../components/leaderboardCard";

const REGIONS = {
  NA: "na",
  EU: "eu",
  LATAM: "latam",
  AP: "ap",
  BR: "br",
  KR: "kr",
};

const Page = async () => {
  const leaderboardData = await getAllLeaderboardData(Object.values(REGIONS));

  const rankOnePlayers: LeaderboardPlayer[] = [];

  const suggestions = leaderboardData
    .filter((leaderboardPlayer) => {
      if (leaderboardPlayer.leaderboardRank === 1)
        rankOnePlayers.push(leaderboardPlayer);

      return leaderboardPlayer.gameName;
    })
    .map((obj) => `${obj.gameName}#${obj.tagLine}`);

  // const suggestions = ["Terfin#Omris", "Omris#Terfin"];

  console.log(rankOnePlayers);

  return (
    <main className={styles.main}>
      <div className={styles.title_logo_container}>
        <div className={styles.logo_container}>
          <ValorantLogo className={styles.logo} />
        </div>
        <h1>Valorant Stats</h1>
      </div>
      <div className={styles.search_container}>
        <Suspense fallback={<p>Loading leaderboard....</p>}>
          <Search suggestions={suggestions} />
        </Suspense>
      </div>
      <div className={styles.leaderboard_cards_container}>
        {rankOnePlayers.map((player) => (
          <LeaderboardCard
            key={player.puuid}
            playerCardID={player.PlayerCardID}
            leaderboardRank={player.leaderboardRank}
            gameName={player.gameName}
            tagLine={player.tagLine}
            region={player.region}
            rankedRating={player.rankedRating}
            isAnonymized={player.IsAnonymized}
          />
        ))}
      </div>
    </main>
  );
};

export default Page;
