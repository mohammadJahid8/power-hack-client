import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { PowerHackUserContext } from "../../context/PowerHackUserContext";
import BillHeader from "../BillHeader/BillHeader";

import "./BillTable.css";
import EditBillModal from "./EditBillModal";

function BillTable() {
  const { user, setUser } = useContext(PowerHackUserContext);

  console.log(user);

  const [showEditBillModal, setShowEditBillModal] = useState(false);
  const handleCloseEditBillModal = () => setShowEditBillModal(false);
  const handleShowEditBillModal = () => setShowEditBillModal(true);
  return (
    <div className="container " style={{ marginTop: "100px" }}>
      <BillHeader />
      <Table responsive>
        <thead>
          <tr>
            <th>Billing Id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Paid amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>

            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <div className="action-container d-flex justify-content-center">
                <Button
                  className="btn btn-primary me-2 btn-margin"
                  size="sm"
                  variant="primary"
                  onClick={handleShowEditBillModal}
                >
                  Edit
                </Button>
                <Button className="btn btn-danger " size="sm" variant="danger">
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>

      <EditBillModal
        handleCloseEditBillModal={handleCloseEditBillModal}
        handleShowEditBillModal={handleShowEditBillModal}
        showEditBillModal={showEditBillModal}
      />
    </div>
  );
}

export default BillTable;
