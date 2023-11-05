import React, { useContext } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { getProductImage } from "../../service/helper.service";
import CartContext from "../../context/cart.context";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SingleCartItemView = ({ items , orderPlacedClicked }) => {
  const styleImage = {
    width: "100px",
    height: "120px",
    objectfit: "contain",
    marginBottom: "20px",
  };
  const styleImage2 = {
    width: "90px",
    height: "110px",
    objectfit: "contain",
    marginBottom: "20px",
  };

  const {removeItemsfromUserCartLocally , addItemToCartLocally} = useContext(CartContext);
  

  const handleRemove = (CartId) => {
    Swal.fire({
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove item!',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        removeItemsfromUserCartLocally(CartId);
    }})
  }

  const getDiscount = () =>{
    let price = items.product.price * items.quantity ;
    let disc = items.quantity * items.product.discounted_price;
    let x = (disc / price) * 100;
    return Math.round(x) ;
  }

  return (
    <div>
      <Card className="mt-2 shadow-sm border-0">
        <Card.Body>
          <Row>
            <Col
              md={2}
              className="d-flex align-items-center justify-items-center"
            >
              {/* image */}
              <img
                style={orderPlacedClicked ? styleImage2: styleImage}
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
                    <b>Quanity : </b> {items.quantity}
                  </Col>
                  <Col>
                    <b>Price : </b> ₹{items.product.discounted_price}
                  </Col>
                  <Col>
                    <b>Total : </b>
                    {items.quantity * items.product.discounted_price}
                  </Col>
                </Row>
              </div>
              <b>
                <span
                  className="h6 text-muted"
                  style={{ color: "#878787", textDecoration: "line-through" }}
                >
                  <s>₹{items.product.price * items.quantity}</s>
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
                  ₹{items.quantity * items.product.discounted_price}
                </span>
              </strong>
              <span
                className="ms-2"
                style={{ fontWeight: "800", color: "#388e3c" }}
              >
                {getDiscount()} % Off 6 offers applied
              </span>
            </Col>
            <Col
              md={orderPlacedClicked ? 3 : 2}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="w-100">
                <div className="d-grid">
                  <Button variant="danger" size={orderPlacedClicked ? "sm" : 'lg'} onClick={(event) =>handleRemove(items.cartItemId)}>Remove</Button>
                </div>
                <div className="mt-2">
                  <Row>
                    <Col className="d-grid">
                      <Button size="sm" variant="info" onClick={(event) => {
                        let decreaseQuantity = items.quantity - 1;
                        if(decreaseQuantity <= 0){
                          toast.warning("Quantity can't be less than 1" , {position:"bottom-center" , closeOnClick:true});
                          return ;
                        }else{
                          toast.info('Quantity Decreased' ,{position:"bottom-center" , closeOnClick:true});
                          addItemToCartLocally(decreaseQuantity , items.product.pId, items.product.title );
                        }
                      }}>
                        {" "}
                        -{" "}
                      </Button>
                    </Col>
                    <Col className="d-grid">
                      <Button size="sm" variant="warning" onClick={(event) => {
                        let increaseQuantity = items.quantity + 1;
                        if(increaseQuantity >= 5){
                          toast.info("Can't order more than 5" ,{position:"bottom-center" , closeOnClick:true});
                          return ;
                        }else{
                          toast.info('Quantity Increased' ,{position:"bottom-center" , closeOnClick:true});
                          addItemToCartLocally(increaseQuantity , items.product.pId ,items.product.title );
                        }
                      }}>
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
