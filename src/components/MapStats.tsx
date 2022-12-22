import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

interface Maps {
  map: string;
  amount: number;
}

interface Props {
  isMobile: boolean;
  maps: Maps[];
}

function MapStats({ isMobile, maps }: Props) {
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
        <h3 className="text-warning">Active Portal Maps</h3>
        <Table variant="dark" size="sm">
          <thead>
            <tr>
              <th>Map</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {maps.map((item: { map: string; amount: number }) => {
              return (
                <tr key={item.map}>
                  <td>{item.map}</td>
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

MapStats.propTypes = {
  maps: PropTypes.array.isRequired,
};

export default MapStats;
