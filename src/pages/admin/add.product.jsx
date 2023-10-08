import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    discription: "",
    price: 0,
    discounted_price: 0,
    quantity: 1,
    stock: false,
    live: false,
    image: undefined, // to upload the image
    imagePreview: "/assest/noProductImage.png", // to show the priview
  });

  //DataBinding
  const handleChange = (event, property) => {
    event.preventDefault();
    setProduct({
      ...product,
      [property]: event.target.value,
    });
  };

  //for Handling Image
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpg" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProduct({
          ...product,
          imagePreview: e.target.result,
          image: event.target.files[0],
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      toast.error("File Type Is Invalid ");
      setProduct({
        ...product,
        imagePreview: "/assest/noProductImage.png",
        // imagePreview: undefined,
        image: undefined,
      });
    }
  };

  const submitForm = (event)=>{
    event.preventDefault();
    console.log(product);
  }

  const formView = () => {
    return (
      <div>
        {/* {JSON.stringify(product)} */}
        <Card className="border border-0 shadow-sm">
          <Card.Body>
            <h5 className="text-center">Add Product Here</h5>
            <Form onSubmit={submitForm}>
              {/* title Filed */}
              <Form.Group className="mt-3">
                <Form.Label>Enter Your Title</Form.Label>
                <Form.Control
                  type="text"
                  rows={10}
                  placeholder="Enter here"
                  onChange={(event) => handleChange(event, "title")}
                  value={product.title}
                />
              </Form.Group>
              {/* discription Filed */}
              <Form.Group className="mt-3">
                <Form.Label>Enter Your Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={5}
                  placeholder="Enter here"
                  onChange={(event) => handleChange(event, "discription")}
                  value={product.discription}
                />
              </Form.Group>

              {/* price and discountedPrice */}
              <Row>
                <Col>
                  {/* actual price */}
                  <Form.Group className="mt-3">
                    <Form.Label>Enter Your Actual Price Here</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter here"
                      onChange={(event) => handleChange(event, "price")}
                      value={product.price}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {/* discounted price */}
                  <Form.Group className="mt-3">
                    <Form.Label>Enter Your Discounted Price Here</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter here"
                      onChange={(event) => {
                        if (event.target.value > product.price) {
                          toast.error("Invalid Discount Price");
                          return;
                        }
                        setProduct({
                          ...product,
                          discounted_price: event.target.value,
                        });
                      }}
                      value={product.discounted_price}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* product quantity */}
              <Form.Group className="mt-3">
                <Form.Label>Enter Your Product Quantity Here</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter here"
                  onChange={(event) => handleChange(event, "quantity")}
                  value={product.quantity}
                />
              </Form.Group>
              <Row className="mt-3 px-1">
                <Col>
                  {/* Live */}
                  <Form.Check
                    type="switch"
                    label={"Live"}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        live: !product.live,
                      })
                    }
                    value={product.live}
                  />
                </Col>
                <Col>
                  {/* stock */}
                  <Form.Check
                    type="switch"
                    label={"InStock"}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        stock: !product.stock,
                      })
                    }
                    value={product.stock}
                  />
                </Col>
              </Row>

              {/* ProductImage */}
              <Form.Group className="mt-3">
                <Container hidden={!product.image}>
                  <p className="text-muted">Image Preview</p>
                  <img
                    src={product.imagePreview}
                    alt=""
                    className="img-fluid"
                    style={{
                      height: "100px",
                      width: "100px",
                    }}
                  ></img>
                </Container>
                <Form.Label className="mt-2">
                  Enter Your Product Image{" "}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="file"
                    placeholder="Enter here"
                    onChange={(event) => handleFileChange(event)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={(event) =>
                      setProduct({
                        ...product,
                        imagePreview: undefined,
                        image: undefined,
                      })
                    }
                  >
                    {" "}
                    Clear
                  </Button>
                </InputGroup>
              </Form.Group>
              <Container className="text-center mt-3">
                <Button variant="danger" type="submit" size="sm">
                  Add Product
                </Button>
                <Button variant="info" type="reset" size="sm" className="ms-2">
                  Reset
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return <>{formView()}</>;
};

export default AddProduct;
