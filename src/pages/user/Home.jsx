import { useContext } from "react";
import UserContext from "../../context/user.context";

const Home = () =>{
    const userContext = useContext(UserContext);
    return (
        <>
            <h1> Welcome {userContext.userData?.userDto?.name}</h1>
        </>
    );
}

export default Home;