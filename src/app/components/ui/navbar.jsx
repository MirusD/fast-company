import React from 'react'
import { NavLink } from 'react-router-dom'
import NavProfile from './navProfile'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

const Navbar = () => {
    const isLogged = useSelector(getIsLoggedIn())
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            exact
                            to="/"
                        >
                            Main
                        </NavLink>
                    </li>
                    {isLogged && (
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to="/users"
                            >
                                Users
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLogged ? (
                        <NavProfile />
                    ) : (
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to="/login"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
