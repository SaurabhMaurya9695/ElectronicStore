import { useEffect } from "react";
import { useState } from "react";
import { Badge, Button, Card, Col, Container, ListGroup, ListGroupItem, Modal, Row, Table } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleOrderView from "../../components/admin/SingleOrderView";
import { ADMIN_ORDER_PAGE_SIZE, getProductImage } from "../../service/helper.service";
import { getAllOrders } from "../../service/order.service";

const ViewOrders = () => {
  const [ordersData, setOrdersData] = useState(undefined);
  const [selectedOrdersData, setSelectedOrdersData] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleshow= () => setShow(true);
  const openOrderViewModel = (event , order) => {
    setSelectedOrdersData({...order})
    handleshow();
  }

  useEffect(() => {
    getAllOrdersLocally();
  }, []);

  useEffect(() => {
    if (currentPage > 0 && currentPage !== undefined) {
      getAllOrdersLocally()
    }
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const getAllOrdersLocally = async () => {
    try {
      let data = await getAllOrders(
        currentPage === undefined ? 0 : currentPage,
        ADMIN_ORDER_PAGE_SIZE,
        "orderedDate",
        "asc"
      );
      // we used async-awit function so we have to handle with the help of try and catch
      console.log(data);
      // if it is the first page then load the first page data and set it
      if(currentPage === 0){
        setOrdersData(data);
      }
      else{
        setOrdersData({
          content: [...ordersData.content , ...data.content], // first added orders then coming data we added after that 
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalElement: data.totalElement,
          totalPages: data.totalPages,
        });
      }
    } catch (e) {
      console.log("error occured");
      console.log(e);
    }
  };

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const formatDate = (time) =>{
        // let todaydate =  new Date(time).toLocaleDateString();
        return today.toLocaleDateString("hi-IN", options)
    }

  const showOrders = ()=>{
    return selectedOrdersData && (
      <>
        <Modal animation={false} size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {/* {JSON.stringify({ordersData})} */}
            <Modal.Title><h3>Order Details</h3></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Row>
                <Col>
                    <b>Order id : </b> {selectedOrdersData.orderId}
                </Col>
                <Col >
                    <b>Billing Name : </b> {selectedOrdersData.billingName}
                </Col>
          </Row>
          <Row className="mt-4">
                    <Col>
                        <Table bordered striped>
                            <tbody>
                                <tr>
                                    <td>
                                        Billing Phone
                                    </td>
                                    <td className="fw-bold">
                                        {selectedOrdersData.billingPhone}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Billing Address
                                    </td>
                                    <td className="fw-bold">
                                        {selectedOrdersData.billingAddress}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Items
                                    </td>
                                    <td className="fw-bold">
                                        {selectedOrdersData.orderItems.length}
                                    </td>
                                </tr>
                                <tr className={selectedOrdersData.payementStatus === 'PAID' ? 'table-success' : 'table-danger'}>
                                    <td>
                                        Payement Status
                                    </td>
                                    <td className="fw-bold">
                                        {selectedOrdersData.payementStatus}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Order Status
                                    </td>
                                    <td className="fw-bold">
                                        {selectedOrdersData.orderStatus}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Order Date
                                    </td>
                                    <td className="fw-bold">
                                        {formatDate(selectedOrdersData.orderedDate)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Orderded Amount
                                    </td>
                                    <td className="fw-bold">
                                       ₹{selectedOrdersData.orderAmount} 
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Card>
                          <Card.Body>
                            <h3>Order Items</h3>
                            <ListGroup>
                              {
                                selectedOrdersData.orderItems?.map((item)=>{
                                  return (<ListGroupItem className="mt-3" key={item.orderItemId}>
                                    <p className="text-muted"><b>Product Id :</b>{(item.product.pId)}</p>
                                    <Row>
                                      <Col md={2}>
                                        <img style={{
                                          width:'40px'
                                        }} src={getProductImage(item.product.pId)} alt="NO_IMAGE"></img>
                                      </Col>
                                      <Col md={10}>
                                        <h5>{item.product.title}</h5>
                                        <Badge pill >Quantity : {item.quantity}</Badge>
                                        <Badge pill bg="danger" className="ms-3">Amount : ₹{item.totalprice}</Badge>
                                      </Col>
                                    </Row>
                                  </ListGroupItem>)
                                })
                              }
                            </ListGroup>
                          </Card.Body>
                        </Card>
                    </Col>
                </Row>
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
      </>
    );
  }

  const loadNextPage = () => {
    console.log("loading next page");
    setCurrentPage(currentPage + 1);
  };

  const orderView = () => {
    return ordersData && (
      <>
        <Card className="shadow-sm">
          <CardHeader>
            <h3 className="text-center my-4">All Orders is here</h3>
          </CardHeader>
          <Card.Body >
            <InfiniteScroll
            dataLength={ordersData.content.length}
            next={loadNextPage}
            hasMore={!ordersData.lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            >
            {
                ordersData?.content.map((e)=>{
                    return (
                        <SingleOrderView key={e.orderId} order={e} openOrderViewModel = {openOrderViewModel}/>
                    )
                    
                })
            }
            </InfiniteScroll>
          </Card.Body>
        </Card>
      </>
    );
  };
  return (
    <>
      <Container>
        <Row>
          <Col>{ordersData && orderView()}</Col>
          {
              showOrders()
          }
        </Row>
      </Container>
    </>
  );
};

export default ViewOrders;
