import axios from "axios";
import React, { useEffect, useState } from "react";
import PlatRegSelectorBar from "../components/PlatRegSelectorBar";
import MapStats from "../components/MapStats";
import SoldierAmount from "../components/SoldierAmount";
import ServerAmount from "../components/ServerAmount";
import PlatformsAmount from "../components/PlatformsAmount";

interface Servers {
  currentMap: string;
}

interface Maps {
  map: string;
  amount: number;
}

interface Platform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  find: any;
  ownerPlatform: string;
}

interface Platforms {
  platform: string;
  amount: number;
}

interface Props {
  isMobile: boolean;
}

function Dashboard({ isMobile }: Props) {
  const [region, setRegion] = useState<string>("ALL");
  const [platform, setPlatform] = useState<string>("all");
  const [maps, setMaps] = useState<Maps[]>([]);
  const [soldiers, setSoldiers] = useState<number>(0);
  const [servers, setServers] = useState<number>(0);
  const [platforms, setPlatforms] = useState<Platforms[]>([]);

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
        const unique = (arr: Servers[]) => {
          const arrCounts: string[] = [];
          arr.forEach((element: { currentMap: string }) => {
            return arrCounts.push(element.currentMap);
          });

          const count = arrCounts.reduce(
            (accumulator: { [x: string]: number }, value: string | number) => {
              return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
            },
            {}
          );

          return Object.entries(count)
            .map((item): Maps => {
              return {
                map: item[0],
                amount: item[1],
              };
            })
            .sort((a, b) => b.amount - a.amount);
        };
        setMaps(unique(res.data.servers));
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const players = (arr: any[]): number => {
          const result = arr.find(
            (item: { region: string }) => item.region === region
          );
          return result.amounts.soldierAmount;
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const servers = (arr: any): number => {
          const result = arr.find(
            (item: { region: string }) => item.region === region
          );
          return result.amounts.serverAmount;
        };

        const platforms = (arr: Platform): Platforms[] => {
          const result = arr.find(
            (item: { region: string }) => item.region === region
          );

          return [
            {
              platform: "PC",
              amount: result.ownerPlatform.pc,
            },
            {
              platform: "XBox One",
              amount: result.ownerPlatform.xboxone,
            },
            {
              platform: "PlayStation 4",
              amount: result.ownerPlatform.ps4,
            },
            {
              platform: "PlayStation 5",
              amount: result.ownerPlatform.ps5,
            },
            {
              platform: "XBox Series",
              amount: result.ownerPlatform.xboxseries,
            },
          ].sort((a, b) => b.amount - a.amount);
        };

        setSoldiers(players(res.data.regions));
        setServers(servers(res.data.regions));
        setPlatforms(platforms(res.data.regions));
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
      </div>
    </div>
  );
}

export default Dashboard;
