import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import { verifyOtpServerSide } from "../service/user.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const VerifyPassword = () => {
  const [otp, setOtp] = useState(undefined);

  const navigate = useNavigate();

  const verifyOtpFun = () => {
    console.log(otp);

    verifyOtpServerSide(otp)
      .then((resp) => {
        console.log(resp);
        if (
          resp.message === "User Not Found With This Email" ||
          resp.message === "OTP NOT MATCHED"
        ) {
          toast.error(resp.message, {
            closeOnClick: true,
            position: "bottom-center",
          });
          navigate("/login");
        } else {
          //OTP MATCHED
          let timerInterval;
          Swal.fire({
            title: "Matching OTP",
            html: "We are redirecting you to change Password Page in <b></b> milliseconds. It Might take time Please Wait",
            timer: 5000,
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
              Swal.fire(resp.message);
              navigate("/reset-password");
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(error.response?.data.message);
        navigate("/login");
      });
  };

  const verifyOtp = () => {
    return (
      <>
        <Card className="my-2 border-0 shadow">
          <Card.Body>
            <div>
              <Form>
                <FormGroup>
                  <div className="text-center mb-2">
                    <b>Enter Your OTP</b>
                  </div>
                  <FormControl
                    type="text"
                    placeholder="Enter Your OTP"
                    onChange={(event) => {
                      setOtp(event.target.value);
                    }}
                  />
                </FormGroup>
              </Form>
              <Container className="text-center mt-4">
                <Button variant="info" onClick={(event) => verifyOtpFun()}>
                  Verify OTP
                </Button>
              </Container>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <div>
      <Container className="mt-3 text-center">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>{verifyOtp()}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerifyPassword;
