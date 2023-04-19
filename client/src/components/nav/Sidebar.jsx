import { NavLink } from "react-router-dom"
import React from 'react'

const Sidebar = () => {
    return (
        <>
            <ul className="nav nav-tabs">
                
                <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/ad/create">Create Ad</NavLink>
                </li>
                
            </ul>

        </>


    )
}

export default Sidebar