import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

function ModesAmount({
  show,
  isMobile,
  modes,
}: {
  show:boolean;
  isMobile: boolean;
  modes: { mode: string; amount: number }[];
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
        <h3 className="text-warning">Active Region Modes</h3>
        <Table variant="dark" size="sm">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {modes.map((item: { mode: string; amount: number }) => {
              return (
                <tr key={item.mode}>
                  <td>{item.mode}</td>
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

ModesAmount.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  modes: PropTypes.array.isRequired,
};

export default ModesAmount;
