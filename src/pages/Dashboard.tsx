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
  const [autoFetch, setAuthFetch] = useState<boolean>(
    localStorage.getItem("bf2042_autoFetch") === "false" ? false : true
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [show, setShow] = useState<{
    mapStats: boolean;
    soldierAmount: boolean;
    serverAmount: boolean;
    platformsAmount: boolean;
    modesAmount: boolean;
    regionMaps: boolean;
    serverSettings: boolean;
  }>({
    mapStats:
      localStorage.getItem("bf2042_showMapStats") === "false" ? false : true,
    soldierAmount:
      localStorage.getItem("bf2042_showSoldierAmount") === "false"
        ? false
        : true,
    serverAmount:
      localStorage.getItem("bf2042_showServerAmount") === "false"
        ? false
        : true,
    platformsAmount:
      localStorage.getItem("bf2042_showPlatformsAmount") === "false"
        ? false
        : true,
    modesAmount:
      localStorage.getItem("bf2042_showModesAmount") === "false" ? false : true,
    regionMaps:
      localStorage.getItem("bf2042_showRegionMaps") === "false" ? false : true,
    serverSettings:
      localStorage.getItem("bf2042_showServerSettings") === "false"
        ? false
        : true,
  });
  //
  const [region, setRegion] = useState<string>(
    localStorage.getItem("bf2042_region") || "ALL"
  );
  const [platform, setPlatform] = useState<string>(
    localStorage.getItem("bf2042_platform") || "all"
  );

  const [maps, setMaps] = useState<{ map: string; amount: number }[]>([]);
  const [soldiers, setSoldiers] = useState<number>(0);
  const [servers, setServers] = useState<number>(0);
  const [platforms, setPlatforms] = useState<
    { platform: string; amount: number }[]
  >([]);
  const [regionMaps, setRegionMaps] = useState<
    { map: string; amount: number }[]
  >([]);
  const [modes, setModes] = useState<{ mode: string; amount: number }[]>([]);
  const [settings, setSettings] = useState<
    { setting: string; amount: number }[]
  >([]);
  const [userSearch, setUserSearch] = useState<string>("");
  const [userData, setUserData] = useState<
    { avatar: string; name: string; platformId: number; platform: string }[]
  >([]);

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
        setSoldiers(Players(res.data.regions, region));
        setServers(Servers(res.data.regions, region));
        setPlatforms(Platforms(res.data.regions, region));
        setRegionMaps(Maps(res.data.regions, region));
        setModes(Modes(res.data.regions, region));
        setSettings(Settings(res.data.regions, region));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    autoFetch
      ? localStorage.setItem("bf2042_autoFetch", "true")
      : localStorage.setItem("bf2042_autoFetch", "false");
    show.mapStats
      ? localStorage.setItem("bf2042_showMapStats", "true")
      : localStorage.setItem("bf2042_showMapStats", "false");
    show.soldierAmount
      ? localStorage.setItem("bf2042_showSoldierAmount", "true")
      : localStorage.setItem("bf2042_showSoldierAmount", "false");
    show.serverAmount
      ? localStorage.setItem("bf2042_showServerAmount", "true")
      : localStorage.setItem("bf2042_showServerAmount", "false");
    show.platformsAmount
      ? localStorage.setItem("bf2042_showPlatformsAmount", "true")
      : localStorage.setItem("bf2042_showPlatformsAmount", "false");
    show.modesAmount
      ? localStorage.setItem("bf2042_showModesAmount", "true")
      : localStorage.setItem("bf2042_showModesAmount", "false");
    show.regionMaps
      ? localStorage.setItem("bf2042_showRegionMaps", "true")
      : localStorage.setItem("bf2042_showRegionMaps", "false");
    show.serverSettings
      ? localStorage.setItem("bf2042_showServerSettings", "true")
      : localStorage.setItem("bf2042_showServerSettings", "false");
    localStorage.setItem("bf2042_region", region);
    localStorage.setItem("bf2042_platform", platform);
  }, [autoFetch, show, region, platform]);

  useEffect(() => {
    setLoading(true);
    const wait = setTimeout(() => {
      getPortalServers(region, platform);
      getBf2042Status(region);
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(wait);
    };
  }, [region, platform]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(true);
      if (!autoFetch) return;
      console.log("Fetching data... ");
      getPortalServers(region, platform);
      getBf2042Status(region);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, [autoFetch, region, platform]);

  useEffect(() => {
    setLoading(true);
    const wait = setTimeout(() => {
      if (userSearch.length < 2) return;
      axios
        .get(
          `https://api.gametools.network/bf2042/player/?name=${userSearch}`,
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
  }, [userSearch]);

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
        setUserData((userData) => [
          ...userData,
          {
            avatar: res.data.avatar,
            name: name,
            platformId: platform,
            platform: platformString(platform),
          },
        ]);
      });
  };

  return (
    <div>
      <PlatRegSelectorBar
        setRegion={setRegion}
        setPlatform={setPlatform}
        userSearch={userSearch}
        setUserSearch={setUserSearch}
        autoFetch={autoFetch}
        setAutoFetch={setAuthFetch}
        loading={loading}
        show={show}
        setShow={setShow}
      />
      <div className={isMobile ? "d-flex flex-column" : "d-flex flex-row"}>
        <MapStats show={show.mapStats} isMobile={isMobile} maps={maps} />
        <div>
          <SoldierAmount
            show={show.soldierAmount}
            isMobile={isMobile}
            soldiers={soldiers}
          />
          <ServerAmount
            show={show.serverAmount}
            isMobile={isMobile}
            servers={servers}
          />
          <PlatformsAmount
            show={show.platformsAmount}
            isMobile={isMobile}
            platforms={platforms}
          />
          <ModesAmount
            show={show.modesAmount}
            isMobile={isMobile}
            modes={modes}
          />
        </div>
        <div>
          <RegionMaps
            show={show.regionMaps}
            isMobile={isMobile}
            regionMaps={regionMaps}
          />
          <ServerSettings
            show={show.serverSettings}
            isMobile={isMobile}
            settings={settings}
          />
        </div>
      </div>
      <UserResult
        userData={userData}
        setUserData={setUserData}
        setUserSearch={setUserSearch}
        setLoading={setLoading}
      />
    </div>
  );
}

export default Dashboard;
