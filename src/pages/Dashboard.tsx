import axios from "axios";
import React, { useEffect, useState } from "react";
import PlatRegSelectorBar from "../components/PlatRegSelectorBar";
import MapStats from "../components/MapStats";

interface Servers {
  currentMap: string;
}

interface Maps {
  map: string;
  amount: number;
}

function Dashboard() {
  const [servers, setServers] = useState<Servers[]>([]);
  const [region, setRegion] = useState<string>("all");
  const [platform, setPlatform] = useState<string>("all");
  const [maps, setMaps] = useState<Maps[]>([]);

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

  useEffect(() => {
    getPortalServers();
  }, [region, platform]);

  return (
    <div>
      <PlatRegSelectorBar setRegion={setRegion} setPlatform={setPlatform} />
      <div className="d-flex flex-row">
        <MapStats maps={maps} />
      </div>
    </div>
  );
}

export default Dashboard;
