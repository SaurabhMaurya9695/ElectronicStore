import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SideMenu = ()=>{
    return (<>
        <ListGroup>
            <ListGroupItem as={NavLink} to="/admin/home" action>Home</ListGroupItem>
            <ListGroupItem as={NavLink} to="/admin/add-category" action>Add Categories</ListGroupItem>
            <ListGroupItem as={NavLink} to="/admin/categories"action>View Categories</ListGroupItem>
            <ListGroupItem as={NavLink} to="/admin/add-product" action>Add Product</ListGroupItem>
            <ListGroupItem as={NavLink} to="/admin/products" action>View Product</ListGroupItem>
            <ListGroupItem as={NavLink} to="/admin/orders" action>View Orders</ListGroupItem>
            <ListGroupItem as={NavLink} to="/admin/users" className="d-flex justify-content-between align-items-start" action>
                Users
                <Badge bg="danger">9</Badge>
                </ListGroupItem>
            <ListGroupItem as={NavLink} to="/logout" action>Logout</ListGroupItem>
        </ListGroup>
    </>)
}

export default SideMenu;