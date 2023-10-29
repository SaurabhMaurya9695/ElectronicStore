import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
import CartContext from "../../context/cart.context";
import UserContext from "../../context/user.context";
import { getAllCategory } from "../../service/category.service";

const CustomNavbar = () => {
  const userContext = useContext(UserContext);
  const {cart } = useContext(CartContext);
  const [totalCategories, setTotalCategories] = useState(null);

  const getAllCategoryLocal = (pageNumber, pageSize) => {
    return getAllCategory(pageNumber, pageSize)
      .then((resp) => {
        // console.log(resp);
        setTotalCategories({ ...resp });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllCategoryLocal(0, 100000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-navbar-color">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="text-cyan nav-link">
          <img src="/assest/Logo.jpeg" alt="logo" height={32} width={35}></img>
          AapkiDukaan
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to="/service" className="text-cyan">
              Features
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="text-cyan">
              About
            </Nav.Link>
            <NavDropdown
              title="Categories"
              className="text-cyan"
              id="basic-nav-dropdown"
            >
              {totalCategories?.content?.map((c) => {
                return <NavDropdown.Item as={Link} to={`/users/store/${c.categoryId}/${c.title}`} key={c.categoryId} >{c.title}</NavDropdown.Item>
              })}
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">More</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/users/cart">
              Cart {userContext.isLogin  && '('+(cart && cart.cartItems?.length)+')'}
            </Nav.Link>
            {userContext.isLogin ? (
              <>
                ({userContext.AdminUser ? 
                  (<><Nav.Link as={NavLink} to="/admin/home">
                    AdminHome
                  </Nav.Link></>) :''
                })
                <Nav.Link  as={NavLink} to={`/users/profile/${userContext?.userData?.userDto?.userId}`}>
                  {userContext?.userData?.userDto?.name}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout" >
                  Logout
                </Nav.Link>
                <Nav.Link as={NavLink} to="/users/store">
                  Store
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
