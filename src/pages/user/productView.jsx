import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ShowHtmlParse from "../../components/ShowHtmlParse";
import { getProductImage } from "../../service/helper.service";
import { getSingleProduct } from "../../service/product.service";
import {BsCartPlusFill} from "react-icons/bs"
import {MdOutlineFlashOn} from "react-icons/md"

const ProductView = () => {
  const pId = useParams(); // it will return an object
  const productId = pId.pId;
  const [product, setProduct] = useState(undefined);
  useEffect(() => {
    getSingleProductLocally(productId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getSingleProductLocally = (productId) => {
    getSingleProduct(productId)
      .then((resp) => {
        console.log(resp);
        setProduct({ ...resp });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userProductView = () => {
    return (
      <>
        <Container className="mt-2">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Row>
                <Col
                  md={{
                    span: 4,
                  }}
                >
                  <Card className="sticky-top  border-0" >
                    <Card.Body >
                    <img 
                    src={
                      product.productImageName
                        ? getProductImage(productId)
                        : "/assest/noProductImage.png"
                    }
                    style={{
                      width:"100%" ,
                      height:"100%",
                      objectFit:"cover"
                    }}
                    alt=""
                  ></img>
                  <div className="mt-3 text-center">
                  <Button variant="danger"  size="sm"> <BsCartPlusFill/> Add To Cart </Button>
                  <Button className="ms-2" variant="info" size="sm"> <MdOutlineFlashOn/> Buy Now </Button>
                  </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col >
                  <Card>
                    <Card.Body>
                      {product.category ? (<Badge pill bg="danger"><span >{product.category?.title}</span></Badge>) : ''}
                      <Badge pill className={product.category ? "ms-2" : ''} bg={product.stock ? "success" : "danger"}><span >{product.stock ? "InStock" : "Out Of Stock"}</span></Badge>
                      <div className="ms-2 mt-2">
                        <b className="text-muted">{product.title}</b>
                        <h6 style={{color:"#26a541" ,fontWeight: "500" }}>Special Price </h6>
                        <h4>₹{product.discounted_price} <span className="ms-2" style={{fontSize:"14px"}}><s>₹{product.price}</s></span></h4>
                        <div>
                          <Badge pill ><span fontSize="14px">4⭐</span></Badge>
                          <span className="text-muted ms-2">2,445 ratings and 510 reviews</span>
                        </div>
                        <p className="mt-3">
                          <b>Bank Offer10% off on Kotak Bank Credit Card, up to ₹1250 on orders of ₹5,000 and above T&C </b>
                          <br/>
                          <b>Bank Offer10% off on RBL Bank Credit Card, up to ₹1250 on orders of ₹5,000 and above T&C</b>
                          <br/>
                          <b>Bank Offer10% off on SBI Credit Card, up to ₹1250 on orders of ₹5,000 and above T&C</b>
                          <br/>
                        </p>      
                        <p className="text-muted">Delivery by After 5 days of Order |<strong>Free <s>₹40</s></strong></p>
                        <div>
                          <ShowHtmlParse  htmltext={product.discription}/>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  };
  return product && userProductView();
};

export default ProductView;
