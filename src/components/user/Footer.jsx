import { Button, Container } from "react-bootstrap";
import { toast } from 'react-toastify';

const Footer = ()=>{

    function showToast(){
        console.log("ok");
        toast.success("this is toast");
    }

    return (

        <Container fluid className="text-white  p-5 text-center bg-navbar-color" >
            <h3> We provides Best Products </h3>
            <h5>All rightsReserved : saurabhyash1707@gmail.com</h5>
            <Button variant="success" onClick={showToast}></Button>
        </Container>
    );
}

export default Footer;