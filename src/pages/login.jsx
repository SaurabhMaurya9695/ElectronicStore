import Base from "../components/user/Base";

const Login=()=>{
    return (
        <Base title="This is Login Page " discription="For create Account click here" btnlink="/register"
        buttonText="Register Here!!" buttonType="btn-color1" buttonEnable="true">
            <div>this is Login</div>
        </Base>
    );
}

export default Login;