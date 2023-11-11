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
    red: Team[];
    blue: Team[];
  };
  rounds: Round[];
}
