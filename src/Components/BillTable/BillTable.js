import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import swal from "sweetalert";
import { PowerHackUserContext } from "../../context/PowerHackUserContext";
import BillHeader from "../BillHeader/BillHeader";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import "./BillTable.css";
import EditBillModal from "./EditBillModal";
import HeaderNav from "../HeaderNav/HeaderNav";
import Footer from "../Footer/Footer";
import { ImPower } from "react-icons/im";

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
  const [loading, setloading] = useState(false);
  const [mapData, setmapData] = useState([]);
  const [display, setDisplay] = useState("");
  const [hideButton, sethideButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      const response = await axios.get(
        `https://power-hack-server1.onrender.com/api/billing-list`
      );

      setAllData(response?.data?.result);
      setloading(false);
    };
    fetchData();
  }, [currentPage, refetch]);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      const response = await axios.get(
        `https://power-hack-server1.onrender.com/api/billing/pagination?page=${currentPage}`
      );

      // setTimeout(() => {
      setGenerating(false);
      setBillingData(response?.data?.result);
      setmapData(response?.data?.result);
      setTotalPages(response.data.totalPages);
      setloading(false);
      // }, 100);
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
      className: "swal-style",
      buttons: true,
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        axios
          .delete(
            `https://power-hack-server1.onrender.com/api/delete-billing/${id}`
          )
          .then((res) => {
            if (res.status === 200) {
              setRefetch(!refetch);
              setBillingData(billingData.filter((data) => data._id !== id));

              swal({
                text: res.data.message,
                icon: "success",
                button: "OK!",
                className: "swal-style",
              });
            } else {
              swal({
                text: res.data.message,
                icon: "warning",
                button: "OK!",
                className: "swal-style",
              });
            }
          })
          .catch((e) => {
            swal({
              text: e.res.data.message,
              icon: "warning",
              button: "OK!",
              className: "swal-style",
            });
          })
          .finally(() => {});
      }
    });
  };

  // ---------->search functionality start<------------------------------------------------
  let handleSearch = (searchInput) => {
    if (searchInput.length > 0) {
      sethideButton(true);
      const searchResult = allData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.phone.toLowerCase().includes(searchInput.toLowerCase())
      );

      setmapData(searchResult);
    } else {
      sethideButton(false);
      setmapData(billingData);
    }
  };
  // ---------->search functionality end<------------------------------------------------

  // ---------->calculating total paid amount<------------------------------------------
  let arr = [];
  allData?.forEach((data) => {
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

  if (loading) {
    return (
      <div className="" style={{ paddingTop: "300px" }}>
        <p className="custom-loader">
          <ImPower className="text-warning fs-2" />
        </p>
      </div>
    );
  }

  return (
    <>
      <HeaderNav />
      <div className="container mb-5" style={{ marginTop: "100px" }}>
        {display.length === welcomeText.length ? null : <h2>{display}</h2>}

        <BillHeader
          setRefetch={setRefetch}
          refetch={refetch}
          setGenerating={setGenerating}
          generating={generating}
          handleSearch={handleSearch}
          totalPaidAmount={totalPaidAmount}
        />
        <Table responsive className="text-light">
          <thead>
            <tr>
              <th> SL No.</th>
              <th> {generating ? "Generating Id.." : "Billing Id"}</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Paid amount</th>
              <th>Action</th>
            </tr>
          </thead>
          {mapData?.length > 0 && (
            <tbody>
              {mapData?.map((data, index) => (
                <tr>
                  <td>{index + 1}</td>
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
          )}
        </Table>

        {mapData?.length == 0 && (
          <p className="" style={{ paddingBottom: "90px" }}>
            No data to show
          </p>
        )}

        {!hideButton && mapData?.length > 0 && (
          <div>
            <button
              className="me-2 btn btn-primary btn-sm"
              onClick={handlePrevClick}
              disabled={currentPage === 1}
            >
              <BsArrowLeft />
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="ms-2 btn btn-primary btn-sm "
              onClick={handleNextClick}
              disabled={currentPage === totalPages}
            >
              Next
              <BsArrowRight className="" />
            </button>
          </div>
        )}

        <EditBillModal
          handleCloseEditBillModal={handleCloseEditBillModal}
          handleShowEditBillModal={handleShowEditBillModal}
          showEditBillModal={showEditBillModal}
          editData={editData}
          setRefetch={setRefetch}
          refetch={refetch}
        />
      </div>
      <Footer />
    </>
  );
}

export default BillTable;
