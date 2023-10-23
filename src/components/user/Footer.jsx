import {  Col, Container, Row } from "react-bootstrap";
import {MdLocationOn} from "react-icons/md"
import {BiSolidPhoneCall} from "react-icons/bi"
import {IoIosMail} from "react-icons/io"

const Footer = () => {
  return (<>
    <Container
      fluid
      className="text-cyan nav-link  p-5 text-center bg-navbar-color"
    >
        <div>
        <Row>
            <Col md={4}>
                <MdLocationOn size={40}/>
                <h4>Find Us Here</h4>
                <p  style={{color:"white"}}>Lucknow , Uttar Pradesh , India </p></Col>
            <Col md={4}>
                <BiSolidPhoneCall size={40}/>
                <h4>Call Us</h4>
                <p style={{color:"white"}}>+916392272716</p>
            </Col>
            <Col md={4}>
                <IoIosMail size={40}/>
                <h4>Mail Us</h4>
                <p style={{color:"white"}}>saurabhyash1707@gmail.com</p>
            </Col>
        </Row>
    </div>
      <h4> We provides Best Products </h4>
      <h4>All rightsReserved : saurabhyash1707@gmail.com</h4>
    </Container>
    </>
  );
}

export default Footer;