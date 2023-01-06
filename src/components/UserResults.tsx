import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

function UserResult({
  userData,
  setUserData,
  setUserSearch,
}: {
  userData: { avatar: string; name: string; platform: string }[];
  setUserData: (userData: []) => void;
  setUserSearch: (usersearch: string) => void;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClose = () => {
    setUserSearch("");
    setUserData([]);
    setShowModal(false);
  };

  useEffect(() => {
    return userData.length !== 0 ? setShowModal(true) : setShowModal(false);
  }, [userData]);

  return (
    <div>
      <Modal show={showModal} backdrop={false} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Reults</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped hover size="sm">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Platform</th>
              </tr>
            </thead>
            <tbody>
              {userData.map(({ avatar, name, platform }) => {
                return (
                  <tr key={name}>
                    <td style={{ width: "40%" }}>
                      <img style={{ width: "50%" }} src={avatar} />
                    </td>
                    <td>
                      <p>{name}</p>
                    </td>
                    <td>
                      <p>{platform}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserResult;
