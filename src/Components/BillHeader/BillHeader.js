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
  setSearchValue,
  handleSearch,
  totalPaidAmount,
}) {
  const [showNewBillModal, setShowNewBillModal] = useState(false);

  const handleCloseNewBillModal = () => setShowNewBillModal(false);
  const handleShowNewBillModal = () => setShowNewBillModal(true);
  return (
    <>
      <Navbar expand="lg" className="billheader-bg">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
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
                    setSearchValue(e.target.value);
                    handleSearch(e.target.value);
                  }}
                />
              </Form>
            </Nav>
            <Nav.Link href="#action1" className="me-2">
              Paid total: {totalPaidAmount || "0"}
            </Nav.Link>
            <Nav.Link href="#action1">
              <Button
                variant="success"
                size="sm"
                onClick={handleShowNewBillModal}
              >
                Add new bill
              </Button>
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
