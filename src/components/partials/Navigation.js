import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><NavLink exact activeClassName='active' to='/'>Home</NavLink></li>
                <li><NavLink activeClassName='active' to='/list'>Управление задачами</NavLink></li>
                <li><NavLink activeClassName='active' to='/about'>About</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation