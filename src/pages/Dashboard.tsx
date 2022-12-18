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
          const arrCounts: any = [];
          const counts: any = {};
          for (let i = 0; i < arr.length; i++) {
            //const counts: any = {};
            counts[arr[i].currentMap] = 1 + (counts[arr[i].currentMap] || 0); 
            arrCounts.push(counts);
          }
          //arrCounts.push(counts);
          return arrCounts;
        };
        const unique = (arr: any) => {
          const arrCounts: any = [];
          arr.forEach((element: { currentMap: any; }) => {
            arrCounts.push(element.currentMap)
          });

          const count = arrCounts.reduce((accumulator: { [x: string]: any; }, value: string | number) => {
            return {...accumulator, [value]: (accumulator[value] || 0) + 1};
          }, {});

          return count;
        }

        console.log(unique(res.data.servers));
        /* const countUniques = (orders = []) => {
          const tableObj:any = {}, //foodObj = {};
          orders.forEach: any((el: { table_id: string | number; }) => {
             tableObj[el.table_id] = null;
             //foodObj[el.food_id] = null;
          });
          const tableUniqueIDs = Object.keys(tableObj).length;
          //const foodUniqueIDs = Object.keys(foodObj).length;
          return {
             tableUniqueIDs//, foodUniqueIDs
          };
       }; */
       //console.log(countUniques(res.data.servers));
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
