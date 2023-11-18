import {
  CompetitiveTiers,
  LeaderboardPlayer,
  MMR,
  Map,
  Match,
  PlayerAccount,
} from "../types/types";

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

export const getPlayerAccount = async (
  name: string,
  tag: string
): Promise<PlayerAccount> => {
  const res = await fetch(
    `https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch player data");
  }

  const { status, data } = await res.json();

  if (status !== 200) {
    throw new Error("Failed to fetch player data");
  }

  return data as PlayerAccount;
};

export const getPlayerMatches = async (
  affinity: string,
  name: string,
  tag: string,
  numMatches: number,
  matchMode: string
): Promise<Match[]> => {
  const res = await fetch(
    `https://api.henrikdev.xyz/valorant/v3/matches/${affinity}/${name}/${tag}?size=${numMatches}&mode=${matchMode}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch match data");
  }

  const { status, data } = await res.json();

  if (status !== 200) {
    throw new Error("Failed to fetch match data");
  }

  return data as Match[];
};

export const getPlayerMMR = async (
  affinity: string,
  name: string,
  tag: string,
  season?: string
): Promise<MMR> => {
  const apiUrl = `https://api.henrikdev.xyz/valorant/v2/mmr/${affinity}/${name}/${tag}${
    season ? `?season=${season}` : ""
  }`;

  const res = await fetch(apiUrl, { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new Error("Failed to fetch MMR data");
  }

  const { status, data } = await res.json();

  if (status !== 200) {
    throw new Error("Failed to fetch MMR data");
  }

  return data as MMR;
};

export const getCompetitiveTiers = async (
  uuid: string
): Promise<CompetitiveTiers> => {
  const res = await fetch(
    `https://valorant-api.com/v1/competitivetiers/${uuid}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch competitive tiers data");
  }

  const { status, data } = await res.json();

  if (status !== 200) {
    throw new Error("Failed to fetch competitive tiers data");
  }

  return data as CompetitiveTiers;
};

export const getMaps = async (): Promise<Map[]> => {
  const res = await fetch(`https://valorant-api.com/v1/maps`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch maps data");
  }

  const { status, data } = await res.json();

  if (status !== 200) {
    throw new Error("Failed to fetch maps data");
  }

  return data as Map[];
};
