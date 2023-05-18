import React from "react";
import {Link} from 'react-router-dom';

const Header = (props) => {
    return (
        <nav className="nav">
            <Link to='/'>
                <div><img src="https://i.ibb.co/fHyXvGH/Screen-Shot-2023-05-17-at-6-24-38-PM.png" id="logo"></img></div>
            </Link>
        </nav>
    )
}

export default Header