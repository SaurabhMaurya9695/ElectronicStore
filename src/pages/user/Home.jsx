import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user.context";
import {
  Button,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import WelcomePage from "../../components/WelcomePage";
import { Link } from "react-router-dom";

const Home = () => {
  const userContext = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <>
      <div>
        <Container className="text-center mt-5 p-4">
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <main class="main">
                <h1 class="heading">
                  Find and order your product from anywhere
                </h1>
                <p class="text">
                  Search through hundreds of category to find your next product.
                  Get your product now.
                </p>
                <Button as={Link} to={"/store"} variant="danger">
                  Shop Now
                </Button>
              </main>
            </Col>
          </Row>
        </Container>
        {
          <WelcomePage
            show={open}
            handleClose={handleClose}
            name={userContext.userData?.userDto?.name}
          />
        }
      </div>
    </>
  );
};

export default Home;
