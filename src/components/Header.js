import React from "react";
import {Link} from 'react-router-dom';
import { login, logout } from "../firebase";

const Header = (props) => {
    return (
        <nav className="nav">
            <Link to='/subjects'>
                <div><img src="https://i.ibb.co/fHyXvGH/Screen-Shot-2023-05-17-at-6-24-38-PM.png" id="logo" alt="logo"></img></div>
            </Link>
            <ul>
                {
                    props.user ?
                    <>
                        <li>{props.user.displayName}</li>
                        <li onClick={logout}>Logout</li>
                    </>
                    :
                        <li onClick={login}>Login</li>
                    
                }
            </ul>
        </nav>
    )
}

export default Header