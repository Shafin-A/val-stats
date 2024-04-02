import {
  Agent,
  CommentSectionComment,
  CompetitiveTiers,
  LeaderboardPlayer,
  LoginToken,
  MMR,
  Map,
  Match,
  PlayerAccount,
  User,
} from "../types/types";

export const getLeaderboardData = async (
  affinity: string
): Promise<Record<string, LeaderboardPlayer[]>> => {
  const res = await fetch(
    `https://api.henrikdev.xyz/valorant/v1/leaderboard/${affinity}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData);
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

  const { status, data, errors } = await res.json();

  if (status !== 200) {
    throw new Error(`${status}: ${errors[0].message}`);
  }

  return data as PlayerAccount;
};

export const getMatch = async (matchId: string): Promise<Match> => {
  const res = await fetch(
    `https://api.henrikdev.xyz/valorant/v2/match/${matchId}`,
    {
      next: { revalidate: 300 },
    }
  );

  const { status, data, errors } = await res.json();

  if (status !== 200) {
    throw new Error(`${status}: ${errors[0].message}`);
  }

  return data as Match;
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

  const { status, data, errors } = await res.json();

  if (status !== 200) {
    throw new Error(`${status}: ${errors[0].message}`);
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

  const { status, data, errors } = await res.json();

  if (status !== 200) {
    throw new Error(`${status}: ${errors[0].message}`);
  }

  return data as MMR;
};

export const getCompetitiveTiers = async (
  uuid: string
): Promise<CompetitiveTiers> => {
  const res = await fetch(
    `https://valorant-api.com/v1/competitivetiers/${uuid}`
  );

  const { status, data, error } = await res.json();

  if (status !== 200) {
    throw new Error(`${status}: ${error}`);
  }

  return data as CompetitiveTiers;
};

export const getAllCompetitiveTiers = async (): Promise<CompetitiveTiers[]> => {
  const res = await fetch(`https://valorant-api.com/v1/competitivetiers`);

  const { status, data, error } = await res.json();

  if (status !== 200) {
    throw new Error(`${status}: ${error}`);
  }

  return data as CompetitiveTiers[];
};

export const getMaps = async (): Promise<Map[]> => {
  const res = await fetch(`https://valorant-api.com/v1/maps`);

  const { status, data, error } = await res.json();

  if (status !== 200) {
    throw new Error(`${status}: ${error}`);
  }

  return data as Map[];
};

export const getAgents = async (): Promise<Agent[]> => {
  const res = await fetch(
    `https://valorant-api.com/v1/agents?isPlayableCharacter=true`
  );

  const { status, data, error } = await res.json();

  if (status !== 200) {
    throw new Error(`${status}: ${error}`);
  }

  return data as Agent[];
};

export const login = async (
  username: string,
  password: string
): Promise<LoginToken> => {
  const res = await fetch(`https://val-stats-server.fly.dev/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cache: "no-cache",
    body: new URLSearchParams({
      username: username,
      password: password,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail);
  }

  const token = await res.json();

  return token as LoginToken;
};

export const signUp = async (
  username: string,
  email: string,
  password: string
): Promise<LoginToken> => {
  const res = await fetch(`https://val-stats-server.fly.dev/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: username,
      email: email,
      password: password,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail);
  }

  const token = await res.json();

  return token as LoginToken;
};

export const getCurrentLoggedInUser = async (token: string): Promise<User> => {
  const res = await fetch(`https://val-stats-server.fly.dev/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail);
  }

  const user = await res.json();

  return user as User;
};

export const getPuuidComments = async (
  puuid: string
): Promise<CommentSectionComment[]> => {
  const res = await fetch(
    `https://val-stats-server.fly.dev/comments/puuid/${puuid}`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail);
  }

  const comments = await res.json();

  return comments as CommentSectionComment[];
};

export const postComment = async (
  puuid: string,
  token: string,
  content: string,
  parentId?: number
): Promise<CommentSectionComment> => {
  const body = parentId
    ? {
        content: content,
        parent_id: parentId,
      }
    : ({ content: content } as Record<string, string>);

  const res = await fetch(
    `https://val-stats-server.fly.dev/comments/puuid/${puuid}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail);
  }

  const postedComment = await res.json();

  return postedComment as CommentSectionComment;
};
