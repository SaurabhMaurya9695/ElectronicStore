import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap";
import SingleProductView from "../../components/admin/SingleProductView";
import { getAllproduct } from "../../service/product.service";

const ViewProduct = () => {

    const [product , setProduct] = useState(undefined);

    useEffect(()=>{
        getAllProducts()
    },[]) ;

    const getAllProducts=(
        pageNumber = 0,
        pageSize = 10,
        sortBy = "addedDate",
        sortDir = "asc"
    )=>{
        getAllproduct(pageNumber , pageSize , sortBy , sortDir).then((resp)=>{
            console.log("product loaded successfully");
            console.log(resp);
            setProduct({
                ...resp
            });
        }).catch((error)=>{
            console.log("error");
            console.log(error);
        })
    }

    const productView = ()=>{
        return (<>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">View Products</h5>
                <Form.Group className="mb-3">
                    <Form.Label>Search Product </Form.Label>
                    <Form.Control type="text" placeholder="Write Keywords to Search the text"></Form.Control>
                </Form.Group>
                <Table
                  className="text-center"
                  striped
                  responsive
                  bordered
                  hover
                  size="sm"
                >
                  <thead>
                    <tr>
                      <th>#SN</th>
                      <th>Title</th>
                      <th>Quanitity</th>
                      <th>Price</th>
                      <th>Discounted</th>
                      <th>Live</th>
                      <th>InStock</th>
                      <th>Category</th>
                      <th>AddedDate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        product.content.map((e,index) => <SingleProductView key={index} index={index}
                                                         product={e}   />)
                    }
                  </tbody>
                </Table>
                {/* Implement Pagination here */}
                <Container className="d-flex justify-content-center" >
                    <Pagination>
                        <Pagination.Prev></Pagination.Prev>
                        <Pagination.Item>2</Pagination.Item>
                        <Pagination.Item>3</Pagination.Item>
                        <Pagination.Next/>
                    </Pagination>
                </Container>
              </Card.Body>

            </Card>
        </>);
    }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            {" "}
            {/* add responsive for make table resposnive */}
            {/* {JSON.stringify(product)} */}
            {
                product ?  productView() : ''
            }
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ViewProduct;
