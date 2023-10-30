import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
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
            {/* <Nav.Link as={NavLink} to="/contact" className="text-end">
              Contact Us
            </Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/users/cart">
              Cart {userContext.isLogin  && '('+(cart && cart.cartItems?.length)+')'}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="text-end">
              Contact Us
            </Nav.Link>
            {userContext.isLogin ? (
              <>
                <Nav.Link as={NavLink} to="/users/orders">
                    Orders
                </Nav.Link>
                <Nav.Link as={NavLink} to="/store">
                    Store
                </Nav.Link>
                ({userContext.AdminUser ? 
                  (<>
                <Nav.Link as={NavLink} to="/admin/home">
                    AdminHome
                  </Nav.Link></>) : undefined
                })
                <Nav.Link  as={NavLink} to={`/users/profile/${userContext?.userData?.userDto?.userId}`}>
                  {userContext?.userData?.userDto?.name}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout" >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/users/orders">
                    Orders
                </Nav.Link>
                <Nav.Link as={NavLink} to="/store">
                  Store
                </Nav.Link>
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
