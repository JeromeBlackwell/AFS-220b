import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/UserProvider'

const Navbar = () => {
    const {logout, token, user: {username} }= useContext(UserContext)

    return(
        <div className='navbar'>
            {token && <Link to='/shoppingcart' className='shoppingcart-link'>My Cart</Link>}
            <Link to='/home' className='navlink'>Home</Link>
            <Link to='/breakfast' className='navlink' state = {{ type : 'breakfast'}}>Breakfast</Link>
            <Link to='/home' className='navlink'>Home</Link>
            <Link to='/dinner' className='navlink' state = {{ type : 'main-course'}}>Dinner</Link>
            <h1 className='profile-nav'>{username}</h1>
            {token ? <button onClick={logout} className='logout'>Logout</button> : <Link to='/'>Sign Up</Link>}
        </div>
    )    
}

export default Navbar