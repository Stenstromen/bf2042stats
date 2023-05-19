/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { getPortalServers, getBf2042Status, getUser } from '../apiService';
import { IMap, ISelectorSettings, IShow, ISearch, IApiData } from "../Types";
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
import { get } from "http";

function Dashboard({ isMobile }: { isMobile: boolean }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [maps, setMaps] = useState<IMap[]>([]);
  const [selectorSettings, setSelectorSettings] = useState<ISelectorSettings>({
    autoFetch: true,
    region: "ALL",
    displayRegion: "🌍 ALL",
    platform: "all",
    displayPlatform: "👾 ALL",
  });
  const [show, setShow] = useState<IShow>({
    mapStats: true,
    soldierAmount: true,
    serverAmount: true,
    platformsAmount: true,
    modesAmount: true,
    regionMaps: true,
    serverSettings: true,
  });
  const [search, setSearch] = useState<ISearch>({
    query: "",
    data: [],
  });
  const [apiData, setApiData] = useState<IApiData>({
    maps: [],
    soldiers: 0,
    servers: 0,
    platforms: [],
    regionMaps: [],
    modes: [],
    settings: [],
  });

  const axiosInstance = axios.create({
    baseURL: "https://api.gametools.network/bf2042/",
    headers: {
      accept: "application/json",
    },
  });

/*   const getPortalServers = async (region: string, platform: string) => {
    try {
      const res = await axiosInstance.get(
        `servers/?region=${region}&limit=250&platform=${platform}`
      );
      setMaps(Unique(res.data.servers));
    } catch (err) {
      console.log(err);
    }
  };

  const getBf2042Status = async (region: string) => {
    try {
      const res = await axiosInstance.get("status/");
      setApiData({
        maps: Maps(res.data.regions, region),
        soldiers: Players(res.data.regions, region),
        servers: Servers(res.data.regions, region),
        platforms: Platforms(res.data.regions, region),
        regionMaps: Maps(res.data.regions, region),
        modes: Modes(res.data.regions, region),
        settings: Settings(res.data.regions, region),
      });
    } catch (err) {
      console.log(err);
    }
  }; */

  const getServerData = useCallback(async () => {
    //setLoading(true);
    try {
        const serverData = await getPortalServers(selectorSettings.region, selectorSettings.platform);
        const statusData = await getBf2042Status(selectorSettings.region);
        setMaps(Unique(serverData.servers));
        setApiData({
          maps: Maps(statusData.regions, selectorSettings.region),
          soldiers: Players(statusData.regions, selectorSettings.region),
          servers: Servers(statusData.regions, selectorSettings.region),
          platforms: Platforms(statusData.regions, selectorSettings.region),
          regionMaps: Maps(statusData.regions, selectorSettings.region),
          modes: Modes(statusData.regions, selectorSettings.region),
          settings: Settings(statusData.regions, selectorSettings.region),
        });
    } catch (error) {
        console.error(error);
        // handle the error
    }
    //setLoading(false);
}, [selectorSettings]);


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

  const getData = useCallback(() => {
    setLoading(true);
  /*   getPortalServers(selectorSettings.region, selectorSettings.platform);
    getBf2042Status(selectorSettings.region); */
    getServerData();
    setLoading(false);
  }, [selectorSettings]);

  useEffect(() => {
    const wait = setTimeout(getData, 1000);
    return () => {
      clearTimeout(wait);
    };
  }, [getData]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!selectorSettings.autoFetch) return;
      console.log("Fetching data... ");
      getData();
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, [selectorSettings, getData]);

  const searchUser = useCallback(() => {
    if (search.query.length < 2) return;
    setLoading(true);
    axiosInstance
      .get(`player/?name=${search.query}`)
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
  }, [search.query]);

  useEffect(() => {
    const wait = setTimeout(searchUser, 500);
    return () => {
      clearTimeout(wait);
    };
  }, [searchUser]);

  const getUser = async (
    name: string,
    nucleusId: number,
    personaId: number,
    platform: number
  ) => {
    if (!platform) return;
    await axiosInstance
      .get(
        `feslid/?platformid=${platform}&personaid=${personaId}&nucleusid=${nucleusId}`
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
