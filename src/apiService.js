/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://api.gametools.network/bf2042/",
    headers: {
      accept: "application/json",
    },
});

export const getPortalServers = async (region, platform) => {
    const response = await axiosInstance.get(`servers/?region=${region}&limit=250&platform=${platform}`);
    return response.data;
}

export const getBf2042Status = async (region) => {
    const response = await axiosInstance.get("status/");
    return response.data;
}
