import { useContext } from "react";
import { Container } from "react-bootstrap";
import UserProfileView from "../../components/user/UserProfileView"
import UserContext from "../../context/user.context";
const Profile =()=>{

    const userContext = useContext(UserContext);
    const data = userContext.userData;

    return (
        <Container className="rounded mt-3">
            <UserProfileView  user={data}/>
        </Container>
    );
}

export default Profile;