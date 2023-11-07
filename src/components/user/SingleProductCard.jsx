import React from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProductImage } from "../../service/helper.service";

const SingleProductCard = ({ product }) => {
  const styleImage = {
    width: "150px",
    height: "180px",
    objectfit: "contain",
    marginBottom: "20px",
  };

  return (
    <Card className="m-1 shadow-sm border-0 ">
      <Card.Body>
        <Container className="text-center">
          <img
            style={styleImage}
            src={
              product.productImageName
                ? getProductImage(product.pId)
                : "/assest/noProductImage.png"
            }
            alt=""
          ></img>
        </Container>
        <p>
          <b>{product.title.length > 20 ? <>{product.title.substring(0, 30)} ...</> : product.title } </b>
        </p>
        <Badge pill bg="danger" className="me-3">
          {product.category?.title}
        </Badge>
        <Badge pill bg={product.stock ? "dark" : "info"}>
          {product.stock ? "In Stock" : "Out Of Stock"}
        </Badge>
        <Container className="text-end">
          <b>
            <span className="h6 text-muted">
              <s>₹{product.price}</s>
            </span>
          </b>
          <strong>
            <span className="h4 ms-2"><b>₹{product.discounted_price}</b></span>
          </strong>
        </Container>
        <Container className="d-grid mt-2">
          <Button variant="info" className="" size="sm" as={Link} to={`/store/product/${product.pId}`}>
            View product
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SingleProductCard;
