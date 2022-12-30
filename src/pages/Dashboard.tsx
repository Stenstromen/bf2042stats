/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Unique, Players, Servers, Platforms, Maps} from "../Filters"
import PlatRegSelectorBar from "../components/PlatRegSelectorBar";
import MapStats from "../components/MapStats";
import SoldierAmount from "../components/SoldierAmount";
import ServerAmount from "../components/ServerAmount";
import PlatformsAmount from "../components/PlatformsAmount";
import RegionMaps from "../components/RegionMaps";

function Dashboard({ isMobile }: { isMobile: boolean }) {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPortalServers();
    getBf2042Status();
  }, [region, platform]);

  return (
    <div>
      <PlatRegSelectorBar setRegion={setRegion} setPlatform={setPlatform} />
      <div className={isMobile ? "d-flex flex-column" : "d-flex flex-row"}>
        <MapStats isMobile={isMobile} maps={maps} />
        <div>
          <SoldierAmount isMobile={isMobile} soldiers={soldiers} />
          <ServerAmount isMobile={isMobile} servers={servers} />
          <PlatformsAmount isMobile={isMobile} platforms={platforms} />
        </div>
        <RegionMaps isMobile={isMobile} regionMaps={regionMaps} />
      </div>
    </div>
  );
}

export default Dashboard;
