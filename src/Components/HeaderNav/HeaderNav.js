import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { PowerHackUserContext } from "../../context/PowerHackUserContext";
import { ImPower } from "react-icons/im";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

function HeaderNav() {
  const { user, logout } = useContext(PowerHackUserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    return swal({
      text: "Logout Successful!",
      icon: "success",
      button: "OK!",
      className: "swal-style",
    });
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      // bg="dark"
      // variant="dark"
      className="nav-bg"
    >
      <Container>
        <Navbar.Brand className="logo-style text-white">
          <ImPower className="text-warning" />
          Power-Hack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {user?.email ? (
              <Nav.Link onClick={handleLogOut} className="fs-5 text-white">
                <FaSignOutAlt className="text-danger pe-1 fs-4" />
                Sign Out
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={() => navigate("/signin")}
                className="fs-5 text-white"
              >
                <FaSignInAlt className="text-success pe-1 fs-4" />
                Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;
