import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import swal from "sweetalert";
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
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refetch, setRefetch] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mapData, setmapData] = useState([]);
  const [display, setDisplay] = useState("");

  console.log(mapData, billingData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:9000/api/billing-list`
      );

      setAllData(response?.data?.result?.reverse());
    };
    fetchData();
  }, [currentPage, refetch]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:9000/api/billing/pagination?page=${currentPage}`
      );

      setTimeout(() => {
        setGenerating(false);
        setBillingData(response?.data?.result?.reverse());
        setmapData(response?.data?.result);
        setTotalPages(response.data.totalPages);
      }, 1000);
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

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this bill.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        axios
          .delete(`http://localhost:9000/api/delete-billing/${id}`)
          .then((res) => {
            if (res.status === 200) {
              setRefetch(!refetch);
              setBillingData(billingData.filter((data) => data._id !== id));

              swal({
                text: res.data.message,
                icon: "success",
                button: "OK!",
              });
            } else {
              swal({
                text: res.data.message,
                icon: "warning",
                button: "OK!",
              });
            }
          })
          .catch((e) => {
            swal({
              text: e.res.data.message,
              icon: "warning",
              button: "OK!",
            });
          })
          .finally(() => {});
      }
    });
  };

  // ---------->search functionality start<------------------------------------------------
  let handleSearch = (searchInput) => {
    if (searchInput.length > 0) {
      const searchResult = allData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.phone.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(searchResult, searchInput);
      setmapData(searchResult);
    } else {
      setmapData(billingData);
    }
  };
  // ---------->search functionality end<------------------------------------------------

  // ---------->calculating total paid amount<------------------------------------------
  let arr = [];
  allData?.forEach((data) => {
    console.log(data);
    arr.push(data.paidAmount);
  });

  function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }
  const totalPaidAmount = sumArray(arr);
  // ---------->calculating total paid amount end<------------------------------------------------

  // ---------->Type writer animation<------------------------------------------------
  const welcomeText = `Welcome to power hack...`;

  useEffect(() => {
    let i = 0;
    const type = () => {
      setDisplay(welcomeText.substring(0, i));
      i++;
      if (i <= welcomeText.length) {
        setTimeout(type, 200);
      }
    };
    type();

    return () => {
      clearTimeout(type);
    };
  }, []);

  return (
    <div className="container mb-5" style={{ marginTop: "100px" }}>
      {display.length === welcomeText.length ? null : <h2>{display}</h2>}

      <BillHeader
        setRefetch={setRefetch}
        refetch={refetch}
        setGenerating={setGenerating}
        generating={generating}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        totalPaidAmount={totalPaidAmount}
      />
      <Table responsive>
        <thead>
          <tr>
            <th> {generating ? "Generating Id.." : "Billing Id"}</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Paid amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mapData?.map((data) => (
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
                    onClick={() => handleDelete(data._id)}
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
