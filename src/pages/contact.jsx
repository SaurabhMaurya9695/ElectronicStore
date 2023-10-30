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
import Base from "../components/user/Base";

const Contact = () => {
  const contactView = () => {
    return (
      <>
        <Container>
          <div className="ms-2 mt-3">
            <h5 style={{ fontSize: "18px" }}>
              AapkiDukaan Help Center | 24x7 Customer Care Support
            </h5>
            <p className="text-muted" style={{ fontSize: "12px" }}>
              The AapkiDukkan Help Centre page lists out various types of issues
              that you may have encountered so that there can be quick
              resolution and you can go back to shopping online. For example,
              you can get more information regarding order tracking, delivery
              date changes, help with returns (and refunds), and much more. The
              AapkiDukkan Help Centre also lists out more information that you
              may need regarding AapkiDukkan Plus, payment, shopping, and more.
              The page has various filters listed out on the left-hand side so
              that you can get your queries solved quickly, efficiently, and
              without a hassle. You can get the AapkiDukkan Help Centre number
              or even access AapkiDukkan Help Centre support if you need
              professional help regarding various topics. The support executive
              will ensure speedy assistance so that your shopping experience is
              positive and enjoyable. You can even inform your loved ones of the
              support page so that they can properly get their grievances
              addressed as well. Once you have all your queries addressed, you
              can pull out your shopping list and shop for all your essentials
              in one place. You can shop during festive sales to get your hands
              on some unbelievable deals online. This information is updated on
              30-Oct-23
            </p>
          </div>
          <Row className="mt-3">
            <Col
              md={{
                span: 6,
                offset: 3,
              }}
            >
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Form>
                    <FormGroup>
                      <FormLabel>Your Name </FormLabel>
                      <FormControl
                        type="text"
                        placeholder="Write Your Name Here !!"
                      ></FormControl>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Your email </FormLabel>
                      <FormControl
                        type="email"
                        placeholder="Write Your email Here !!"
                      ></FormControl>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Your Feedback </FormLabel>
                      <FormControl
                        as={`textarea`}
                        rows={4}
                        placeholder="Write Your msg Here !!"
                      ></FormControl>
                    </FormGroup>
                  </Form>
                  <Container className="text-center mt-2">
                    <Button variant="danger">Send Your Feedback</Button>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  return contactView();
};

export default Contact;
