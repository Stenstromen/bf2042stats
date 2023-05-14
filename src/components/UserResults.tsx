import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { ISearch } from "../Types";

function UserResult({
  search,
  setSearch,
  setLoading,
}: {
  search: ISearch;
  setSearch: (search: ISearch) => void;
  setLoading: (loading: boolean) => void;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClose = () => {
    setShowModal(false);
    setLoading(false);
    setSearch({
      query: "",
      data: [],
    });
  };

  useEffect(() => {
    return search.data.length !== 0 ? setShowModal(true) : setShowModal(false);
  }, [search.data]);

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
              {search.data.map(({ avatar, name, platform }) => {
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
