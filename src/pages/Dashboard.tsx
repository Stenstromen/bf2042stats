/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Unique,
  Players,
  Servers,
  Platforms,
  Maps,
  platformString,
  Modes,
  Settings,
} from "../Filters";
import PlatRegSelectorBar from "../components/PlatRegSelectorBar";
import MapStats from "../components/MapStats";
import SoldierAmount from "../components/SoldierAmount";
import ServerAmount from "../components/ServerAmount";
import PlatformsAmount from "../components/PlatformsAmount";
import RegionMaps from "../components/RegionMaps";
import ModesAmount from "../components/ModesAmount";
import ServerSettings from "../components/ServerSettings";
import UserResult from "../components/UserResults";

function Dashboard({ isMobile }: { isMobile: boolean }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [maps, setMaps] = useState<{ map: string; amount: number }[]>([]);

  const [selectorSettings, setSelectorSettings] = useState<{
    autoFetch: boolean;
    region: string;
    displayRegion: string;
    platform: string;
    displayPlatform: string;
  }>({
    autoFetch: true,
    region: "ALL",
    displayRegion: "🌍 ALL",
    platform: "all",
    displayPlatform: "👾 ALL",
  });

  const [show, setShow] = useState<{
    mapStats: boolean;
    soldierAmount: boolean;
    serverAmount: boolean;
    platformsAmount: boolean;
    modesAmount: boolean;
    regionMaps: boolean;
    serverSettings: boolean;
  }>({
    mapStats: true,
    soldierAmount: true,
    serverAmount: true,
    platformsAmount: true,
    modesAmount: true,
    regionMaps: true,
    serverSettings: true,
  });

  const [search, setSearch] = useState<{
    query: string;
    data: {
      avatar: string;
      name: string;
      platformId: number;
      platform: string;
    }[];
  }>({
    query: "",
    data: [],
  });

  const [apiData, setApiData] = useState<{
    maps: { map: string; amount: number }[];
    soldiers: number;
    servers: number;
    platforms: { platform: string; amount: number }[];
    regionMaps: { map: string; amount: number }[];
    modes: { mode: string; amount: number }[];
    settings: { setting: string; amount: number }[];
  }>({
    maps: [],
    soldiers: 0,
    servers: 0,
    platforms: [],
    regionMaps: [],
    modes: [],
    settings: [],
  });

  const getPortalServers = (region: string, platform: string) => {
    axios
      .get(
        `https://api.gametools.network/bf2042/servers/?region=${region}&limit=250&platform=${platform}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        setMaps(Unique(res.data.servers));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBf2042Status = (region: string) => {
    axios
      .get("https://api.gametools.network/bf2042/status/", {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => {
        setApiData({
          maps: Maps(res.data.regions, region),
          soldiers: Players(res.data.regions, region),
          servers: Servers(res.data.regions, region),
          platforms: Platforms(res.data.regions, region),
          regionMaps: Maps(res.data.regions, region),
          modes: Modes(res.data.regions, region),
          settings: Settings(res.data.regions, region),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    localStorage.getItem("battlefield2042.se_showSettings") &&
      setShow(
        JSON.parse(
          localStorage.getItem("battlefield2042.se_showSettings") || "{}"
        )
      );
    localStorage.getItem("battlefield2042.se_selectorSettings") &&
      setSelectorSettings(
        JSON.parse(
          localStorage.getItem("battlefield2042.se_selectorSettings") || "{}"
        )
      );
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "battlefield2042.se_showSettings",
      JSON.stringify(show)
    );

    localStorage.setItem(
      "battlefield2042.se_selectorSettings",
      JSON.stringify(selectorSettings)
    );
  }, [show, selectorSettings]);

  useEffect(() => {
    setLoading(true);
    const wait = setTimeout(() => {
      getPortalServers(selectorSettings.region, selectorSettings.platform);
      getBf2042Status(selectorSettings.region);
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(wait);
    };
  }, [selectorSettings]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(true);
      if (!selectorSettings.autoFetch) return;
      console.log("Fetching data... ");
      getPortalServers(selectorSettings.region, selectorSettings.platform);
      getBf2042Status(selectorSettings.region);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, [selectorSettings]);

  useEffect(() => {
    setLoading(true);
    const wait = setTimeout(() => {
      if (search.query.length < 2) return;
      axios
        .get(
          `https://api.gametools.network/bf2042/player/?name=${search.query}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        )
        .then((res) => {
          res.data.results.map(
            ({
              name,
              nucleusId,
              personaId,
              platformId,
            }: {
              name: string;
              nucleusId: number;
              personaId: number;
              platformId: number;
            }) => {
              return getUser(name, nucleusId, personaId, platformId);
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);

    return () => {
      clearTimeout(wait);
    };
  }, [search.query]);

  const getUser = async (
    name: string,
    nucleusId: number,
    personaId: number,
    platform: number
  ) => {
    if (!platform) return;
    await axios
      .get(
        `https://api.gametools.network/bf2042/feslid/?platformid=${platform}&personaid=${personaId}&nucleusid=${nucleusId}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setSearch((search) => ({
          ...search,
          data: search.data.concat({
            avatar: res.data.avatar,
            name: name,
            platformId: platform,
            platform: platformString(platform),
          }),
        }));
      });
  };

  return (
    <div>
      <PlatRegSelectorBar
        search={search}
        setSearch={setSearch}
        loading={loading}
        selectorSettings={selectorSettings}
        setSelectorSettings={setSelectorSettings}
        show={show}
        setShow={setShow}
      />
      <div className={isMobile ? "d-flex flex-column" : "d-flex flex-row"}>
        <MapStats show={show.mapStats} isMobile={isMobile} maps={maps} />
        <div>
          <SoldierAmount
            show={show.soldierAmount}
            isMobile={isMobile}
            soldiers={apiData.soldiers}
          />
          <ServerAmount
            show={show.serverAmount}
            isMobile={isMobile}
            servers={apiData.servers}
          />
          <PlatformsAmount
            show={show.platformsAmount}
            isMobile={isMobile}
            platforms={apiData.platforms}
          />
          <ModesAmount
            show={show.modesAmount}
            isMobile={isMobile}
            modes={apiData.modes}
          />
        </div>
        <div>
          <RegionMaps
            show={show.regionMaps}
            isMobile={isMobile}
            regionMaps={apiData.regionMaps}
          />
          <ServerSettings
            show={show.serverSettings}
            isMobile={isMobile}
            settings={apiData.settings}
          />
        </div>
      </div>
      <UserResult
        search={search}
        setSearch={setSearch}
        setLoading={setLoading}
      />
    </div>
  );
}

export default Dashboard;
