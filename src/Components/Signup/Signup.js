import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { PowerHackUserContext } from "../../context/PowerHackUserContext";
import "./Signup.css";
import { ImPower } from "react-icons/im";
const Signup = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(PowerHackUserContext);
  const [EmailErrorMsg, setEmailErrorMsg] = useState("");

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;

    let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const result = regex.test(email);

    setEmailErrorMsg("");
    if (!result) {
      setEmailErrorMsg("Please enter a valid email address!");
    } else {
      await axios
        .post("https://power-hack-server1.onrender.com/api/registration", {
          email: email,
          name: name,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            e.target.reset();

            localStorage.setItem("userToken", res.data.token);
            setUser(res.data.result);
            swal({
              text: "Sign-up Successful!",
              icon: "success",
              button: "OK!",
              className: "swal-style",
            }).then((isConfirm) => {
              if (isConfirm) {
                navigate("/billings");
              }
            });
          } else {
            alert(res.data.message);
          }
        })
        .catch((e) => {
          alert(e.response?.data?.message);
        })
        .finally(() => {});
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-3">
                <ImPower className="text-warning" />
                Sign Up
              </h5>
              <form onSubmit={handleSubmitSignUp}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputName"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                  <label htmlFor="floatingInputName" style={{ color: "black" }}>
                    Name
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="floatingInput"
                    placeholder="name@example.com"
                    required
                  />
                  <label htmlFor="floatingInput" style={{ color: "black" }}>
                    Email address
                  </label>
                  <p className="text-danger text-start">{EmailErrorMsg}</p>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="floatingPassword" style={{ color: "black" }}>
                    Password
                  </label>
                </div>
                <div className="form-check mb-3 text-start">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="rememberPasswordCheck"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="rememberPasswordCheck"
                  >
                    Remember password
                  </label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
                <hr className="my-4" />

                <p
                  className="text-primary cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/signin")}
                >
                  Already have an account? Sign in instead.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
