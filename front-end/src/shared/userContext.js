import { createContext } from "react";

const UserContext = createContext({
    isLogged: {},
    setIsLogged: () => { },
    userDetails: {},
    setUserDetails: () => { },
})

export default UserContext;