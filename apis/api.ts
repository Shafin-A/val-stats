import { LeaderboardPlayer } from "../types/types";

export const getLeaderboardData = async (
  affinity: string
): Promise<LeaderboardPlayer[]> => {
  const res = await fetch(
    `https://api.henrikdev.xyz/valorant/v1/leaderboard/${affinity}`
    // { next: { revalidate: 1 } }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  // Add the region
  const data = (await res.json()) as LeaderboardPlayer[];

  return data.map((player) => ({ ...player, region: affinity }));
};

export const getAllLeaderboardData = async (
  regions: string[]
): Promise<LeaderboardPlayer[]> => {
  const promises = regions.map((region) => getLeaderboardData(region));
  const results = await Promise.all(promises);

  const leaderboardData = results.flat();

  return leaderboardData;
};
