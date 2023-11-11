import { LeaderboardPlayer, Match } from "../types/types";

export const getLeaderboardData = async (
  affinity: string
): Promise<Record<string, LeaderboardPlayer[]>> => {
  const res = await fetch(
    `https://api.henrikdev.xyz/valorant/v1/leaderboard/${affinity}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch leaderboard data");
  }

  // Add the region
  const data = (await res.json()) as LeaderboardPlayer[];

  return { [affinity]: data };
};

export const getAllLeaderboardData = async (
  regions: string[]
): Promise<Record<string, LeaderboardPlayer[]>> => {
  const promises = regions.map((region) => getLeaderboardData(region));
  const results = await Promise.all(promises);

  const leaderboardData: Record<string, LeaderboardPlayer[]> = {};

  regions.forEach((region, index) => {
    leaderboardData[region] = results[index][region];
  });

  return leaderboardData;
};

export const getPlayerMatches = async (
  affinity: string,
  name: string,
  tag: string,
  numMatches: number,
  matchMode: string
): Promise<Match[]> => {
  const res = await fetch(
    `https://api.henrikdev.xyz/valorant/v3/matches/${affinity}/${name}/${tag}?size=${numMatches}&mode=${matchMode}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch match data");
  }

  const { status, data } = await res.json();

  if (status !== 200) {
    throw new Error("Failed to fetch match data");
  }

  return data;
};
