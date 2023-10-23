import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUserNurse } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { getAllproduct } from "../../service/product.service";
import { useState } from "react";
import { getAllUser } from "../../service/user.service";
import { getAllOrders } from "../../service/order.service";
import { getAllCategory } from "../../service/category.service";
import { useEffect } from "react";

const AdminHome = () => {
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  const getAllProductLocal = () => {
    getAllproduct()
      .then((e) => {
        console.log(e);
        setTotalProduct(e.content.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllUserLocal = async () => {
    try {
      const resp = await getAllUser(0, 10000, "name", "asc");
      setTotalUser(resp.content.length);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllOrdersLocal = async () => {
    try {
      const resp = await getAllOrders(0, 10000, "name", "asc");
      setTotalOrder(resp.content.length);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllCategoryLocal = () => {
    return getAllCategory()
      .then((resp) => {
        setTotalCategories(resp.content.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllCategoryLocal();
    getAllOrdersLocal();
    getAllProductLocal();
    getAllUserLocal();
  }, []);

  return (
    <>
      <div className="text-center">
        <Container style={{ width: "50%" }}>
          <Card>
            <Card.Body>
              <h5>Welcome To Admin Dashboard</h5>
              <p className="text-muted">
                Here you can all Admin operations which is given below !!
              </p>
              <Container className="d-grid gap-3">
                <Button
                  as={Link}
                  to={`/admin/add-category`}
                  variant="outline-secondary"
                >
                  Start Managing Categories
                </Button>
                <Button
                  as={Link}
                  to={`/admin/orders`}
                  variant="outline-secondary"
                >
                  Start Managing Orders
                </Button>
                <Button
                  as={Link}
                  to={`/admin/add-product`}
                  variant="outline-secondary"
                >
                  Start Managing Products
                </Button>
                <Button
                  as={Link}
                  to={`/admin/users`}
                  variant="outline-secondary"
                >
                  Start Managing Users
                </Button>
              </Container>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <div className="mt-3">
        <Container>
          <Row>
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <MdOutlineProductionQuantityLimits size={50} />
                  <h5 className="text-muted">Number of product</h5>
                  <p>
                    <b>{totalProduct}</b>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <TbCategoryFilled size={50} />
                  <h5 className="text-muted">Number of catagories</h5>
                  <p>
                    <b>{totalCategories}</b>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mt-3">
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <FaUserNurse size={50} />
                  <h5 className="text-muted">Number of users</h5>
                  <p>
                    <b>{totalUser}</b>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mt-3">
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <FaCartArrowDown size={50} />
                  <h5 className="text-muted">Number of Orders</h5>
                  <p>
                    <b>{totalOrder}</b>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminHome;
