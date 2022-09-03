import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" exact to="/">
                    Main
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/login">
                    Login
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/users">
                    Users
                </NavLink>
            </li>
        </ul>
    )
}

export default Navbar
