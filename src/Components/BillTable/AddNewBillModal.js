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
  refetch,
  setRefetch,
  setGenerating,
  generating,
}) {
  const [EmailErrorMsg, setEmailErrorMsg] = useState("");
  const [PhoneErrorMsg, setPhoneErrorMsg] = useState("");
  // const [EmailErrorMsg, setEmailErrorMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const paidAmount = e.target.paidAmount.value;

    let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const result = regex.test(email);

    console.log(!result || phone.length !== 11);
    setPhoneErrorMsg("");
    setEmailErrorMsg("");
    if (!result || phone.length !== 11) {
      console.log("inside");
      if (!result) {
        console.log("inside email");
        setEmailErrorMsg("Please enter a valid email address!");
        // setPhoneErrorMsg("");
      }
      if (phone.length !== 11) {
        console.log("inside phone");
        setPhoneErrorMsg("Phone number must be 11 digits!");
        // setEmailErrorMsg("");
      }
    } else {
      await axios
        .post("http://localhost:9000/api/add-billing", {
          email: email,
          name: name,
          phone: phone,
          paidAmount: paidAmount,
        })
        .then((res) => {
          if (res.status === 200) {
            handleCloseNewBillModal();
            swal({
              text: res.data.message,
              icon: "success",
              button: "OK!",
              // className: "modal_class_success",
            }).then((isTrue) => {
              if (isTrue) {
                e.target.reset();
                setGenerating(true);
                setRefetch(!refetch);
              }
              setRefetch(!refetch);
            });
            // setRefetch(!refetch);
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
    }
  };

  // const validateEmail = (email) => {
  //   let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  //   const result = regex.test(email);
  //   console.log(result);
  //   if (!result) {
  //     console.log("df");
  //     setEmailErrorMsg("Please enter a valid email address");
  //   }
  // };

  console.log(EmailErrorMsg, PhoneErrorMsg);

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
                // onChange={(e) => validateEmail(e.target.value)}
              />
              <p className="text-danger">{EmailErrorMsg}</p>
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
              <p className="text-danger">{PhoneErrorMsg}</p>
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
