import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";

function EditBillModal({
  handleCloseEditBillModal,
  handleShowEditBillModal,
  showEditBillModal,
  editData,
  refetch,
  setRefetch,
}) {
  const [EmailErrorMsg, setEmailErrorMsg] = useState("");
  const [PhoneErrorMsg, setPhoneErrorMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const paidAmount = e.target.paidAmount.value;

    let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const result = regex.test(email);

    setPhoneErrorMsg("");
    setEmailErrorMsg("");
    if (!result || phone.length !== 11) {
      if (!result) {
        setEmailErrorMsg("Please enter a valid email address!");
      }
      if (phone.length !== 11) {
        setPhoneErrorMsg("Phone number must be 11 digits!");
      }
    } else {
      await axios
        .put(
          `https://power-hack-server1.onrender.com/api/update-billing/${editData?._id}`,
          {
            email: email,
            name: name,
            phone: phone,
            paidAmount: paidAmount,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            e.target.reset();
            setRefetch(!refetch);
            handleCloseEditBillModal();
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
  };
  return (
    <>
      <Modal show={showEditBillModal} onHide={handleCloseEditBillModal}>
        <div className="modal-bg">
          <Modal.Header closeButton>
            <Modal.Title>Update bill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  autoFocus
                  name="name"
                  required
                  defaultValue={editData.name}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  autoFocus
                  name="email"
                  required
                  defaultValue={editData.email}
                />

                <p className="text-danger">{EmailErrorMsg}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter phone number"
                  autoFocus
                  name="phone"
                  required
                  defaultValue={editData.phone}
                />
                <p className="text-danger">{PhoneErrorMsg}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Payable Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter payable amount"
                  autoFocus
                  name="paidAmount"
                  required
                  defaultValue={editData.paidAmount}
                />
              </Form.Group>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditBillModal}>
                  Close
                </Button>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default EditBillModal;
