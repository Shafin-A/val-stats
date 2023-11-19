import { Card, Title } from "@tremor/react";
import { MapData } from "../../types/types";
import styles from "./mapsCard.module.css";

interface mapsCardProps {
  mapsData: MapData;
}

export const MapsCard = ({ mapsData }: mapsCardProps) => {
  const numGames = Object.values(mapsData).reduce((acc, map) => {
    acc += map.win + map.loss;
    return acc;
  }, 0);

  return (
    <Card>
      <span className={styles.map_title}>Maps - Last {numGames} games</span>
      <div className={styles.maps_container}>
        {Object.entries(mapsData).map(([mapName, stats]) => {
          return (
            <div
              key={mapName}
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
        })}
      </div>
    </Card>
  );
};