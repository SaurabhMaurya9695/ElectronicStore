import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/helper.auth";

const AdminDashboard = () => {
  const dashView = () => {
    return (
      <div>
        <h1>this is admin dashboard</h1>
        <Outlet></Outlet>
      </div>
    );
  };
  const NotloggedInView = () => {
    return (
      <>
        <Container className="mt-5 ">
          <Row>
            <Col sm={{ span: 6, offset: 3 }}>
              <Card className="border-0 shadow">
                <Card.Body className="text-center">
                  <h1>Oops!! .. You are not Admin User </h1>
                  <p> Please don't have access to this page !! Login as Admin </p>
                  <Button as={NavLink} to="/login" variant="success">
                     Login Here
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  return isAdminUser() ? dashView() : NotloggedInView();
};

export default AdminDashboard;
