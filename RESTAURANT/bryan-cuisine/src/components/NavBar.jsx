import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/UserProvider'

const Navbar = () => {
    const {logout, token, user: {username} }= useContext(UserContext)

    return(
        <div className='navbar'>
            {token && <Link to='/shoppingcart' className='shoppincart-link'>My Cart</Link>}
            <Link to='/landingpage' classname='landingpage-link'>Home</Link>
            <h1 className='profile-nav'>{username}</h1>
            {token ? <button onClick={logout} className='logout'>Logout</button> : <Link to='/'>Sign Up</Link>}
        </div>
    )    
}

export default Navbar