import axios from "axios";
import React, { useEffect, useState } from "react";
import ServerStats from "../components/ServerStats";

interface Servers {
  servers: string[];
  setServers: (servers: string) => void;
  currentMap: string;
}

function Dashboard() {
  const [servers, setServers] = useState<string[]>([]);
  const [region, setRegion] = useState<string>("all");
  const [platform, setPlatform] = useState<string>("pc");

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
        console.log(res.data.servers);
        setServers(res.data.servers.sort());
        // https://www.tutorialspoint.com/counting-unique-elements-in-an-array-in-javascript
        const countUnique = (arr: any) => {
          const counts: any = {};
          for (let i = 0; i < arr.length; i++) {
            counts[arr[i].currentMap] = 1 + (counts[arr[i].currentMap] || 0);
          }
          return counts;
        };
        console.log(countUnique(res.data.servers));
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
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <ServerStats servers={servers} />
    </div>
  );
}

export default Dashboard;
