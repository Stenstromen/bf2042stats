import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

function PlatformsAmount({
  show,
  isMobile,
  platforms,
}: {
  show: boolean;
  isMobile: boolean;
  platforms: { platform: string; amount: number }[];
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
        <h3 className="text-warning">Active Region Platforms</h3>
        <Table variant="dark" size="sm">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {platforms.map((item: { platform: string; amount: number }) => {
              return (
                <tr key={item.platform}>
                  <td>{item.platform}</td>
                  <td>{item.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

PlatformsAmount.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  platforms: PropTypes.array.isRequired,
};

export default PlatformsAmount;
