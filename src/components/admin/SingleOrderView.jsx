import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleOrderView =({order , openOrderViewModel , openEditOrderModel})=>{
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const formatDate = (time) =>{
        // let todaydate =  new Date(time).toLocaleDateString();
        return today.toLocaleDateString("hi-IN", options)
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
                    <Button className="ms-2" onClick={(event)=>{
                        openEditOrderModel(event,order)
                    }} size="sm" variant="warning">Update Order</Button>
                </Container>
            </Card.Body>
        </Card>
    </>)
}

export default SingleOrderView;