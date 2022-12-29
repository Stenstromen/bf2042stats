/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import React, { useEffect, useState } from "react";
import PlatRegSelectorBar from "../components/PlatRegSelectorBar";
import MapStats from "../components/MapStats";
import SoldierAmount from "../components/SoldierAmount";
import ServerAmount from "../components/ServerAmount";
import PlatformsAmount from "../components/PlatformsAmount";

function Dashboard({ isMobile }: { isMobile: boolean }) {
  const [region, setRegion] = useState<string>("ALL");
  const [platform, setPlatform] = useState<string>("all");
  const [maps, setMaps] = useState<{ map: string; amount: number }[]>([]);
  const [soldiers, setSoldiers] = useState<number>(0);
  const [servers, setServers] = useState<number>(0);
  const [platforms, setPlatforms] = useState<
    { platform: string; amount: number }[]
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
        const unique = (arr: { currentMap: string }[]) => {
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
            .map((item): { map: string; amount: number } => {
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
        const players = (arr: []): number => {
          const result: { amounts: { soldierAmount: number } } = arr.find(
            (item: { region: string }) => item.region === region
          )!;
          return result.amounts.soldierAmount;
        };

        const servers = (arr: []): number => {
          const result: { amounts: { serverAmount: number } } = arr.find(
            (item: { region: string }) => item.region === region
          )!;
          return result.amounts.serverAmount;
        };

        const platforms = (arr: []): { platform: string; amount: number }[] => {
          const result: {
            ownerPlatform: {
              pc: number;
              xboxone: number;
              ps4: number;
              ps5: number;
              xboxseries: number;
            };
          } = arr.find((item: { region: string }) => item.region === region)!;
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
