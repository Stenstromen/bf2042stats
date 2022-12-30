import React from "react";
import Table from "react-bootstrap/Table";

function RegionMaps({
  isMobile,
  regionMaps,
}: {
  isMobile: boolean;
  regionMaps: { map: string; amount: number }[];
}) {
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
        <h3 className="text-warning">Active Region Maps</h3>
        <Table variant="dark" size="sm">
          <thead>
            <tr>
              <th>Map</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {regionMaps.map(({ map, amount }) => {
              return (
                <tr key={map}>
                  <td>{map}</td>
                  <td>{amount}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default RegionMaps;
