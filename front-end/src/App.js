import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserContext from "./shared/userContext.js";
import Login from "./components/login/login";
import SignUp from "./components/login/signUp.js";
import UserList from "./components/user/userList.js";
import Loader from "./shared/loader.js";
import PageNotFound from "./shared/pageNotFound.js";

import "./App.css"

function App() {
  // variable to tracks if the user is logged in
  const [isLogged, setIsLogged] = useState(false)
  // variable to indicates if the app is loading
  const [load, setLoad] = useState(true)
  useEffect(()=>{
    setTimeout(()=>{
        setLoad(false)
    },500)
})

  // useEffect hook to fetch user details
  return (
    <UserContext.Provider value={{
      isLogged: isLogged,
      setIsLogged: setIsLogged,
    }}>
      {load ?
        <Loader /> :
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/user" element={<UserList />} />
          <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      }

      <ToastContainer className='toast'
        position='bottom-center' autoClose={5000}
      />
    </UserContext.Provider>
  )

}
export default App;