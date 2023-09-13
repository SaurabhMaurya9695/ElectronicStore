import { useEffect } from "react";
import { useState } from "react";
// import { useContext } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserProfileView from "../../components/user/UserProfileView";
// import UserContext from "../../context/user.context";
import { getSingleUserData } from "../../service/user.service";
const Profile = () => {
  // const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);

  const {userId} = useParams(); // whatever you are passing in url as a param it will catch that params
  // write same as that you passed in url 

  
  useEffect(() => {
    // this function is same as onInit in angular
    // console.log("userIfFromUrl " + userId)
    
      const getDataFromServer = () => {
          // const userId = userContext?.userData?.userDto?.userId;
          getSingleUserData(userId)
            .then((data) => {
              setUser(data);
            })
            .catch((error) => {
              toast.error("error in loading user Information");
            });
        };
    getDataFromServer();

  },[])// eslint-disable-line react-hooks/exhaustive-deps

  

  return (
    <Container className="rounded mt-3">
      {user ? (
        <UserProfileView user={user} />
      ) : (
        <h1 className="text-center"> User Not Loaded from server !! </h1>
      )}
    </Container>
  );
};

export default Profile;
