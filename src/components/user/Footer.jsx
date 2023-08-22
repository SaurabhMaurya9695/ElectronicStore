import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { toast } from 'react-toastify';

const Footer = ()=>{

    function datafromServer(){
        toast.info("this is toast");
        let p = axios.get("http://localhost:2023/users");
        p.then((response)=>{
            console.log(response.data);
            toast.success("Complete request");
        }).catch((error)=>{
            console.log("error");
            toast.error("something went wrong");
        })
    }

    return (

        <Container fluid className="text-white  p-5 text-center bg-navbar-color" >
            <h3> We provides Best Products </h3>
            <h5>All rightsReserved : saurabhyash1707@gmail.com</h5>
            <Button variant="success" onClick={datafromServer}>Getting data from server</Button>
        </Container>
    );
}

export default Footer;