import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import userContext from '../../context/user.context'

const Dashboards = () => {

  const context = useContext(userContext);

  
  const dashboardView = () => {
    return (<div>
      <h1>this is Dashboard</h1>
      <Outlet />
    </div>)
  };

  const NotloggedInView = () =>{
    return (
      <>
        <Container className="mt-5 ">
          <Row>
            <Col sm={{ span: 6, offset: 3 }}>
              <Card className="border-0 shadow">
                <Card.Body className="text-center">
                  <h1>You are not logged In</h1>
                  <p> Please do login to access this page !! </p>
                  <Button as={NavLink} to="/login" variant="success">Login Here</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    (context.isLogin) ? dashboardView() : NotloggedInView()
  );
};

export default Dashboards;
