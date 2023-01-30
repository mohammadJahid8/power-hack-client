import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AddNewBillModal from "../BillTable/AddNewBillModal";

function BillHeader({
  setRefetch,
  refetch,
  setGenerating,
  generating,

  handleSearch,
  totalPaidAmount,
}) {
  const [showNewBillModal, setShowNewBillModal] = useState(false);

  const handleCloseNewBillModal = () => setShowNewBillModal(false);
  const handleShowNewBillModal = () => setShowNewBillModal(true);
  return (
    <>
      <div
        expand="lg"
        className="billheader-bg py-2"
        style={{ zIndex: "9999" }}
      >
        <Container>
          <div className="d-flex justify-content-center nav-items">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </Form>
            </Nav>
            <div
              className="d-flex text-center"
              style={{ alignItems: "center" }}
            >
              <p className="me-2 mb-0">Paid total: {totalPaidAmount || "0"}</p>
              <p className="mb-0">
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleShowNewBillModal}
                >
                  Add new bill
                </Button>
              </p>
            </div>
          </div>
        </Container>
      </div>

      <AddNewBillModal
        handleCloseNewBillModal={handleCloseNewBillModal}
        handleShowNewBillModal={handleShowNewBillModal}
        showNewBillModal={showNewBillModal}
        setRefetch={setRefetch}
        refetch={refetch}
        setGenerating={setGenerating}
        generating={generating}
      />
    </>
  );
}

export default BillHeader;
