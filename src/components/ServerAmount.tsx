import React from "react";
import PropTypes from "prop-types";

function ServerAmount({
  show,
  isMobile,
  servers,
}: {
  show: boolean
  isMobile: boolean;
  servers: number;
}) {
  return (
    <div
      style={{
        display: show ? "block":"none",
        width: isMobile ? "380px" : "390px",
        marginLeft: "5px",
        marginRight: "5px",
        marginTop: "5px",
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center border border-secondary rounded bg-dark">
        <h3 className="text-warning">Active Region Servers</h3>
        <h1 className="text-light bg-dark">{servers}</h1>
      </div>
    </div>
  );
}

ServerAmount.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  servers: PropTypes.number.isRequired,
};

export default ServerAmount;
