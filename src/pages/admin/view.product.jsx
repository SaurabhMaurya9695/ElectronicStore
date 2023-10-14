import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Pagination, Row, Table } from "react-bootstrap";
import SingleProductView from "../../components/admin/SingleProductView";
import {getProductImage, PRODUCT_PAGE_SIZE } from "../../service/helper.service";
import { getAllproduct } from "../../service/product.service";
import ShowHtmlParse from "../../components/ShowHtmlParse"
const ViewProduct = () => {

    const [products , setProducts] = useState(undefined);
    const [currentModelProduct , setCurrentModelProduct] = useState(undefined);
    //modal states start
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false)
    };

    const modalShow = (event , product) => { // pass this as reference to other component to open the view
      console.log("this is product" ,  product);
      setCurrentModelProduct(product)
      setShow(true)
    };
    //modal states ends

    //imgae condition
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
            setProducts({
                ...resp
            });
        }).catch((error)=>{
            console.log("error");
            console.log(error);
        })
    }

    const updateProductList = (productId)=>{
      const newArray = products.content.filter((p)=> p.pId !== productId); 
      setProducts({
        ...products,
        content:newArray
      });
    }

    // modelView

    const openModelView = () =>{
      
      return currentModelProduct && (<>
        <Modal size="xl" centered show={show} onHide={handleClose}>
          {/* {JSON.stringify(currentModelProduct.pId)} */}
          {/* {currentModelProduct.pId} */}
          <Modal.Header closeButton>
            <Modal.Title>{currentModelProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className="shadow">
              <Card.Body>
                {/* product profile */}
            <Container className="text-center">
              <img style={{
                height : '300px'
              }} src={currentModelProduct.productImageName != null ?  getProductImage(currentModelProduct.pId) : "/assest/noProductImage.png"} alt="No_Image_Found" />
            </Container>
            {/* Information table  */}
          <Table striped bordered responsive className="text-center mt-2">
            <thead>
              <tr>
                <th>Info</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Quantity</td>
                <td>{currentModelProduct.quantity}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>₹{currentModelProduct.price}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>₹{currentModelProduct.discounted_price}</td>
              </tr>
              <tr>
                <td>Live</td>
                <td>{currentModelProduct.live ? 'True':'False'}</td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>{currentModelProduct.stock ? 'InStock':'Out Of Stock'}</td>
              </tr>
              <tr>
                <td>Category </td>
                <td>{currentModelProduct.category?.title}</td>
              </tr>
            </tbody>
          </Table>
            {/* description */}
            <div className="p-3 border border-1" >
            <ShowHtmlParse htmltext={currentModelProduct.discription}/>
            </div>
              </Card.Body>
            </Card>
          </Modal.Body>

          
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
                         products.content.map((e,index) => <SingleProductView key={index} index={index} updateProductList={updateProductList} product={e}  openModelView = {modalShow} />) 
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
                            if(products.pageNumber - 1 < 0) return ;
                              getAllProducts(0 , PRODUCT_PAGE_SIZE , 'addedDate' , 'asc')}}/>
                        <Pagination.Prev  onClick={(event)=>{
                            if(products.pageNumber - 1 < 0) return ;
                              getAllProducts(products.pageNumber - 1 , PRODUCT_PAGE_SIZE , 'addedDate' , 'asc')}}/>
                        {
                          [...Array(products.totalPages)].map((obj, i) => i).map((item)=> {
                            return (products.pageNumber === item) ? <Pagination.Item active key={item}>{item + 1 }</Pagination.Item> : <Pagination.Item onClick={(event)=>{
                              getAllProducts(item , PRODUCT_PAGE_SIZE , 'addedDate' , 'asc')
                            }} key={item}>{item + 1 }</Pagination.Item>
                          })
                        }
                        <Pagination.Next onClick={(event)=>{
                          if(products.lastPage) return
                              getAllProducts(products.pageNumber + 1 , PRODUCT_PAGE_SIZE , 'addedDate' , 'asc')}}/>
                        <Pagination.Last  onClick={(event)=>{
                              getAllProducts(products.totalPages - 1, PRODUCT_PAGE_SIZE , 'addedDate' , 'asc')}}/>
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
                products ?  productView() : ''
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
