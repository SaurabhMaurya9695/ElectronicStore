// there are three major functionality  from localStorage

// save the data ... after login successfully we have to save the data on localStorage .. 
export const doLoginLocalStorage=(data)=>{
    //save in the form of string 
    localStorage.setItem("userData" , JSON.stringify(data));
}

// remove the data :Logout 
export const doLogoutLocalStorage=()=>{
    localStorage.removeItem("userData");
}

// get the data 
export const getUserFromLocalStorage = () => {
    return getDataFromLocalStorage()?.userDto;
}

export const getTokenFromLocalStorage=()=>{
    return getDataFromLocalStorage()?.jwttoken;
}


export const isLoggedIn=()=>{
    return getTokenFromLocalStorage() ? true : false; 
}
export const getDataFromLocalStorage=()=>{
    const data  = localStorage.getItem("userData");
    if(data != null){
        return JSON.parse(data);
    }
    return null;
}