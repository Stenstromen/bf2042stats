import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

function ServerSettings({
  show,
  isMobile,
  settings,
}: {
  show: boolean;
  isMobile: boolean;
  settings: { setting: string; amount: number }[];
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
        <h3 className="text-warning">Active Region Settings</h3>
        <Table variant="dark" size="sm">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((item: { setting: string; amount: number }) => {
              return (
                <tr key={item.setting}>
                  <td>{item.setting}</td>
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

ServerSettings.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  settings: PropTypes.array.isRequired,
};

export default ServerSettings;
