import { useEffect } from "react";
import { useState } from "react";
import { doLoginLocalStorage, doLogoutLocalStorage, getDataFromLocalStorage, isLoggedIn } from "../auth/helper.auth";
import UserContext from "./user.context";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setUserData(getDataFromLocalStorage());
  } , [])


  const doLoginInProvider=(data)=>{
    doLoginLocalStorage(data);
    setIsLogin(true);
    setUserData(getDataFromLocalStorage());
  }


  const doLogoutInProvider=()=>{
    doLogoutLocalStorage();
    setIsLogin(false);
    setUserData(null);
  }

  return (
    <UserContext.Provider
      // every childrens has these values ;
      value={{
        userData: userData,
        setUserData: setUserData,
        setIsLogin: setIsLogin,
        isLogin: isLogin,
        login:doLoginInProvider,
        logout:doLogoutInProvider
      }}
    >
      {children}
      {/* values is used by only childrens */}
    </UserContext.Provider>
  );
};

export default UserProvider;
