
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App.js";
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import "./header.css"
import logo from "./assets/logo.png"


export default function Header(props) {
    const loggedUsername = useContext(UserContext)
    const [anchorEl, setAnchorEl] = useState();

    const handleOpenLogout = (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleCloseLogout = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        props.setLoggedInUsername(null);
    }

    const logoutPop = anchorEl ? Boolean(anchorEl) : undefined;
    const id = logoutPop ? 'logout-popover' : undefined;
    return (
        <div className='header'>
            <Link to="/" id="logoContainer" ><img src={logo} id="logo" alt="logo"></img></Link>
            <div onClick={handleOpenLogout} id="userHead">
                <img src="https://picsum.photos/35" id="userPhoto" alt="logo"/>
                <h4>{loggedUsername}</h4>
            </div>
            <Popover
                id={id}
                open={logoutPop}
                anchorEl={anchorEl}
                onClose={handleCloseLogout}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Button variant="contained" color="secondary" onClick={handleLogout} id="logoutButton">
                    Log Out
                </Button>
            </Popover>
        </div>
    )

}