import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Pagination, Row, Table } from "react-bootstrap";
import SingleProductView from "../../components/admin/SingleProductView";
import { PRODUCT_PAGE_SIZE } from "../../service/helper.service";
import { getAllproduct } from "../../service/product.service";

const ViewProduct = () => {

    const [product , setProduct] = useState(undefined);
    //modal states start
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false)
    };
    const modalShow = (event) => { // pass this as reference to other component to open the view
      console.log("open model")
      setProduct({
        ...product
      })
      setShow(true)
    };
    //modal states ends

    useEffect(()=>{
        getAllProducts()
    },[]) ;

    const getAllProducts=(
        pageNumber = 0,
        pageSize = PRODUCT_PAGE_SIZE,
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

    const updateProductList = (productId)=>{
      const newArray = product.content.filter((p)=> p.pId !== productId); 
      setProduct({
        ...product,
        content:newArray
      });
    }

    // modelView

    const openModelView = () =>{
      
      return (<>
      {modalShow}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{product.pId}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>)
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
                         product.content.map((e,index) => <SingleProductView key={index} index={index} updateProductList={updateProductList} product={e}  openModelView = {modalShow} />) 
                    }
                  </tbody>
                </Table>
                {/* Implement Pagination here */}
                <Container className="d-flex justify-content-center" >
                    <Pagination>
                        {/* <Pagination.Prev></Pagination.Prev>
                        <Pagination.Item>2</Pagination.Item>
                        <Pagination.Item>3</Pagination.Item>
                        <Pagination.Next/> */}

                        {/* implement pagination with the help of for loop */}
                        <Pagination.First onClick={(event)=>{
                            if(product.pageNumber - 1 < 0) return ;
                              getAllProducts(0 , PRODUCT_PAGE_SIZE , 'addedDate' , 'asc')}}/>
                        <Pagination.Prev  onClick={(event)=>{
                            if(product.pageNumber - 1 < 0) return ;
                              getAllProducts(product.pageNumber - 1 , PRODUCT_PAGE_SIZE , 'addedDate' , 'asc')}}/>
                        {
                          [...Array(product.totalPages)].map((obj, i) => i).map((item)=> {
                            return (product.pageNumber === item) ? <Pagination.Item active key={item}>{item + 1 }</Pagination.Item> : <Pagination.Item onClick={(event)=>{
                              getAllProducts(item , PRODUCT_PAGE_SIZE , 'addedDate' , 'asc')
                            }} key={item}>{item + 1 }</Pagination.Item>
                          })
                        }
                        <Pagination.Next onClick={(event)=>{
                          if(product.lastPage) return
                              getAllProducts(product.pageNumber + 1 , PRODUCT_PAGE_SIZE , 'addedDate' , 'asc')}}/>
                        <Pagination.Last  onClick={(event)=>{
                              getAllProducts(product.totalPages - 1, PRODUCT_PAGE_SIZE , 'addedDate' , 'asc')}}/>
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
      {
        openModelView()
      }
    </>
  );
};

export default ViewProduct;
