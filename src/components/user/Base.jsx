
import {Button, Container} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Footer from "./Footer"

const Base =({title ="title" , discription = "this is desc" , children 
            , buttonEnable =false , buttonText = "Shop Now" , buttonType = "btn-color" 
            , btnlink ="buttonlink"
})=>{
    let StyleBase = {
        background:"#0B0C10",
        height:"200px"
    }

    let styleTitle = {
        "fontSize": "40px",
        "textTransform": "uppercase",
        "fontFamily": "monospace"
    }

    let styleButton ={
        "backgroundColor": "#0B0C10 !important",
        "borderColor": "#66fcf1 !important",
        "color" : "#C5C6C7"
    }

    return (
        <div>
            <Container fluid style={StyleBase} className="text-center p-5 text-white d-flex justify-content-center align-items-center" >
                <div>
                    <h3 className="text-center text-cyan" style={styleTitle}>{title}</h3>
                    <p className="text-center text-desc" >{discription && discription}</p>
                    {buttonEnable && <Button as={NavLink} to="/" style={styleButton}>{buttonText}</Button>}
                </div>
            </Container>
            {children}
            <Footer/>
        </div>

        
    );
}

export default Base;