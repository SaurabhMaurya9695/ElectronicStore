
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/user.context';
import { getOrderOfUser } from '../../service/order.service';
import { Badge, Button, Card, Col, Container, ListGroup, ListGroupItem, Modal, Row, Table } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import SingleOrderView from '../../components/admin/SingleOrderView';
import { getProductImage } from '../../service/helper.service';
import { Link } from 'react-router-dom';

const Order = () => {

  const {userData ,isLogin} = useContext(UserContext);
  const [ordersData , setOrdersData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedOrdersData, setSelectedOrdersData] = useState(undefined);
  const handleClose = () => setShow(false);
  const handleshow= () => setShow(true);
  const openOrderViewModel = (event , order) => {
    setSelectedOrdersData({...order})
    handleshow();
  }

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
  const formatDate1 = (time) =>{
    return new Date(time).toLocaleDateString();
  }
  const formatDate = (time) =>{
    // let todaydate =  new Date(time).toLocaleDateString();
    return today.toLocaleDateString("hi-IN", options)
  }

  useEffect(()=>{
    getUserOrder(userData.userDto.userId);
  },[userData.userDto.userId]);

  const getUserOrder = (userId)=>{
    getOrderOfUser(userId).then((resp)=>{
      console.log(resp);
      setOrdersData(resp);
    }).catch((error)=>{
      console.log(error);
    })
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
                    <b>Order By : </b> {selectedOrdersData.user.name}
                </Col>
          </Row>
          <Row className="mt-4">
                    <Col>
                        <Table bordered striped>
                            <tbody>
                              <tr>
                                    <td>
                                    Billing Name
                                    </td>
                                    <td className="fw-bold">
                                    {selectedOrdersData.billingName}
                                    </td>
                                </tr>
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
                                        Deliverd Date
                                    </td>
                                    <td className="fw-bold">
                                        {formatDate1(selectedOrdersData.deliveredDate)}
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
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  



  const orderView = () => {
    return ordersData && (
      <>
        <Card className="shadow-lg border-0">
          <CardHeader>
            <h5 className="text-center my-4 text-muted">AapkiDukaan's  Orders</h5>
          </CardHeader>
          <Card.Body >
            {
                ordersData?.map((e)=>{
                    return (
                        <SingleOrderView key={e.orderId} order={e} openOrderViewModel = {openOrderViewModel}/>
                    )
                    
                })
            }
          </Card.Body>
        </Card>
      </>
    );
  };

  const emptyCartView = () =>{
    return isLogin && (<>
        <Card  className="text-center shadow-sm border-0 mt-3">
          <Card.Body>
            <div  className="text-center">
              <div className="mt-2 text-center">
                <img src="/assest/cartEmpty.png" alt="cartEmpty"  style={{
                  width:"30%",
                  objectFit:"contain"
                }}></img>
              </div>
              <h2>You Don't have any Order.</h2>
              <div>
                <Button variant="warning" as={Link} to={`/store`} > Shop Now</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
    </>)
  }

  return ordersData && (
    <div>
      <Container className='mt-2'>
        <Row>
          <Col md={{
            span:8,
            offset:2
          }}>
            {orderView()}
            {selectedOrdersData ?  showOrders() : emptyCartView()}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Order
