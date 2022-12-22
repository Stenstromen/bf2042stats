import axios from "axios";
import React, { useEffect, useState } from "react";
import PlatRegSelectorBar from "../components/PlatRegSelectorBar";
import MapStats from "../components/MapStats";
import SoldierAmount from "../components/SoldierAmount";

interface Servers {
  currentMap: string;
}

interface Maps {
  map: string;
  amount: number;
}

interface Props {
  isMobile: boolean
}

function Dashboard({ isMobile }: Props) {
  const [servers, setServers] = useState<Servers[]>([]);
  const [region, setRegion] = useState<string>("ALL");
  const [platform, setPlatform] = useState<string>("all");
  const [maps, setMaps] = useState<Maps[]>([]);
  const [soldiers, setSoldiers] = useState<number>(0);

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
        setServers(res.data.servers.sort());
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
        const players = (arr: any[]) => {
          const result = arr.find(
            (item: { region: string }) => item.region === region
          );
          return result.amounts.soldierAmount;
        };
        setSoldiers(players(res.data.regions));
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
        <SoldierAmount isMobile={isMobile} soldiers={soldiers} />
      </div>
    </div>
  );
}

export default Dashboard;
