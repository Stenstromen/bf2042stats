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
  const [autoFetch, setAuthFetch] = useState<boolean>(true);

  const [showMapStats, setShowMapStats] = useState<boolean>(true);
  const [showSoldierAmount, setShowSoldierAmount] = useState<boolean>(true);
  const [showServerAmount, setShowServerAmount] = useState<boolean>(true);
  const [showPlatformsAmount, setShowPlatformsAmount] = useState<boolean>(true);
  const [showModesAmount, setShowModesAmount] = useState<boolean>(true);
  const [showRegionMaps, setShowRegionMaps ] = useState<boolean>(true);
  const [showServerSettings, setShowServerSettings] = useState<boolean>(true);

  const [region, setRegion] = useState<string>("ALL");
  const [platform, setPlatform] = useState<string>("all");
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

  const getPortalServers = () => {
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

  const getBf2042Status = () => {
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
    getPortalServers();
    getBf2042Status();
  }, [region, platform]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!autoFetch) return;
      console.log("Fetching data...");
      getPortalServers();
      getBf2042Status();
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, [autoFetch]);

  useEffect(() => {
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
              platform,
            }: {
              name: string;
              nucleusId: number;
              personaId: number;
              platform: number;
            }) => {
              return getUser(name, nucleusId, personaId, platform);
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);

    return () => clearTimeout(wait);
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
        showMapStats={showMapStats}
        setShowMapStats={setShowMapStats}
        showSoldierAmount={showSoldierAmount}
        setShowSoldierAmount={setShowSoldierAmount}
        showServerAmount={showServerAmount}
        setShowServerAmount={setShowServerAmount}
        showPlatformsAmount={showPlatformsAmount}
        setShowPlatformsAmount={setShowPlatformsAmount}
        showModesAmount={showModesAmount}
        setShowModesAmount={setShowModesAmount}
        showRegionMaps={showRegionMaps}
        setShowRegionMaps={setShowRegionMaps}
        showServerSettings={showServerSettings}
        setShowServerSettings={setShowServerSettings}
      />
      <div className={isMobile ? "d-flex flex-column" : "d-flex flex-row"}>
        <MapStats show={showMapStats} isMobile={isMobile} maps={maps} />
        <div>
          <SoldierAmount
            show={showSoldierAmount}
            isMobile={isMobile}
            soldiers={soldiers}
          />
          <ServerAmount
            show={showServerAmount}
            isMobile={isMobile}
            servers={servers}
          />
          <PlatformsAmount
            show={showPlatformsAmount}
            isMobile={isMobile}
            platforms={platforms}
          />
          <ModesAmount show={showModesAmount} isMobile={isMobile} modes={modes} />
        </div>
        <div>
          <RegionMaps show={showRegionMaps} isMobile={isMobile} regionMaps={regionMaps} />
          <ServerSettings show={showServerSettings} isMobile={isMobile} settings={settings} />
        </div>
      </div>
      <UserResult
        userData={userData}
        setUserData={setUserData}
        setUserSearch={setUserSearch}
      />
    </div>
  );
}

export default Dashboard;
