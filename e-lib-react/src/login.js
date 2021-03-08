import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import logo from "./assets/logo.png"
import './login.css'

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const login = () => {
        props.setLoggedInUsername(username);
        props.setLoggedInPassword(password);
    }
    return (
        <div id="loginContainer">
            <div id="logoLogin">
                <img src={logo} id="loginLogo" alt='logo' ></img>
            </div>
            <div id="credentialsContainer">
                <TextField id="usernameField" label="Username" onChange={handleChangeUsername} className="loginForm" />
                <TextField id="passwordField" label="Password" type="password" onChange={handleChangePassword} className="loginForm" />
                <Button onClick={login} className="loginForm">Login</Button>
            </div>
        </div>
    );
}