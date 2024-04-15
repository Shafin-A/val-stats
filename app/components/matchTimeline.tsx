"use client";
import { Match, Map } from "../../types/types";
import styles from "./matchTimeline.module.css";
import spike from "../../assets/spike.png";
import direction from "../../assets/direction.png";
import { useState } from "react";
import { MatchSummary } from "./matchSummary";

interface MatchTimelineProps {
  match: Match;
  maps: Map[];
}

export const MatchTimeline = ({ match, maps }: MatchTimelineProps) => {
  const [selectedRound, setSelectedRound] = useState(0);
  const map = match.metadata.map;

  const mapData = maps.find(
    (m) => m.displayName.toLowerCase() === map.toLowerCase()
  );

  const minimapImg = mapData?.displayIcon;
  const round = match.rounds[selectedRound];

  const plantLocation = round.plant_events.plant_location;

  const plantX =
    (plantLocation.y * mapData!.xMultiplier + mapData!.xScalarToAdd) * 100;
  const plantY =
    (plantLocation.x * mapData!.yMultiplier + mapData!.yScalarToAdd) * 100;

  const playerLocations = round.plant_events.player_locations_on_plant;

  return (
    <>
      <div className={styles.map_container}>
        <img src={minimapImg} className={styles.map_img} />
        <img
          src={spike.src}
          className={styles.spike_img}
          style={{
            top: `${plantY}%`,
            left: `${plantX}%`,
          }}
        />
        {playerLocations.map((location_details) => {
          const playerPuuid = location_details.player_puuid;
          const playerTeam = location_details.player_team;

          const agentImg = match.players.all_players.find(
            (player) => player.puuid === playerPuuid
          )?.assets.agent.small;

          const playerX =
            (location_details.location.y * mapData!.xMultiplier +
              mapData!.xScalarToAdd) *
            100;
          const playerY =
            (location_details.location.x * mapData!.yMultiplier +
              mapData!.yScalarToAdd) *
            100;

          return (
            <div
              key={playerPuuid}
              className={styles.player_agent_container}
              style={{
                top: `${playerY}%`,
                left: `${playerX}%`,
                transform: `translate(-50%, -50%) rotate(${
                  location_details.view_radians + Math.PI
                }rad)`,
              }}
            >
              <div>
                <img
                  src={direction.src}
                  className={styles.agent_direction_img}
                  style={{
                    filter: `opacity(0.5) drop-shadow(0 0 0 ${
                      playerTeam === "Blue" ? "#74d5d3" : "#df3a3a"
                    }) saturate(1000%)`,
                  }}
                />
                <img
                  src={agentImg}
                  className={styles.agent_img}
                  style={{
                    transform: `translate(0%, 5%) rotate(-${
                      location_details.view_radians + Math.PI
                    }rad)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <MatchSummary
        match={match}
        isClickable
        onClick={(index) => setSelectedRound(index)}
      />
    </>
  );
};
