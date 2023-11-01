import React, { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { successfulPayment } from "../../service/payment";
import { Button, Container } from "react-bootstrap";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const obj = useParams();
  console.log(obj);
  const payment_Id = searchParams.get("razorpay_payment_id");
  const orderId = obj.orderId;

  useEffect(() => {
    getPaymentLocal(payment_Id, orderId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getPaymentLocal = (payment_Id, orderId) => {
    successfulPayment(payment_Id, orderId)
      .then((resp) => {
        console.log("order details Updated");
        return;
      })
      .catch((error) => {
        console.log("some error occured");
      });
  };

  const loader = () => {
    return (
      <>
        <Container>
          <div className="text-center">
            <div className="box">
              <div className="success alert">
                <div className="alert-body">
                  <b>Payment Successfully Done ! </b>
                  <h6>Thanks For Purchaseing This Order..</h6>
                  <h6>Go back to your Order to view the Updates!!..</h6>
                  <Container className="text-center">
                    <Button variant="warning" as={Link} to={`/users/orders`}>
                      Orders
                    </Button>
                    <Button
                      variant="info"
                      as={Link}
                      to={"/contact"}
                      className="ms-2"
                    >
                      Feedback
                    </Button>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  };

  return (
    <div>
      <h1>{searchParams.get("razorpay_payment_id")}</h1>
      <h1>{obj.orderId}</h1>
      {loader()}
    </div>
  );
};

export default PaymentSuccess;
