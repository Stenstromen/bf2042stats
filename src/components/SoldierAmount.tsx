import React from "react";
import PropTypes from "prop-types";

interface Props {
  isMobile: boolean;
  soldiers: number;
}

function SoldierAmount({ isMobile, soldiers }: Props) {
  return (
    <div
      style={{
        width: isMobile ? "380px" : "390px",
        marginLeft: "5px",
        marginRight: "5px",
        marginTop: "5px",
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center border border-secondary rounded bg-dark">
        <h3 className="text-warning">Active Soldiers</h3>
        <h1 className="text-light bg-dark">{soldiers}</h1>
      </div>
    </div>
  );
}

SoldierAmount.propTypes = {
  soldiers: PropTypes.number.isRequired,
};

export default SoldierAmount;
