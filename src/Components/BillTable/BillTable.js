import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { PowerHackUserContext } from "../../context/PowerHackUserContext";
import BillHeader from "../BillHeader/BillHeader";

import "./BillTable.css";
import EditBillModal from "./EditBillModal";

function BillTable() {
  const { user } = useContext(PowerHackUserContext);
  const [showEditBillModal, setShowEditBillModal] = useState(false);
  const [editData, seteditData] = useState(false);
  const handleCloseEditBillModal = () => setShowEditBillModal(false);
  const handleShowEditBillModal = () => setShowEditBillModal(true);
  const [billingData, setBillingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:9000/api/billing/pagination?page=${currentPage}`
      );
      console.log(response.data);

      setBillingData(response.data.result);
      setTotalPages(response.data.totalPages);
    };
    fetchData();
  }, [currentPage, refetch]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
          {billingData?.map((data) => (
            <tr>
              <td>{data.BillingId || ""}</td>

              <td>{data.name || ""}</td>

              <td>{data.email || ""}</td>
              <td>{data.phone || ""}</td>
              <td>{data.paidAmount || ""}</td>

              <td>
                <div className="action-container d-flex justify-content-center">
                  <Button
                    className="btn btn-primary me-2 btn-margin"
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      handleShowEditBillModal();
                      seteditData(data);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn btn-danger "
                    size="sm"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        <button onClick={handlePrevClick} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <EditBillModal
        handleCloseEditBillModal={handleCloseEditBillModal}
        handleShowEditBillModal={handleShowEditBillModal}
        showEditBillModal={showEditBillModal}
        editData={editData}
        setRefetch={setRefetch}
        refetch={refetch}
      />
    </div>
  );
}

export default BillTable;
