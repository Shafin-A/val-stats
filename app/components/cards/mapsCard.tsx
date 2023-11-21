import { Card } from "@tremor/react";
import styles from "./mapsCard.module.css";
import { getMaps, getPlayerAccount, getPlayerMatches } from "../../../apis/api";
import { getMapsAndAgentsPlayed } from "../../helpers";

interface mapsCardProps {
  playerNameTag: string[];
}

interface mapDetailProps {
  mapName: string;
  stats: {
    win: number;
    loss: number;
    imgSrc?: string;
  };
}

const MapDetail = ({ mapName, stats }: mapDetailProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${stats.imgSrc})`,
      }}
      className={styles.map_container}
    >
      <div className={styles.map_inner_container}>
        <div className={styles.map_name}>{mapName}</div>
        <div className={styles.stats_container}>
          <span>{stats.win}</span>
          <span className={styles.win}>{` W`}</span>
          {" - "}
          <span>{stats.loss}</span>
          <span className={styles.loss}>{` L`}</span>
        </div>
      </div>
    </div>
  );
};

export const MapsCard = async ({ playerNameTag }: mapsCardProps) => {
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

  const maps = await getMaps();

  const { mapsPlayed } = getMapsAndAgentsPlayed(
    recentMatches,
    playerAccount,
    maps
  );

  const numGames = recentMatches.length;

  return (
    <Card>
      <span className={styles.map_title}>Maps - Last {numGames} games</span>
      <div className={styles.maps_container}>
        {Object.entries(mapsPlayed).map(([mapName, stats]) => (
          <MapDetail key={mapName} mapName={mapName} stats={stats} />
        ))}
      </div>
    </Card>
  );
};
