import { useState } from "react";
import UserContext from "./user.context";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        setUserData: setUserData,
        setIsLogin: setIsLogin,
        isLogin: isLogin,
      }}
    >
      {children}
      {/* values is used by only childrens */}
    </UserContext.Provider>
  );
};

export default UserProvider;
