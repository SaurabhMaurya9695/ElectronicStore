import { useContext } from "react";
import { Card, Container } from "react-bootstrap";
import UserContext from "../context/user.context";

const Logout = () =>{
    const context = useContext(UserContext);
    if(context.logout()){
        return (<>
            <Container className="text-center mt-5" style={{width:"50%"}}>
                <Card className="shadow-lg border-0">
                    <Card.Body>
                        <h3> See You Soon !!</h3>
                        <p className="text-muted"> Hope You Like It !! <br /> Thanks and Visit Again </p>
                    </Card.Body>
                </Card>
            </Container>
        </>)
    }
}

export default Logout ;


