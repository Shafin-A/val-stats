"use client";
import {
  Match,
  Map,
  KillEvent,
  PlantEvent,
  DefuseEvent,
  PlayerLocationEvent,
} from "../../types/types";
import styles from "./matchTimeline.module.css";
import spike from "../../assets/spike.png";
import direction from "../../assets/direction.png";
import { useEffect, useState } from "react";
import { MatchSummary } from "./matchSummary";
import { Card } from "@tremor/react";
import { PlayerGameNameClient } from "./playerGameNameClient";
import { PlayerTagLineClient } from "./playerTaglineClient";

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

  const getEventTime = (
    event: KillEvent | PlantEvent | DefuseEvent
  ): number => {
    if ("kill_time_in_round" in event) return event.kill_time_in_round;
    if ("plant_time_in_round" in event) return event.plant_time_in_round;
    if ("defuse_time_in_round" in event) return event.defuse_time_in_round;
    return 0;
  };

  const killEvents = round.player_stats.flatMap((player) => player.kill_events);
  const plantEvent = round.plant_events;
  const defuseEvent = round.defuse_events;

  const events: (KillEvent | PlantEvent | DefuseEvent)[] = [
    ...(plantEvent.plant_location ? [plantEvent] : []),
    ...(defuseEvent.defuse_location ? [defuseEvent] : []),
    ...killEvents,
  ];

  events.sort((a, b) => getEventTime(a) - getEventTime(b));

  const [selectedRoundEvent, setSelectedRoundEvent] = useState(events[0]);

  const plantLocation = round.plant_events.plant_location;
  const plantTime = round.plant_events.plant_time_in_round;

  const plantX = plantLocation
    ? (plantLocation.y * mapData!.xMultiplier + mapData!.xScalarToAdd) * 100
    : -1;
  const plantY = plantLocation
    ? (plantLocation.x * mapData!.yMultiplier + mapData!.yScalarToAdd) * 100
    : -1;

  const getPlayerLocations = (
    event: KillEvent | PlantEvent | DefuseEvent
  ): PlayerLocationEvent[] => {
    if ("kill_time_in_round" in event) return event.player_locations_on_kill;
    if ("plant_time_in_round" in event) return event.player_locations_on_plant;
    if ("defuse_time_in_round" in event)
      return event.player_locations_on_defuse;
    return [];
  };

  const playerLocations = getPlayerLocations(selectedRoundEvent);

  const victimLocation =
    "kill_time_in_round" in selectedRoundEvent &&
    selectedRoundEvent.victim_death_location;

  const victimX = victimLocation
    ? (victimLocation.y * mapData!.xMultiplier + mapData!.xScalarToAdd) * 100
    : -1;
  const victimY = victimLocation
    ? (victimLocation.x * mapData!.yMultiplier + mapData!.yScalarToAdd) * 100
    : -1;

  const victimPuuid =
    "kill_time_in_round" in selectedRoundEvent &&
    selectedRoundEvent.victim_puuid;

  const agentImg = match.players.all_players.find(
    (player) => player.puuid === victimPuuid
  )?.assets.agent.small;

  const victimTeam =
    "kill_time_in_round" in selectedRoundEvent &&
    selectedRoundEvent.victim_team;

  useEffect(() => {
    setSelectedRoundEvent(events[0]);
  }, [selectedRound]);

  return (
    <>
      <div className={styles.map_container}>
        <img src={minimapImg} className={styles.map_img} />
        {plantLocation && plantTime <= getEventTime(selectedRoundEvent) && (
          <img
            src={spike.src}
            className={styles.spike_img}
            style={{
              top: `${plantY}%`,
              left: `${plantX}%`,
            }}
          />
        )}
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
        {"kill_time_in_round" in selectedRoundEvent && (
          <div
            className={styles.player_agent_container}
            style={{
              top: `${victimY}%`,
              left: `${victimX}%`,
              transform: `translate(-50%, -50%)`,
            }}
          >
            <div>
              <img
                src={agentImg}
                className={styles.agent_img}
                style={{
                  filter: `opacity(0.5) drop-shadow(0 0 0 ${
                    victimTeam === "Blue" ? "#74d5d3" : "#df3a3a"
                  })`,
                  transform: `translate(-50%, -50%)`,
                }}
              />
            </div>
          </div>
        )}
      </div>
      <MatchSummary
        match={match}
        isClickable
        onClick={(index) => setSelectedRound(index)}
      />
      <h1>Round Events</h1>
      <div>
        {events.map((roundEvent) => {
          if ("kill_time_in_round" in roundEvent) {
            const killerPuuid = roundEvent.killer_puuid;
            const victimPuuid = roundEvent.victim_puuid;

            const killerPlayer = match.players.all_players.find(
              (player) => player.puuid === killerPuuid
            )!;

            const victimPlayer = match.players.all_players.find(
              (player) => player.puuid === victimPuuid
            )!;

            const killTimeInSeconds = roundEvent.kill_time_in_round;
            const killTimeDate = new Date(killTimeInSeconds);

            return (
              <Card
                key={roundEvent.kill_time_in_round}
                onClick={() => setSelectedRoundEvent(roundEvent)}
              >
                <div className={styles.round_event_container}>
                  <div className={styles.killer_info_container}>
                    <div className={styles.killer_container}>
                      <img
                        className={styles.kill_agent_img}
                        src={killerPlayer.assets.agent.small}
                        alt={killerPlayer.character}
                      />
                      <div>
                        <PlayerGameNameClient
                          gameName={killerPlayer.name}
                          fontSize="0.875rem"
                        />{" "}
                        <PlayerTagLineClient
                          tagLine={killerPlayer.tag}
                          fontSize="0.875rem"
                        />
                      </div>
                    </div>

                    <div style={{ marginRight: "1rem" }}>
                      {killTimeDate.getMinutes()}:{killTimeDate.getSeconds()}
                    </div>

                    <div>
                      <img
                        src={roundEvent.damage_weapon_assets.killfeed_icon}
                        className={styles.kill_weapon}
                      />
                    </div>
                  </div>

                  <div className={styles.killer_container}>
                    <img
                      className={styles.kill_agent_img}
                      src={victimPlayer.assets.agent.small}
                      alt={victimPlayer.character}
                    />
                    <div>
                      <PlayerGameNameClient
                        gameName={victimPlayer.name}
                        fontSize="0.875rem"
                      />{" "}
                      <PlayerTagLineClient
                        tagLine={victimPlayer.tag}
                        fontSize="0.875rem"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            );
          }

          if ("plant_time_in_round" in roundEvent)
            return (
              <div key={roundEvent.plant_time_in_round}>
                {roundEvent.plant_time_in_round}
              </div>
            );
          if ("defuse_time_in_round" in roundEvent)
            return (
              <div key={roundEvent.defuse_time_in_round}>
                {roundEvent.defuse_time_in_round}
              </div>
            );
        })}
      </div>
    </>
  );
};
