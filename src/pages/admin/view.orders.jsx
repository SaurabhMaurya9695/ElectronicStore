import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import SingleOrderView from "../../components/admin/SingleOrderView";
import { ADMIN_ORDER_PAGE_SIZE } from "../../service/helper.service";
import { getAllOrders } from "../../service/order.service";

const ViewOrders = () => {
  const [ordersData, setOrdersData] = useState(undefined);

  useEffect(() => {
    getAllOrdersLocally();
  }, []);

  const getAllOrdersLocally = async () => {
    try {
      let data = await getAllOrders(
        0,
        ADMIN_ORDER_PAGE_SIZE,
        "orderedDate",
        "asc"
      );
      // we used async-awit function so we have to handle with the help of try and catch
      console.log(data);
      setOrdersData(data);
    } catch (e) {
      console.log("error occured");
      console.log(e);
    }
  };

  const orderView = () => {
    return (
      <>
        <Card className="shadow-sm">
          <CardHeader>
            <h3 className="text-center my-4">All Orders is here</h3>
          </CardHeader>
          <Card.Body >
            {
                ordersData?.content.map((e)=>{
                    return (
                        <SingleOrderView order={e}/>
                    )
                    
                })
            }
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
        </Row>
      </Container>
    </>
  );
};

export default ViewOrders;
