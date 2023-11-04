import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  const loader = () => {
    return (
      <>
        <Container>
          <div className="text-center">
            <div className="box">
              <div className="error alert">
                <div className="alert-body">
                  <b>Payment Verification Failed ! </b>
                  <h6>Go back to your Order and Try Again!!..</h6>
                  <h6>For any queries fill the feedback form .</h6>
                  <h6>We will reach out to you..</h6>
                  <strong>Thanks</strong>
                  <Container className="text-center mt-2">
                    <Button variant="warning" as={Link} to={`/users/orders`}>
                      Orders
                    </Button>
                    <Button
                      variant="info"
                      as={Link}
                      to={"/contact"}
                      className="ms-2"
                      size="sm"
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
  return <div>{loader()}</div>;
};

export default PaymentFailed;
