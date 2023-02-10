import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/UserProvider'
import MenuItem from './Recipes'

const Navbar = () => {
    const {logout, token, user: {username} }= useContext(UserContext)

    return(
        <div className='navbar'>
            {token && <Link to='/shoppingcart' className='shoppingcart-link'>My Cart</Link>}
            <Link to='/home' className='home-link'>Home</Link>
            <h1 className='profile-nav'>{username}</h1>
            {token ? <button onClick={logout} className='logout'>Logout</button> : <Link to='/'>Sign Up</Link>}
        </div>
    )    
}

export default Navbar