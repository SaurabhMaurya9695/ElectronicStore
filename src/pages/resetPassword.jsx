import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { resetPasswordServerSide } from "../service/user.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [pass, setPass] = useState({
    pass1: "",
    pass2: "",
  });

  const navigate = useNavigate();

  const changePasswordFunction = () => {
    console.log(pass);
    if (pass.pass1 !== pass.pass2) {
      toast.error(
        <>
          <b>Password Not Matched</b>
        </>
      );
      return;
    } else {
      if (pass.pass1 === "" && pass.pass1 === pass.pass2) {
        toast.error(
          <>
            <b>Can't Make the Password as empty</b>
          </>
        );
        return;
      } else if (pass.pass1.length < 8) {
        toast.error(
          <>
            <b>Password length should be of 8 .</b>
          </>
        );
        return;
      } else {
        let timerInterval;
        Swal.fire({
          title: "Password Change",
          html: "If Everything Working Fine then we are redirecting you to login page in <b></b> milliseconds. It Might take time Please Wait",
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
            resetPasswordServerSide(pass.pass1)
              .then((data) => {
                console.log(data);
                Swal.fire(
                  "PassWord Change Successfully ",
                  "Login With New Password Now!!",
                  "success"
                );
                navigate("/login");
              })
              .catch((error) => {
                console.log("Some Error Occured !! ", " Try Again", "error");
                navigate("/forget");
              });
          }
        });

        return;
      }
    }
  };
  const changePassword = () => {
    return (
      <>
        <Toaster duration="5000" />
        <Card>
          <Card.Body>
            <div className="text-center text-muted">
              <h3>Password Reset Form </h3>
            </div>
            <Form>
              <FormGroup>
                <FormLabel>Enter New Password </FormLabel>
                <FormControl
                  type="password"
                  placeholder="Enter New Password Here !"
                  value={pass.pass1}
                  onChange={(event) => {
                    setPass({
                      ...pass,
                      pass1: event.target.value,
                    });
                  }}
                ></FormControl>
              </FormGroup>
              <FormGroup className="mt-3">
                <FormLabel>Confirm New Password </FormLabel>
                <FormControl
                  type="password"
                  placeholder="Confirm New Password Here !"
                  value={pass.pass2}
                  onChange={(event) => {
                    setPass({
                      ...pass,
                      pass2: event.target.value,
                    });
                  }}
                ></FormControl>
              </FormGroup>
            </Form>

            <Container className="text-center mt-3">
              <Button
                variant="danger"
                size="sm"
                onClick={(event) => changePasswordFunction()}
              >
                Reset Password Now
              </Button>
            </Container>
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="mt-3 p-5">
            {changePassword()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
