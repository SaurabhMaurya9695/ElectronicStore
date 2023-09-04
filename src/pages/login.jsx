import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../components/user/Base";
import { LoginUser } from "../service/user.service";

const Login = () => {

let [data, setdata] = useState({
    email: '',
    password: '',
});

let [error ,setError] = useState({
    errorData : null ,
    isError : false
})

let [loading , setLoading ] = useState(false);

const handleChange = (event, property) => {
    setdata({
      ...data,
      [property]: event.target.value,
    });
  };

  const cleardata = () => {
    setdata({
      email: '',
      password: '',
    });
  };

  const submitForm = (event)=>{
    event.preventDefault();
    console.log(data);

    if (!data.email  || data.email.trim() === '') {
        toast.error("Email is Required");
        return;
    }

    if (!data.password  || data.password.trim() === '') {
        toast.error("Password is Required");
        return;
    }

    // if everything is correct then submit form 
    setLoading(true);
    LoginUser(data).
    then((userData)=>{
        console.log(userData);
        toast.success("Logged in Successfully");
        setError({
            errorData:null,
            isError:false
        })
    }).catch((error)=>{
        console.log(error);
        toast.error("Something error occeured")
        setError({
            errorData:error,
            isError:true
        })
    }).finally(()=>{
        setLoading(false);
    })

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
                  Electronic Store Login here
                </h3>
                <Form noValidate onSubmit={submitForm}>
                    {JSON.stringify(data)}
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
                      Create Account !!  <NavLink to="/register"> Register Here!!</NavLink>
                    </p>
                    <p>
                      Forget password !!  <NavLink to="/forget"> Click Here!!</NavLink>
                    </p>
                  </Container>
                  <Container className="text-center">
                    <Button variant="success" type="submit" >
                      <span>Login Here</span>
                    </Button>
                    <Button
                      variant="danger"
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
