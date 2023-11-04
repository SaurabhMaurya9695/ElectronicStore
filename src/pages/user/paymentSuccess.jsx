import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { successfulPayment } from "../../service/payment";
import { Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [showLoader  , setShowLoader] = useState(false);
  const obj = useParams();
  const redirect = useNavigate();
  console.log(obj);
  const RZP_PAYMENT_ID = searchParams.get("razorpay_payment_id");
  const RZP_SIGNATURE_ID = searchParams.get("razorpay_signature");
  const RZP_ORDER_ID = searchParams.get("razorpay_order_id");
  const User_ORDERID = obj.orderId;

  useEffect(() => {
    getPaymentLocal(
      RZP_PAYMENT_ID,
      RZP_SIGNATURE_ID,
      RZP_ORDER_ID,
      User_ORDERID
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getPaymentLocal = (
    RZP_PAYMENT_ID,
    RZP_SIGNATURE_ID,
    RZP_ORDER_ID,
    User_ORDERID
  ) => {
    let timerInterval;
    Swal.fire({
      title: "Please Hold On We Are verifying Your Payment",
      html: " We are redirecting you in <b></b> milliseconds.",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        successfulPayment(
          RZP_PAYMENT_ID,
          RZP_SIGNATURE_ID,
          RZP_ORDER_ID,
          User_ORDERID
        )
          .then((resp) => {
            setShowLoader(true);
            return;
          })
          .catch((error) => {
            Swal.fire("OOPS!!!!", "Payment Verification Failed", "error");
            redirect('/users/payment-failed')
            return;
          });
      }
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

  return <div>{showLoader ? loader() : ''}</div>;
};

export default PaymentSuccess;
