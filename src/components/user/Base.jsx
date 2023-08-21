
import {Button, Container} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Footer from "./Footer"

const Base =({title ="title" , discription = "this is desc" , children 
            , buttonEnable =false , buttonText = "Shop Now" , buttonType = "btn-color" 
            , btnlink ="buttonlink"
})=>{
    let StyleBase = {
        background:"#f48fb1",
        height:"200px"
    }

    return (
        <div>
            <Container fluid style={StyleBase} className="text-center p-5 text-white d-flex justify-content-center align-items-center" >
                <div>
                    <h3 className="text-center">{title}</h3>
                    <p className="text-center" >{discription && discription}</p>
                    {buttonEnable && <Button as={NavLink} to="/" className={buttonType}>{buttonText}</Button>}
                </div>
            </Container>
            {children}
            <Footer/>
        </div>

        
    );
}

export default Base;