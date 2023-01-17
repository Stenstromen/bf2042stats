import React from "react";
import PropTypes from "prop-types";

function SoldierAmount({
  show,
  isMobile,
  soldiers,
}: {
  show: boolean;
  isMobile: boolean;
  soldiers: number;
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
        <h3 className="text-warning">Active Region Soldiers</h3>
        <h1 className="text-light bg-dark">{soldiers}</h1>
      </div>
    </div>
  );
}

SoldierAmount.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  soldiers: PropTypes.number.isRequired,
};

export default SoldierAmount;
