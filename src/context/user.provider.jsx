import { useEffect } from "react";
import { useState } from "react";
import { doLoginLocalStorage, doLogoutLocalStorage, getDataFromLocalStorage, isLoggedIn ,isAdminUser } from "../auth/helper.auth";
import UserContext from "./user.context";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [AdminUser , setIsAdminUser] = useState(false); //by default it is false

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setUserData(getDataFromLocalStorage());
    setIsAdminUser(isAdminUser())
  } , [])


  const doLoginInProvider=(data)=>{
    doLoginLocalStorage(data);
    setIsLogin(true);
    setIsAdminUser(isAdminUser())
    setUserData(getDataFromLocalStorage());
  }


  const doLogoutInProvider=()=>{
    doLogoutLocalStorage();
    setIsLogin(false);
    setIsAdminUser(false);
    setUserData(null);
    return true;
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
        logout:doLogoutInProvider,
        AdminUser:AdminUser
      }}
    >
      {children}
      {/* values is used by only childrens */}
    </UserContext.Provider>
  );
};

export default UserProvider;
