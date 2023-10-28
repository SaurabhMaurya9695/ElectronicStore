import { useContext, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../components/user/Base";
import { LoginUser } from "../service/user.service";
import UserContext from "../context/user.context"
const Login = () => {

  const userContext = useContext(UserContext);

  const redirect =useNavigate();
  let [data, setdata] = useState({
    email: "",
    password: "",
  });

  let [error, setError] = useState({
    errorData: null,
    isError: false,
  });

  let [loading, setLoading] = useState(false);

  const handleChange = (event, property) => {
    setdata({
      ...data,
      [property]: event.target.value,
    });
  };

  const cleardata = () => {
    setdata({
      email: "",
      password: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(data);

    if (!data.email || data.email.trim() === "") {
      toast.error("Email is Required");
      return;
    }

    if (!data.password || data.password.trim() === "") {
      toast.error("Password is Required");
      return;
    }

    // if everything is correct then submit form
    setLoading(true);
    LoginUser(data)
      .then((userData) => {
        console.log(userData);
        toast.success("Logged in Successfully");
        setError({
          errorData: null,
          isError: false,
        });

        // if successfully login then redirect to the page of admin or normal user
        // before redirecting assign data to context ;
        /*
        userContext.setUserData(userData);
        userContext.setIsLogin(true);
        */

        userContext.login(userData);
        redirect("/users/home");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        setError({
          errorData: error,
          isError: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let styleButton ={
    backgroundColor: "#0B0C10 !important",
    borderColor: "#66fcf1 !important",
    color : "#C5C6C7 !important",
}
  let loginPage = () => {
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
              <Card.Body>
                <div className="text-center mb-2">
                  <img
                    src="/assest/Logo.jpeg"
                    alt="logo"
                    height={80}
                    width={80}
                  ></img>
                </div>
                <h3 className="text-muted text-center">
                  AapkiDukaan Login here
                </h3>
                {/* {JSON.stringify(userContext)} */}
                <Alert
                  onClose={() =>
                    setError({
                      isError: false,
                      errorData: null,
                    })
                  }
                  dismissible
                  variant="danger"
                  show={error.isError}
                >
                  {" "}
                  {error.errorData?.response?.data?.message}{" "}
                </Alert>
                <Form noValidate onSubmit={submitForm}>
                  {/* {JSON.stringify(data)} */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter Your Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      onChange={(event) => handleChange(event, "email")}
                      value={data.email}
                      //   isInvalid={errorData.errorData?.response?.data?.email}
                    />
                    {/* <Form.Control.Feedback type="invalid">
                      {errorData.errorData?.response?.data?.email}
                    </Form.Control.Feedback> */}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Enter Your Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your password"
                      onChange={(event) => handleChange(event, "password")}
                      value={data.password}
                      //   isInvalid={errorData.errorData?.response?.data?.password}
                    />
                    {/* <Form.Control.Feedback type="invalid">
                      {errorData.errorData?.response?.data?.password}
                    </Form.Control.Feedback> */}
                  </Form.Group>
                  <Container className="text-center">
                    <p>
                      Create Account !!{" "}
                      <NavLink to="/register"> Register Here!!</NavLink>
                    </p>
                    <p>
                      Forget password !!{" "}
                      <NavLink to="/forget"> Click Here!!</NavLink>
                    </p>
                  </Container>
                  <Container className="text-center">
                    <Button style={styleButton} type="submit">
                    <Spinner animation="grow" size="sm" className="me-2" hidden={!loading}/>
                      <span hidden={loading} >Login Here</span>
                      <span hidden={!loading} >Wait..</span>
                    </Button>
                    <Button
                      style={styleButton}
                      className="ms-2"
                      onClick={cleardata}
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
      title="This is Login Page "
      discription="For create Account click here"
      btnlink="/register"
      buttonText="Register Here!!"
      buttonType="btn-color1"
      buttonEnable="true"
    >
      {loginPage()}
    </Base>
  );
};

export default Login;
