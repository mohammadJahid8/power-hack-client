import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { PowerHackUserContext } from "../../context/PowerHackUserContext";

function HeaderNav() {
  const { user, logout } = useContext(PowerHackUserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    return swal({
      text: "Sign-up Successful!",
      icon: "success",
      button: "OK!",
    });
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Power-Hack</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {user ? (
              <Nav.Link href="#deets" onClick={handleLogOut}>
                Sign Out
              </Nav.Link>
            ) : (
              <Nav.Link href="#deets" onClick={() => navigate("/signin")}>
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
