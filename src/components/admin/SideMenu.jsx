import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { MdCategory } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import { GrFormView } from "react-icons/gr";
import { BsFillCartCheckFill } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";

const SideMenu = (props) => {
  return (
    <>
    {console.log(props.notification)}
      <ListGroup className="sticky-top">
        <ListGroupItem as={NavLink} to="/admin/home" action>
          <FcHome size={20} className="me-2" />
          Home
        </ListGroupItem>
        <ListGroupItem as={NavLink} to="/admin/add-category" action>
          <BiSolidCategoryAlt size={20} className="me-2" />
          Add Categories
        </ListGroupItem>
        <ListGroupItem as={NavLink} to="/admin/categories" action className="d-flex justify-content-between align-items-start">
          <div>
          <MdCategory size={20} className="me-2" />
          View Categories
          </div>
          <Badge bg="danger" hidden={!props.notification }>New</Badge>
        </ListGroupItem>
        <ListGroupItem as={NavLink} to="/admin/add-product" action>
            <IoIosAddCircle size={20} className="me-2"/>
          Add Product
        </ListGroupItem>
        <ListGroupItem as={NavLink} to="/admin/products" action>
            <GrFormView size={20} className="me-2"/>
          View Product
        </ListGroupItem>
        <ListGroupItem as={NavLink} to="/admin/orders" action>
            <BsFillCartCheckFill size={20} className="me-2"/>
          View Orders
        </ListGroupItem>
        <ListGroupItem
          as={NavLink}
          to="/admin/users"
          className="d-flex justify-content-between align-items-start"
          action
        >
        <div>
        <ImUsers size={20} className="me-2"/>
          Users
        </div>
          <Badge bg="danger">9</Badge>
        </ListGroupItem>
        <ListGroupItem as={NavLink} to="/logout" action>
          <IoLogOut size={20} className="me-2"/> Logout
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default SideMenu;
