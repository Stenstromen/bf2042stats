/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const Unique = (arr: { currentMap: string }[]) => {
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

export const Players = (arr: [], region: string): number => {
  return Object.entries(arr).find((item) => item[0] === region)![1]["amounts"][
    "soldierAmount"
  ];
};

export const Servers = (arr: [], region: string): number => {
  return Object.entries(arr).find((item) => item[0] === region)![1]["amounts"][
    "serverAmount"
  ];
};

export const Platforms = (
  arr: [],
  region: string
): { platform: string; amount: number }[] => {
  return [
    {
      platform: "PC",
      amount: Object.entries(arr).find((item) => item[0] === region)![1][
        "ownerPlatform"
      ]["pc"],
    },
    {
      platform: "XBox One",
      amount: Object.entries(arr).find((item) => item[0] === region)![1][
        "ownerPlatform"
      ]["xboxone"],
    },
    {
      platform: "PlayStation 4",
      amount: Object.entries(arr).find((item) => item[0] === region)![1][
        "ownerPlatform"
      ]["ps4"],
    },
    {
      platform: "PlayStation 5",
      amount: Object.entries(arr).find((item) => item[0] === region)![1][
        "ownerPlatform"
      ]["ps5"],
    },
    {
      platform: "XBox Series",
      amount: Object.entries(arr).find((item) => item[0] === region)![1][
        "ownerPlatform"
      ]["xboxseries"],
    },
  ].sort((a, b) => b.amount - a.amount);
};

export const Maps = (
  arr: [],
  region: string
): { map: string; amount: number }[] => {
  const result: { maps: number } = Object.entries(arr).find(
    (item) => item[0] === region
  )![1]["maps"];

  return Object.entries(result)
    .map((item): { map: string; amount: number } => {
      return {
        map: item[0],
        amount: item[1],
      };
    })
    .sort((a, b) => b.amount - a.amount);
};

export const Modes = (
  arr: [],
  region: string
): { mode: string; amount: number }[] => {
  const result: { modes: number } = Object.entries(arr).find(
    (item) => item[0] === region
  )![1]["modes"];

  return Object.entries(result)
    .map((item): { mode: string; amount: number } => {
      return {
        mode: item[0],
        amount: item[1],
      };
    })
    .sort((a, b) => b.amount - a.amount);
};

export const Settings = (
  arr: [],
  region: string
): { setting: string; amount: number }[] => {
  const result: { settings: number } = Object.entries(arr).find(
    (item) => item[0] === region
  )![1]["settings"];

  return Object.entries(result)
    .map((item): { setting: string; amount: number } => {
      return {
        setting:
          item[0].charAt(0).toUpperCase() +
          item[0].slice(1).split("_").join(" "),
        amount: item[1],
      };
    })
    .sort((a, b) => b.amount - a.amount);
};

export const platformString = (id: number): string => {
  switch (id) {
    case 1:
      return "PC";
    case 4:
      return "PlayStation 5";
    default:
      return "Unknown";
  }
};
