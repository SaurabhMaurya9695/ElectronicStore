import { useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  FormLabel,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Base from "../components/user/Base";
import { registerUser } from "../service/user.service";

const Register = () => {
  let [data, setdata] = useState({
    name: '',
    email: '',
    password: '',
    conpassword: '',
    gender: '',
    about: '',
  });

  const handleChange = (event, property) => {
    setdata({
      ...data,
      [property]: event.target.value,
    });
  };

  const clearData = () => {
    setdata({
      name: '',
      email: '',
      password: '',
      conpassword: '',
      gender: '',
      about: '',
    });
  };

  const [errorDate, setErrorData] = useState({
    isError: false,
    errorData: null,
  });

  const submitForm = (event) => {
    event.preventDefault(); //Mandatory hai..otherwise after submitting your data will be clear
    console.log(data);
    // here you can use validation

    if (!data.name  || data.name.trim() === '') {
      toast.error("Name is Required");
      return;
    }

    if (!data.email  || data.email.trim() === '') {
      toast.error("Email is Required");
      return;
    }

    if (!data.password  || data.password.trim() === '') {
      toast.error("Password is Required");
      return;
    }

    if (!data.conpassword  || data.conpassword.trim() === '') {
      toast.error("Confirm Password is Required");
      return;
    }

    if (data.password !== data.conpassword) {
      toast.error("Password not matched!!");
      return;
    }

    console.log("line 79")
    registerUser(data)
      .then((userData) => {
        console.log(userData);
        toast.success("Registered Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in creating user !! Try Again  ");
      });
  };

  const registerForm = () => {
    return (
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <Card
              className="my-2 border-0 shadow"
              style={{
                position: "relative",
                top: "-30px",
              }}
            >
              {/* {JSON.stringify(data)} */}
              <Card.Body>
                <h3 className="text-muted text-center">
                  ELectronic Store Signup here
                </h3>
                <Form onSubmit={submitForm}>
                  {/* Name Field */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Name"
                      onChange={(event) => handleChange(event, "name")}
                      value={data.name}
                    />
                  </Form.Group>

                  {/* Email Field */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter Your Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      onChange={(event) => handleChange(event, "email")}
                      value={data.email}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>

                    {/* PasswordSection  */}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword1">
                    <Form.Label>Enter New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter New password"
                      onChange={(event) => handleChange(event, "password")}
                      value={data.password}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter New password"
                      onChange={(event) => handleChange(event, "conpassword")}
                      value={data.conpassword}
                    />
                  </Form.Group>

                  {/* Gender section  */}
                  <Form.Group className="mb-3" controlId="gender1">
                    <FormLabel>Select Your Gender</FormLabel>
                    <div>
                      <Form.Check
                        inline
                        name="gender"
                        label="Male"
                        type={"radio"}
                        id={`male`}
                        value={"male"}
                        checked={data.gender === "male"}
                        onChange={(event) => handleChange(event, "gender")}
                      />
                      <Form.Check
                        inline
                        name="gender"
                        label="Female"
                        type={"radio"}
                        id={`female`}
                        value={"female"}
                        checked={data.gender === "female"}
                        onChange={(event) => handleChange(event, "gender")}
                      />
                    </div>
                  </Form.Group>
                  {/* AboutSection  */}
                  <FloatingLabel
                    controlId="formtext"
                    label="Write About Yourself"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Write something about yourself here!!"
                      style={{ height: "100px" }}
                      onChange={(event) => handleChange(event, "about")}
                      value={data.about}
                    />
                  </FloatingLabel>

                  <Container>
                    <p>
                      Already register <a href="/login">Login Here!!</a>{" "}
                    </p>
                  </Container>
                  <Container className="text-center">
                    <Button variant="success" type="submit">
                      {" "}
                      Register
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={clearData}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Base
      title="This is Register Page "
      discription="If you have already account then click here"
      btnlink="/login"
      buttonText="Login Here!!"
      buttonType="btn-color1"
      buttonEnable="true"
    >
      {registerForm()}
    </Base>
  );
};

export default Register;
