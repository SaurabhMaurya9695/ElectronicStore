import { useContext, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import SingleCartItemView from "../components/user/SingleCartItemView";
import CartContext from "../context/cart.context";
import { Link } from "react-router-dom";
import UserContext from "../context/user.context";

function Cart() {
  const { cart } = useContext(CartContext);
  const { isLogin} = useContext(UserContext);
  const [orderPlacedClicked , setOrderPlacedClicked] = useState(false);

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
                    <SingleCartItemView items={items} key={items.cartItemId} orderPlacedClicked={orderPlacedClicked}/>
                  );
                })}
              </Col>
              <Col md={orderPlacedClicked ? 4 : 3} className="mt-2">
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
              <Button variant="warning" size="lg" onClick={(event) =>{
                setOrderPlacedClicked(true);
              }}>
                Place Order
              </Button>
            </Container>
          </Card.Footer>
        </Card>
      </>
    );
  };

  const emptyCartView = () =>{
    return isLogin && (<>
        <Card  className="text-center shadow-sm border-0 mt-3">
          <Card.Body>
          <h5 className="text-muted text-center mb-5">AapkiDukaan</h5>
            <div  className="text-center">
              <div className="mt-2 text-center">
                <img src="/assest/cartEmpty.png" alt="cartEmpty"  style={{
                  width:"30%",
                  objectFit:"contain"
                }}></img>
              </div>
              <h2>Your Cart is empty.</h2>
              <p>Add Items to it now .</p>
              <div>
                <Button variant="warning" as={Link} to={`/users/store`} > Shop Now</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
    </>)
  }

  return (
    <>
      <div className="">
        <Container fluid>
          <Row>
            <Col md={orderPlacedClicked ? 9 : 12}>{cart && (cart.cartItems.length > 0 ? cartView() : emptyCartView())}</Col>
            {
              orderPlacedClicked && <>
                <Col >
                <h1>This is order placed</h1>
                </Col>
              </>
            }
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Cart;
