export interface IMap {
  map: string;
  amount: number;
}

export interface ISelectorSettings {
  autoFetch: boolean;
  region: string;
  displayRegion: string;
  platform: string;
  displayPlatform: string;
}

export interface IShow {
  mapStats: boolean;
  soldierAmount: boolean;
  serverAmount: boolean;
  platformsAmount: boolean;
  modesAmount: boolean;
  regionMaps: boolean;
  serverSettings: boolean;
}

export interface ISearch {
  query: string;
  data: {
    avatar: string;
    name: string;
    platformId: number;
    platform: string;
  }[];
}

export interface IApiData {
  maps: { map: string; amount: number }[];
  soldiers: number;
  servers: number;
  platforms: { platform: string; amount: number }[];
  regionMaps: { map: string; amount: number }[];
  modes: { mode: string; amount: number }[];
  settings: { setting: string; amount: number }[];
}