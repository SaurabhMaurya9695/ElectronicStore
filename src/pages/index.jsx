import { Card, Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Base from "../components/user/Base";
import { useEffect, useState } from "react";
import { getAllproduct, searchProducts } from "../service/product.service";
import SingleProductCard from "../components/user/SingleProductCard";

function Index() {
  const [products, setProducts] = useState([]);
  const [phone, setPhone] = useState([]);

  useEffect(() => {
    getProductsLocally();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getProductsBytitle();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getProductsLocally = () => {
    getAllproduct(0, 4, "addedDate", "asc")
      .then((resp) => {
        console.log(resp);
        setProducts(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }; // eslint-disable-line react-hooks/exhaustive-deps

  const getProductsBytitle = () => {
    searchProducts("samsung")
      .then((resp) => {
        console.log(resp);
        setPhone(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }; // eslint-disable-line react-hooks/exhaustive-deps

  const courosualView = () => {
    return (
      <>
        <Card className="mt-2 shadow-sm border-0">
          <Card.Body>
            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`/assest/c1.webp`}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`/assest/c2.webp`}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`/assest/c3.webp`}
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>
          </Card.Body>
        </Card>
      </>
    );
  };

  const productView = () => {
    return (
      products && (
        <>
          <Card className="mt-3 border-0 shadow-sm">
            <Card.Body>
              <h5>Best Sellers Products </h5>
              <Container fluid>
                <Row>
                  {products?.content?.map((p) => {
                    return (
                      <Col md={3} key={p.pId}>
                        <SingleProductCard product={p} />
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </>
      )
    );
    // return (<>{JSON.stringify(products)}</>)
  };

  const bestPhones = () => {
    return (
      phone && (
        <>
          <Card className="mt-3 border-0 shadow-sm">
            <Card.Body>
              <h5 className="mt-2">Best Phones For You </h5>
              <Container fluid>
                <Row>
                  {phone?.content?.map((p) => {
                    return (
                      <Col md={3} key={p.pId}>
                        <SingleProductCard product={p} />
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </>
      )
    );
    // return (<>{JSON.stringify(products)}</>)
  };

  return (
    <Base
      title="Shop what you need"
      discription="Welcome to AapkiDukaan. We provided the best items for you .
    Click on Button for Shop"
      buttonEnable="true"
      buttonText="Go For Shop"
      buttonLink="/"
    >
      <Container fluid>
        <Row>
          <Col>
            <div>{courosualView()}</div>
          </Col>
        </Row>
        <Row>
          <Col>{productView()}</Col>
        </Row>
        <Row>
          <Col>{bestPhones()}</Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Index;
