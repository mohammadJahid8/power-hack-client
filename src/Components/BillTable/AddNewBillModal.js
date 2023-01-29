import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";

function AddNewBillModal({
  handleCloseNewBillModal,
  handleShowNewBillModal,
  showNewBillModal,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const paidAmount = e.target.paidAmount.value;

    await axios
      .post("http://localhost:9000/api/add-billing", {
        email: email,
        name: name,
        phone: phone,
        paidAmount: paidAmount,
      })
      .then((res) => {
        if (res.status === 200) {
          e.target.reset();
          handleCloseNewBillModal();
          swal({
            text: res.data.message,
            icon: "success",
            button: "OK!",
            // className: "modal_class_success",
          });
        } else {
          swal({
            text: res.data.message,
            icon: "warning",
            button: "OK!",
            // className: "modal_class_success",
          });
        }
      })
      .catch((e) => {
        swal({
          text: e.res.data.message,
          icon: "warning",
          button: "OK!",
          // className: "modal_class_success",
        });
      })
      .finally(() => {});
  };
  return (
    <>
      <Modal show={showNewBillModal} onHide={handleCloseNewBillModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add new bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                autoFocus
                name="name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                autoFocus
                name="email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                autoFocus
                name="phone"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Payable Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter payable amount"
                autoFocus
                name="paidAmount"
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseNewBillModal}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddNewBillModal;
