import { useEffect } from "react";
import { useState } from "react";
import { Badge, Button, Card, Col, Container, Form, FormControl, FormLabel, FormSelect, ListGroup, ListGroupItem, Modal, Row, Table } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import SingleOrderView from "../../components/admin/SingleOrderView";
import { ADMIN_ORDER_PAGE_SIZE, getProductImage } from "../../service/helper.service";
import { getAllOrders, updateOrder } from "../../service/order.service";

const ViewOrders = () => {
  const [ordersData, setOrdersData] = useState(undefined);
  const [selectedOrdersData, setSelectedOrdersData] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const [updateOrderData, setUpdateOrderData] = useState(undefined);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleshow= () => setShow(true);
  const openOrderViewModel = (event , order) => {
    setSelectedOrdersData({...order})
    handleshow();
  }

  //UpdateOrderDetails 
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const handleUpdateModelClose = () => setShowUpdateModel(false);
  const handleUpdateModelshow= () => setShowUpdateModel(true);
  const openEditOrderModel = (event , order) => {
    setUpdateOrderData({...order})
    handleUpdateModelshow();
  }
  //UpdateOrderDetails closed

  useEffect(() => {
    getAllOrdersLocally();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentPage > 0) {
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
  }; // eslint-disable-line react-hooks/exhaustive-deps

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const formatDate = (time) =>{
        // let todaydate =  new Date(time).toLocaleDateString();
        return today.toLocaleDateString("hi-IN", options)
    }

    const formatDate1 = (time) =>{
      return new Date(time).toLocaleDateString();
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

  const updateOrderForm= async (event)=>{
    event.preventDefault();
    console.log(updateOrderData);
    if(updateOrderData.billingName.trim() === '' || updateOrderData.billingName === undefined){
      toast.error("Billing Name Required");
      return ;
    }
    if(updateOrderData.billingAddress.trim() === '' || updateOrderData.billingAddress === undefined){
      toast.error("Billing Address Required");
      return ;
    }
    if(updateOrderData.billingPhone.trim() === '' || updateOrderData.billingPhone === undefined ){
      toast.error("Billing Address Required");
      return ;
    }
    if(updateOrderData.billingPhone.length < 10){
      toast.error("Phone Number Must Be of Length 10");
      return ;
    }
    try{
      const data = await updateOrder(updateOrderData.orderId ,updateOrderData);
      console.log(data);
      let newArray = ordersData.content.map((p) => {
        if(p.orderId === data.orderId) return data;
        else{
          return p;
        }
      });
      setOrdersData({
        ...ordersData,
        content: newArray,
      });
      handleUpdateModelClose();
      toast.success("Order Updated Successfully");
      
    }
    catch(e){
      console.log(e);
      toast.error("Some Error Occured");
    }
  }

  const updateOrders = ()=>{
    return updateOrderData && (
      <>
        <Modal animation={false} size="lg" show={showUpdateModel} onHide={handleUpdateModelClose}>
          <Modal.Header closeButton>
            <Modal.Title><h5 className="text-center">Update Your Order Details</h5></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className="border border-0 shadow">
              <Card.Body>
                <Form>
                <Form.Group>
                        <FormLabel >Billing Name</FormLabel>
                        <FormControl
                        type="text"
                        value={updateOrderData.billingName}
                        onChange={(event)=> setUpdateOrderData({
                          ...updateOrderData,
                          billingName:event.target.value
                        })}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <FormLabel>Billing Phone</FormLabel>
                        <FormControl
                        type="text"
                        value={updateOrderData.billingPhone}
                        onChange={(event)=> setUpdateOrderData({
                          ...updateOrderData,
                          billingPhone:event.target.value
                        })}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <FormLabel>Billing Address</FormLabel>
                        <FormControl
                        as={'textarea'}
                        rows={3}
                        type="text"
                        value={updateOrderData.billingAddress}
                        onChange={(event)=> setUpdateOrderData({
                          ...updateOrderData,
                          billingAddress:event.target.value
                        })}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <FormLabel>Payement Status</FormLabel>
                        <FormSelect onChange={(event)=> setUpdateOrderData({
                          ...updateOrderData,
                          payementStatus:event.target.value
                        })}>
                            <option selected={updateOrderData.payementStatus !== 'PAID' } value="NOT PAID">NOT PAID</option>
                            <option selected={updateOrderData.payementStatus === 'PAID'} value="PAID">PAID</option>
                        </FormSelect>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <FormLabel>Order Status</FormLabel>
                        <FormSelect onChange={(event)=> setUpdateOrderData({
                          ...updateOrderData,
                          orderStatus:event.target.value
                        })}>
                            <option selected={updateOrderData.orderStatus === 'PENDING'} value="PENDING">PENDING</option>
                            <option selected={updateOrderData.orderStatus === 'DISPATCHED'} value="DISPATCHED">DISPATCHED</option>
                            <option selected={updateOrderData.orderStatus === 'ACCEPTED'} value="DELIVERED">DELIVERED</option>
                            <option selected={updateOrderData.orderStatus === "NOT_ACCEPTED" } value="ONTHEWAY">ONTHEWAY</option>
                        </FormSelect>
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Form.Label  >Select Date</Form.Label>
                      <Form.Control type="text"  value={updateOrderData.deliveredDate} 
                      onChange={(event)=> setUpdateOrderData({
                        ...updateOrderData,
                        deliveredDate:event.target.value
                      })} />
                      <p className="text-muted">Format Date : YYYY-MM-DD</p>
                    </Form.Group>

                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUpdateModelClose}>
              Close
            </Button>
            <Button  onClick={updateOrderForm} variant="primary" >
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
                        <SingleOrderView key={e.orderId} order={e} openOrderViewModel = {openOrderViewModel} openEditOrderModel = {openEditOrderModel}/>
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
          {
            updateOrders()
          }
        </Row>
      </Container>
    </>
  );
};

export default ViewOrders;
