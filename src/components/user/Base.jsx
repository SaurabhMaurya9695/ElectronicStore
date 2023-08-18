
import {Button, Container} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Footer from "./Footer"

const Base =({title ="title" , discription = "this is desc" , children 
            , buttonEnable =false , buttonText = "Shop Now" , buttonType = "btn-color" 
})=>{
    let StyleBase = {
        background:"#f48fb1"
    }

    return (
        <div>
            <Container fluid style={StyleBase} className="text-center p-5">
                <h3 className="text-center">{title}</h3>
                <p className="text-center" >{discription}</p>
                {buttonEnable && <Button as={NavLink} to="/service" className={buttonType}>{buttonText}</Button>}
            </Container>
            {children}
            <Footer/>
        </div>

        
    );
}

export default Base;