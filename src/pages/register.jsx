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
  Spinner,
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

  const [errorData, setErrorData] = useState({
    isError: false,
    errorData: null,
  });


  const[loading , setLoading] = useState(false);


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
    setErrorData({
      isError:false,
      errorData:null
    })
  };


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

    setLoading(true);
    registerUser(data)
      .then((userData) => {
        console.log(userData);
        toast.success("Registered Successfully with id :" + userData.userId);
      })
      .catch((error) => {
        //it means error comes ;
        console.log(error);
        setErrorData({
          isError:true ,
          errorData : error
        })
        //console.log(errorData.errorData?.response?.data)
        toast.error("Error in creating user !! Try Again  ");
      })
      .finally(() => {
        setLoading(false);
      })
  };

  let styleButton ={
    backgroundColor: "#0B0C10 !important",
    borderColor: "#66fcf1 !important",
    color : "#C5C6C7 !important",
}
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
              
              <Card.Body>
              <div className="text-center mb-2"><img src="/assest/Logo.jpeg"  alt="logo" height={80} width={80}></img></div>
                <h3 className="text-muted text-center">
                  Electronic Store Signup here
                </h3>
                <Form noValidate onSubmit={submitForm}>
                  {/* Name Field */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Name"
                      onChange={(event) => handleChange(event, "name")}
                      value={data.name}
                      isInvalid={errorData.errorData?.response?.data?.name}
                    />
                    <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.name}</Form.Control.Feedback>
                  </Form.Group>
                  
                  {/* Email Field */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter Your Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      onChange={(event) => handleChange(event, "email")}
                      value={data.email}
                      isInvalid={errorData.errorData?.response?.data?.email}
                    />
                    <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.email}</Form.Control.Feedback>
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
                      isInvalid={errorData.errorData?.response?.data?.password}
                    />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.email}</Form.Control.Feedback>
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
                      isInvalid={errorData.errorData?.response?.data?.about}
                      
                    />
                     <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.about}</Form.Control.Feedback>
                  </FloatingLabel>
                 
                  <Container className="mt-2">
                    <p>
                      Already register <a href="/login">Login Here!!</a>{" "}
                    </p>
                  </Container>
                  <Container className="text-center">
                    <Button style={styleButton} type="submit" disabled={loading}>
                      <Spinner animation="grow" size="sm" className="me-2" hidden={!loading}/>
                      <span hidden={!loading} >Wait..</span>
                      <span hidden={loading}>Register</span>
                    </Button>
                    <Button
                      style={styleButton}
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
