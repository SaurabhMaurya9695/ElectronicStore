import {
  Card,
  Col,
  Container,
  Row,
  Form,
  FormLabel,
  FloatingLabel,
} from "react-bootstrap";
import Base from "../components/user/Base";

const Register = () => {
  const registerForm = () => {
    return (
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Body>
                <h3 className="text-muted text-center">ELectronic Store Signup here</h3>
                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter Your Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Your Email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Enter New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter New password"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <FormLabel>Select Your Gender</FormLabel>
                    <div>
                      <Form.Check
                        inline
                        name="gender"
                        label="Male"
                        type={"radio"}
                        iid={`gender`}
                      />
                      <Form.Check
                        inline
                        name="gender"
                        label="Female"
                        type={"radio"}
                        id={`gender`}
                      />
                    </div>
                  </Form.Group>

                  <FloatingLabel controlId="formtext" label="Write About Yourself">
                    <Form.Control
                      as="textarea"
                      placeholder="Write something about yourself here!!"
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>
                </Form>
                <Container>
                    <p>Already register </p> <a href="/login">Login Here!!</a>
                  </Container>
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
