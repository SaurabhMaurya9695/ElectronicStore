import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import UserProfileView from "../../components/user/UserProfileView";
import UserContext from "../../context/user.context";
import { getSingleUserData } from "../../service/user.service";
const Profile = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    // this function is same as onInit in angular
    if (userContext.userData) {
        const getDataFromServer = () => {
            const userId = userContext.userData.userDto.userId;
            getSingleUserData(userId)
              .then((data) => {
                console.log("data here");
                console.log(data);
                setUser(data);
              })
              .catch((error) => {
                console.log(error);
                toast.error("error in loading user Information");
              });
          };
      getDataFromServer();
    }
  }, [userContext.userData]);

  

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
