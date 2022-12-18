import React from "react";
import PropTypes from "prop-types";

interface ServerStats {
    servers: string[];
    /* region: string;
    setRegion: (region: string) => void;
    platform: string
    setPlatform: (platform: string) => void;
    currentMap: string; */
}

function ServerStats({servers}: ServerStats) {
return(
    <>
    {servers.map((item: any) => {
        return <p key={item.ownerId}>{item.currentMap}</p>
    })}
    </>
)
}

ServerStats.propTypes = {
    servers: PropTypes.array.isRequired,
    /* region: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired */
}

export default ServerStats