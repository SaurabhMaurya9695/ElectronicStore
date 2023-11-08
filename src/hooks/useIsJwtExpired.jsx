import { useContext, useEffect, useState } from "react";
import { isJwtExpired } from "jwt-check-expiration";
import { toast } from "react-toastify";
import UserContext from "../context/user.context";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../auth/helper.auth";
const useIsJwtExpired = () => {
  const [expired, setExpired] = useState(false); // means no expired rn
  const { logout } = useContext(UserContext);
  const token = getTokenFromLocalStorage();
  const navigate = useNavigate();

  try {
    useEffect(() => {
      try {
        if (isJwtExpired(token)) {
          // token exipred
          setExpired(true);
          console.log("Token Expired !!");
          toast.warning("Session Expired !! .. Login Again");
          logout();
          navigate("/logout");
          return;
        } else {
          console.log("Token Expired Soon ");
        }
      } catch (error) {
        console.log(error);
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  } catch (error) {
    console.log(error);
  }

  return expired;
};

export default useIsJwtExpired;
