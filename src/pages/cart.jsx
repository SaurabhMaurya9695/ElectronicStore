import { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
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

  const orderForm = () =>{
    return (<>
      <Form>
        <FormGroup className="mt-3">
          <FormLabel> Billing Name</FormLabel>
          <FormControl type="text" placeholder="Enter Billing Name"></FormControl>
        </FormGroup>
        <FormGroup className="mt-3">
          <FormLabel> Billing Phone Number</FormLabel>
          <FormControl type="text" placeholder="Enter Billing Phone Number"></FormControl>
        </FormGroup>
        <FormGroup className="mt-3">
          <FormLabel> Billing Address</FormLabel>
          <FormControl as={`textarea`} rows={5} placeholder="Enter Billing Address"></FormControl>
        </FormGroup>
        <Container className="mt-3 text-center">
          <Button variant="warning" size="sm">Create Order And Proceed To Payment</Button>
        </Container>
      </Form>
    </>)
  }

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
              <Col md={orderPlacedClicked ? 3 : 3} className="mt-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-muted">
                    <h6>Price Details</h6>
                  </CardHeader>
                  <Card.Body>
                    <Row>
                      <Col md={orderPlacedClicked ? 6 : 8}>
                        <p>Price : (items {cart.cartItems?.length}) </p>
                      </Col>
                      <Col className="text-end" >₹{getTotalCartAmount()}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>Discount</p>
                      </Col>
                      <Col
                        className="text-end"
                        style={{ color: "#388e3c", fontWeight: "600" }}
                      >
                        -₹{getDiscountedCartAmount()}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>Delivery Charges</p>
                      </Col>
                      <Col  className="me-1 text-end">
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
                    {!orderPlacedClicked ?<Button className="mt-2" variant="warning" size="sm" onClick={(event) =>{
                      setOrderPlacedClicked(true);
                    }}>
                      Place Order
                    </Button> : <Button className="mt-2" variant="info" size="sm">Create Order And Proceed To Payment</Button>}
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Container className="mt-2 sticky-bottom text-end shadow-0">
              {!orderPlacedClicked ?<Button variant="warning" size="lg" onClick={(event) =>{
                setOrderPlacedClicked(true);
              }}>
                Place Order
              </Button> : ''}
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
        <Container fluid={orderPlacedClicked} className="px-4" >
          <Row>
            <Col md={orderPlacedClicked ? 9 : 12} className="animation">{cart && (cart.cartItems.length > 0 ? cartView() : emptyCartView())}</Col>
            {
              orderPlacedClicked && <>
                <Col className="mt-2">
                  <Card className="shadow-lg border-0" style={{background :"#fff"}}>
                    <Card.Header><h5>Fill The form To complete Order</h5></Card.Header>
                    <Card.Body>
                    {orderForm()}
                    </Card.Body>
                  </Card>
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
