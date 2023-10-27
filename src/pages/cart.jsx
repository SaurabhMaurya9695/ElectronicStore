import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import SingleCartItemView from "../components/user/SingleCartItemView";
import CartContext from "../context/cart.context";

function Cart() {
  const { cart } = useContext(CartContext);

  const getTotalCartAmount = () => {
    let amount = 0;
    cart.cartItems.forEach((p) => {
      amount += p.product.price;
    });
    return amount;
  };
  const getDiscountedCartAmount = () => {
    let amount = 0;
    cart.cartItems.forEach((p) => {
      amount += p.product.price - p.product.discounted_price;
    });
    return amount;
  };
  const totalAmountOfCart = () => {
    let amount = 0;
    cart.cartItems.forEach((p) => {
      amount += p.totalPrice;
    });
    return amount;
  };

  const cartView = () => {
    return (
      <>
        <Card className="mt-3 shadow-sm border-0">
          <Card.Body>
            <Row className="px-5">
              <Col>
                <h5 className="text-muted text-center">AapkiDukaan</h5>
                {cart.cartItems.map((items) => {
                  return (
                    <SingleCartItemView items={items} key={items.cartItemId} />
                  );
                })}
              </Col>
              <Col md={3}>
                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-muted">
                    <h6>Price Details</h6>
                  </CardHeader>
                  <Card.Body>
                    <Row>
                      <Col>
                        <p>Price : (items {cart.cartItems?.length}) </p>
                      </Col>
                      <Col md={5}>₹{getTotalCartAmount()}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>Discount</p>
                      </Col>
                      <Col
                        md={5}
                        style={{ color: "#388e3c", fontWeight: "600" }}
                      >
                        -₹{getDiscountedCartAmount()}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>Delivery Charges</p>
                      </Col>
                      <Col md={5} className="me-1">
                        <s> ₹40 </s>{" "}
                        <span
                          className="ms-2"
                          style={{ color: "#388e3c", fontWeight: "600" }}
                        >
                          {" "}
                          Free
                        </span>
                      </Col>
                    </Row>
                    <Row
                      className="mt-2"
                      style={{ borderTop: "1px dashed #e0e0e0" }}
                    >
                      <Col>
                        <p>
                          <b>Total Price</b>
                        </p>
                      </Col>
                      <Col md={5}>
                        <p>
                          <b>₹{totalAmountOfCart()}</b>
                        </p>
                      </Col>
                    </Row>
                    <Row
                      className="mt-2"
                      style={{ borderTop: "1px dashed #e0e0e0" }}
                    >
                      <Col>
                        <span style={{ color: "#388e3c", fontWeight: "600" }}>
                          You Will Save ₹{getDiscountedCartAmount() - 40} on
                          This Order
                        </span>
                      </Col>
                    </Row>
                    <Container className="mt-2 sticky-bottom text-end">
                      <Button variant="warning">Place Order</Button>
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Container className="mt-2 sticky-bottom text-end shadow-0">
              <Button variant="warning" size="lg">
                Place Order
              </Button>
            </Container>
          </Card.Footer>
        </Card>
      </>
    );
  };

  return (
    <>
      <div className="">
        <Container>
          <Row>
            <Col>{cart && cartView()}</Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Cart;
