import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

const CustomNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-navbar-color" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src="/assest/Logo.jpeg" alt="logo" height={32} width={35}></img>
          ElectronicStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to="/service">Features</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Tv</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Sports</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Phones</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Best Sellers
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">More</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/cart">Cart(40)</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/register">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
