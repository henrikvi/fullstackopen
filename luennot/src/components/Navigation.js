import React from 'react'
import {NavLink} from 'react-router-dom'

const Navigation = () => {
    return (
        <ul className="nav-list">
            <li className="nav-element"><NavLink to="/">Home</NavLink></li>
            <li className="nav-element"><NavLink to="/basics">Basics</NavLink></li>
            <li className="nav-element"><NavLink to="/simplestate">Simple State</NavLink></li>
            <li className="nav-element"><NavLink to="/complexstate">Complex State</NavLink></li>
            <li className="nav-element"><NavLink to="/notemanager">Note Manager</NavLink></li>
        </ul>
    );
}

export default Navigation