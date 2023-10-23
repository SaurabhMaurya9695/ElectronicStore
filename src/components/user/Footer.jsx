import {  Button, Col, Container, Row } from "react-bootstrap";
import {MdLocationOn} from "react-icons/md"
import {BiSolidPhoneCall} from "react-icons/bi"
import {IoIosMail} from "react-icons/io"
import {ImLinkedin2} from "react-icons/im"
import { Link } from "react-router-dom";

const Footer = () => {
  return (<>
    <Container
      fluid
      className="text-cyan nav-link  p-5 text-center bg-navbar-color"
    >
        <div>
        <Row>
            <Col md={3}>
                <MdLocationOn style={{color: "white"}} fontVariant={"white"} size={40}/>
                <h4>Find Us Here</h4>
                <p  style={{color:"white"}}>Lucknow , Uttar Pradesh , India </p></Col>
            <Col md={3}>
                <BiSolidPhoneCall style={{color: "white"}} size={40}/>
                <h4>Call Us</h4>
                <p style={{color:"white"}}>+916392272716</p>
            </Col>
            <Col md={3}>
                <IoIosMail style={{color: "white"}} size={40}/>
                <h4>Mail Us</h4>
                <p style={{color:"white"}}>saurabhyash1707@gmail.com</p>
            </Col>
            <Col md={3}>
                <ImLinkedin2 style={{color: "white"}}  size={40}/>
                <div className="mt-1">
                <h4>Linkedin</h4>
                  <Button size="sm" className="border-0"  style={{color:"white"}} as={Link} to={`https://www.linkedin.com/in/saurabh-maurya-ba2275188/`}>Click Me</Button>
                </div>
            </Col>
        </Row>
    </div >
      <div className="mt-3">
        <h3 style={{color: "white"}} > We provides Best Products </h3>
        <p>All rightsReserved : saurabhyash1707@gmail.com</p>
      </div>
    </Container>
    </>
  );
}

export default Footer;