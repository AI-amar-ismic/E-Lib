
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './mainRouter'
import Header from './header'
import React, { useState } from "react";
import Login from "./login.js";
const UserContext = React.createContext(null)


function App() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);


  const setLoggedInUsername = (usrnm) => {
    setUsername(usrnm);
  }

  const setLoggedInPassword = (pswrd) => {
    setPassword(pswrd);
  }

  return (
    <>
      {username ? (
        <UserContext.Provider value={username}>
          <BrowserRouter>
            <Header setLoggedInUsername={setLoggedInUsername} />
            <MainRouter />
          </BrowserRouter>
        </UserContext.Provider>
      ) : (
        <>
          <Login setLoggedInUsername={setLoggedInUsername} setLoggedInPassword={setLoggedInPassword} />
        </>
      )}
    </>
  );
}

export { App, UserContext };
