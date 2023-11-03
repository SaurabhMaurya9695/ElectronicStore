import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../../context/user.context";
import { useContext } from "react";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CardHeader from "react-bootstrap/esm/CardHeader";
import { startPayement } from "../../service/payment";

const SingleOrderView =({order , openOrderViewModel , openEditOrderModel})=>{
    const { userData} = useContext(UserContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const payData = {
      orderId : '' ,
      amount : '' ,
      userId : ''
    };

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const formatDate = (time) =>{
        // let todaydate =  new Date(time).toLocaleDateString();
        return today.toLocaleDateString("hi-IN", options)
    }

    const startPayementLocally = (id , price)=>{
      console.log("ok")
      payData.orderId = id
      payData.amount = price
      payData.userId = userData.userDto.userId
      console.log(payData);
      startPayement(payData).then((resp)=>{
        console.log(resp);
        //we have a payment link now ;
        if(resp.payment_url !== ''){
          // window.open(resp.payment_url, "_blank");
          window.location.href = resp.payment_url
        }
      }).catch((error)=>{
        console.log(error);
      })
    }

    const openModalPay =()=> {
        return (
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title className="text-muted h5">Pay Here For Your Order </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-muted">
                    <h6>Price Details</h6>
                  </CardHeader>
                  <Card.Body>
                    <Row>
                      <Col >
                        <p>Price : (items) </p>
                      </Col>
                      <Col className="text-end" >₹{order.orderAmount}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <p>Delivery Charges</p>
                      </Col>
                      <Col  className="me-1 text-end">
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
                      <Col className="text-end">
                        <p>
                          <b>₹{order.orderAmount}</b>
                        </p>
                      </Col>
                    </Row>
                    
                  </Card.Body>
                </Card>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Pay Later
                </Button>
                <Button variant="primary" onClick={(event) => startPayementLocally(order.orderId , order.orderAmount)}>
                  Pay Now !!
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
    }
    return (<>
        <Card className="border border-o shadow-sm mb-3 mx-2">
            <Card.Body >
                <Row>
                    <Col>
                        <b>Order id : </b> {order.orderId}
                    </Col>
                    <Col >
                        <b>Ordered By : </b> <Link style={{
                            textDecoration: "none",
                            color: "grey"
                        }} to={`/users/profile/${order.user.userId}`}>{order.user.name}</Link>
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
                                        {order.billingName}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Billing Phone
                                    </td>
                                    <td className="fw-bold">
                                        {order.billingPhone}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Billing Address
                                    </td>
                                    <td className="fw-bold">
                                        {order.billingAddress}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Items
                                    </td>
                                    <td className="fw-bold">
                                        {order.orderItems.length}
                                    </td>
                                </tr>
                                <tr className={order.payementStatus === 'PAID' ? 'table-success' : 'table-danger'}>
                                    <td>
                                        Payement Status
                                    </td>
                                    <td className="fw-bold">
                                        {order.payementStatus}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Order Status
                                    </td>
                                    <td className="fw-bold">
                                        {order.orderStatus}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Order Date
                                    </td>
                                    <td className="fw-bold">
                                        {formatDate(order.orderedDate)}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Container className="text-center">
                    <Button onClick={(event)=>{
                        openOrderViewModel(event,order)
                    }} size="sm" variant="info">Order Details</Button>
                    { openEditOrderModel !== null  ? 
                        <Button className="ms-2" onClick={(event)=>{
                            openEditOrderModel(event,order)
                        }} size="sm" variant="warning">Update Order</Button> : ''
                    }
                    { order.payementStatus !=='PAID' && 
                        <Button className="ms-2" size="sm" variant="warning" onClick={handleShow}> Pay Now </Button>
                    }
                </Container>
            </Card.Body>
        </Card>
        {
            openModalPay()
        }
    </>)
}

export default SingleOrderView;