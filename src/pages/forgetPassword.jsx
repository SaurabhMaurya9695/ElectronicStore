import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { sendForgetPasswordOtp } from "../service/user.service";
import * as EmailValidator from 'email-validator';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [forgetEmail, setForgetEmail] = useState({
    email: "",
  });

  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [color, setColor] = useState(null);
// eslint-disable-line react-hooks/exhaustive-deps
  const EMAIL_REGEX = new RegExp(/^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+\\.)+[a-z]{2,5}$/); 

  const sendOtp = () => {
    console.log(forgetEmail);
    if (EMAIL_REGEX.test(forgetEmail.email) === false) {
      toast.error("Invalid Email Addresss !!", {
        position: "bottom-center",
        duration: 5000,
      });
      return;
    }

    setClicked(true);
    // email validation done

    let timerInterval;
    Swal.fire({
      title: "Sending OTP",
      html: "We are redirecting you to Verfiy-Otp Page in <b></b> milliseconds. It Might take time Please Wait",
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
        if(EmailValidator.validate(forgetEmail.email) === false){
          Swal.fire("OOPS!!" , "Email not valid!!.." , 'error');
          return;
        }
        sendForgetPasswordOtp(forgetEmail.email)
          .then((resp) => {
            console.log(resp);
            Swal.fire("OTP send successfully .. check your email");
            setColor("success");
            navigate("/verify-otp");
          })
          .catch((error) => {
            console.log(error);
            setColor("danger");
            toast.error("Some Error Occured !!..try again");
          });
      }
    });

    // sendForgetPasswordOtp(forgetEmail.email)
    //   .then((resp) => {
    //     console.log(resp);
    //     setColor('success');
    //     toast.success(<><b>OTP send Successfully..Hold we are sending you to verify-otp page</b></>);
    //     setTimeout(() => {
    //         navigate("/verify-otp");
    //     }, 3000);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setColor("danger");
    //     toast.error("Some Error Occured !!");
    //   });
  };

  const showOtpForm = () => {
    return (
      <>
        <Card className="my-2 border-0 shadow">
          <Card.Body>
            <div className="text-center mb-2">
              <Alert
                show={clicked}
                variant={color === null ? "success" : color}
                style={{
                  width: "100%",
                  height: "58px",
                  fontSize: "15px",
                  fontWeight: "10px",
                }}
                dismissible
                onClose={() => setClicked(false)}
              >
                {color === "danger" ? (
                  <>Failed To send OTP..Try Again!</>
                ) : (
                  <>We have send OTP to your email </>
                )}
              </Alert>
            </div>
            <div>
              <Form>
                <FormGroup>
                  <div className="text-center mb-2">
                    <b>Enter Your Registered Email !!</b>
                  </div>
                  <FormControl
                    type="email"
                    placeholder="Enter Your Email"
                    value={forgetEmail.email}
                    onChange={(event) => {
                      setForgetEmail({
                        ...forgetEmail,
                        email: event.target.value,
                      });
                    }}
                  />
                </FormGroup>
              </Form>
              <Container className="text-center mt-4">
                <Button variant="info" onClick={(event) => sendOtp()}>
                  Send OTP
                </Button>
              </Container>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  };

  const forget = () => {
    return (
      <>
        <Container className="mt-4">
          <Row>
            <Col
              md={{
                span: 6,
                offset: 3,
              }}
            >
              {showOtpForm()}
            </Col>
          </Row>
        </Container>
        <Toaster />
      </>
    );
  };

  return <div>{forget()}</div>;
};

export default ForgetPassword;
