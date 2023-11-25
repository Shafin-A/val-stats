export interface LeaderboardPlayer {
  PlayerCardID: string;
  TitleID: string;
  IsBanned: boolean;
  IsAnonymized: boolean;
  puuid: string;
  gameName: string;
  tagLine: string;
  leaderboardRank: number;
  rankedRating: number;
  numberOfWins: number;
  competitiveTier: number;
}

export interface PlayerAccount {
  puuid: string;
  region: string;
  account_level: number;
  name: string;
  tag: string;
  card: {
    small: string;
    large: string;
    wide: string;
    id: string;
  };
  last_update: string;
  last_update_raw: number;
}

export interface Metadata {
  map: string;
  game_version: string;
  game_length: number;
  game_start: number;
  game_start_patched: string;
  rounds_played: number;
  mode: string;
  mode_id: string;
  queue: string;
  season_id: string;
  platform: string;
  matchid: string;
  premier_info: {
    tournament_id: string;
    matchup_id: string;
  };
  region: string;
  cluster: string;
}

export interface SessionPlaytime {
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface Platform {
  type: string;
  os: {
    name: string;
    version: string;
  };
}

export interface Location {
  x: number;
  y: number;
}

export interface AbilityCasts {
  c_cast: number;
  q_cast: number;
  e_cast: number;
  x_cast: number;
}

export interface Player {
  puuid: string;
  name: string;
  tag: string;
  team: string;
  level: number;
  character: string;
  currenttier: number;
  currenttier_patched: string;
  player_card: string;
  player_title: string;
  party_id: string;
  session_playtime: SessionPlaytime;
  assets: {
    card: {
      small: string;
      large: string;
      wide: string;
    };
    agent: {
      small: string;
      full: string;
      bust: string;
      killfeed: string;
    };
  };
  behaviour: {
    afk_rounds: number;
    friendly_fire: {
      incoming: number;
      outgoing: number;
    };
    rounds_in_spawn: number;
  };
  platform: Platform;
  ability_casts: AbilityCasts;
  stats: {
    score: number;
    kills: number;
    deaths: number;
    assists: number;
    bodyshots: number;
    headshots: number;
    legshots: number;
  };
  economy: {
    spent: {
      overall: number;
      average: number;
    };
    loadout_value: {
      overall: number;
      average: number;
    };
  };
  damage_made: number;
  damage_received: number;
}

export interface Observer {
  puuid: string;
  name: string;
  tag: string;
  platform: Platform;
  session_playtime: SessionPlaytime;
  team: string;
  level: number;
  player_card: string;
  player_title: string;
  party_id: string;
}

export interface Coach {
  puuid: string;
  team: string;
}

export interface Team {
  has_won: boolean;
  rounds_won: number;
  rounds_lost: number;
  roster: {
    members: string[];
    name: string;
    tag: string;
    customization: {
      icon: string;
      image: string;
      primary: string;
      secondary: string;
      tertiary: string;
    };
  };
}

export interface DamageEvent {
  receiver_puuid: string;
  receiver_display_name: string;
  receiver_team: string;
  bodyshots: number;
  damage: number;
  headshots: number;
  legshots: number;
}

export interface KillEvent {
  kill_time_in_round: number;
  kill_time_in_match: number;
  killer_puuid: string;
  killer_display_name: string;
  killer_team: string;
  victim_puuid: string;
  victim_display_name: string;
  victim_team: string;
  victim_death_location: Location;
  damage_weapon_id: string;
  damage_weapon_name: string;
  damage_weapon_assets: {
    display_icon: string;
    killfeed_icon: string;
  };
  secondary_fire_mode: boolean;
  player_locations_on_kill: {
    player_puuid: string;
    player_display_name: string;
    player_team: string;
    location: Location;
    view_radians: number;
  }[];
  assistants: {
    assistant_puuid: string;
    assistant_display_name: string;
    assistant_team: string;
  }[];
}

export interface PlayerStats {
  ability_casts: AbilityCasts;
  player_puuid: string;
  player_display_name: string;
  player_team: string;
  damage_events: DamageEvent[];
  damage: number;
  bodyshots: number;
  headshots: number;
  legshots: number;
  kill_events: KillEvent[];
  kills: number;
  score: number;
  economy: {
    loadout_value: number;
    weapon: {
      id: string;
      name: string;
      assets: {
        display_icon: string;
        killfeed_icon: string;
      };
    };
    armor: {
      id: string;
      name: string;
      assets: {
        display_icon: string;
      };
    };
    remaining: number;
    spent: number;
  };
  was_afk: boolean;
  was_penalized: boolean;
  stayed_in_spawn: boolean;
}

export interface Round {
  winning_team: string;
  end_type: string;
  bomb_planted: boolean;
  bomb_defused: boolean;
  plant_events: {
    plant_location: Location;
    planted_by: {
      puuid: string;
      display_name: string;
      team: string;
    };
    plant_site: string;
    plant_time_in_round: number;
    player_locations_on_plant: {
      player_puuid: string;
      player_display_name: string;
      player_team: string;
      location: Location;
      view_radians: number;
    }[];
  };
  defuse_events: {
    defuse_location: Location;
    defused_by: { puuid: string; display_name: string; team: string };
    defuse_time_in_round: number;
    player_locations_on_defuse: {
      player_puuid: string;
      player_display_name: string;
      player_team: string;
      location: Location;
      view_radians: number;
    }[];
  };
  player_stats: PlayerStats[];
}

export interface Match {
  metadata: Metadata;
  players: {
    all_players: Player[];
    red: Player[];
    blue: Player[];
  };
  observers: Observer[];
  coaches: Coach[];
  teams: {
    red: Team;
    blue: Team;
  };
  rounds: Round[];
}

export interface MMRData {
  currenttier: number;
  currenttierpatched: string;
  images: {
    small: string;
    large: string;
    triangle_down: string;
    triangle_up: string;
  };
  ranking_in_tier: number;
  mmr_change_to_last_game: number;
  elo: number;
  old: boolean;
}

export interface SeasonData {
  error: boolean;
  wins: number;
  number_of_games: number;
  final_rank: number;
  final_rank_patched: string;
  act_rank_wins: {
    patched_tier: string;
    tier: number;
  }[];
  old: boolean;
}

export interface MMR {
  name: string;
  tag: string;
  current_data: MMRData;
  highest_rank: {
    old: boolean;
    tier: number;
    patched_tier: string;
    season: string;
  };
  by_season: Record<string, SeasonData>;
}

export interface CompetitiveTier {
  tier: number;
  tierName: string;
  division: string;
  divisionName: string;
  color: string;
  backgroundColor: string;
  smallIcon: string;
  largeIcon: string;
  rankTriangleDownIcon: string;
  rankTriangleUpIcon: string;
}

export interface CompetitiveTiers {
  uuid: string;
  assetObjectName: string;
  tiers: CompetitiveTier[];
  assetPath: string;
}

export interface Map {
  uuid: string;
  displayName: string;
  narrativeDescription?: string;
  tacticalDescription?: string;
  coordinates?: string;
  displayIcon?: string;
  listViewIcon: string;
  splash: string;
  assetPath: string;
  mapUrl: string;
  xMultiplier: number;
  yMultiplier: number;
  xScalarToAdd: number;
  yScalarToAdd: number;
  callouts?: Callout[];
}

export interface Callout {
  regionName: string;
  superRegionName: string;
  location: Location;
}

export interface MapData {
  [name: string]: {
    win: number;
    loss: number;
    imgSrc?: string;
  };
}

export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  characterTags?: string[];
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: string;
  fullPortrait: string;
  fullPortraitV2: string;
  killfeedPortrait: string;
  background: string;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: Role;
  recruitmentData?: RecruitmentData;
  abilities: Ability[];
  voiceLine?: string;
}

export interface Role {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  assetPath: string;
}

export interface RecruitmentData {
  counterId: string;
  milestoneId: string;
  milestoneThreshold: number;
  useLevelVpCostOverride: boolean;
  levelVpCostOverride: number;
  startDate: string;
  endDate: string;
}

export interface Ability {
  slot: string;
  displayName: string;
  description: string;
  displayIcon?: string;
}

export interface CommentSectionComment {
  user: string;
  timestamp: string;
  content: string;
  depth: number;
  replies: CommentSectionComment[];
}
