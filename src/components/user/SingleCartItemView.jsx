import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { getProductImage } from "../../service/helper.service";

const SingleCartItemView = ({ items }) => {
  const styleImage = {
    width: "100px",
    height: "120px",
    objectfit: "contain",
    marginBottom: "20px",
  };
  return (
    <div>
      <Card className="mt-2">
        <Card.Body>
          <Row>
            <Col
              md={2}
              className="d-flex align-items-center justify-items-center"
            >
              {/* image */}
              <img
                style={styleImage}
                src={
                  items.product?.productImageName
                    ? getProductImage(items.product.pId)
                    : "/assest/noProductImage.png"
                }
                alt=""
              ></img>
            </Col>
            <Col>
              {/* discription */}
              <h5 style={{ overflow: "hidden" }}>{items.product.title}</h5>
              <p className="mt-2" style={{ color: "#878787" }}>
                Seller:SVPeripherals
              </p>
              <div className="mb-2">
                <Row>
                  <Col>
                    <b>Quanity : </b> {items.product.quantity}
                  </Col>
                  <Col>
                    <b>Price : </b> ₹{items.product.price}
                  </Col>
                  <Col>
                    <b>Total Price : </b>
                    {items.product.quantity * items.product.price}{" "}
                  </Col>
                </Row>
              </div>
              <b>
                <span
                  className="h6 text-muted"
                  style={{ color: "#878787", textDecoration: "line-through" }}
                >
                  <s>₹{items.product.price}</s>
                </span>
              </b>
              <strong>
                <span
                  className=" ms-2"
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#212121",
                  }}
                >
                  ₹{items.product.discounted_price}
                </span>
              </strong>
              <span
                className="ms-2"
                style={{ fontWeight: "800", color: "#388e3c" }}
              >
                28% Off 6 offers applied
              </span>
            </Col>
            <Col
              md={2}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="w-100">
                <div className="d-grid">
                  <Button variant="danger">Remove</Button>
                </div>
                <div className="mt-2">
                  <Row>
                    <Col className="d-grid">
                      <Button size="sm" variant="info">
                        {" "}
                        -{" "}
                      </Button>
                    </Col>
                    <Col className="d-grid">
                      <Button size="sm" variant="warning">
                        {" "}
                        +{" "}
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleCartItemView;
