import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/UserProvider'


const Navbar = () => {
    const {logout, token, user: {username} }= useContext(UserContext)

    return(
        <div className='navbar'>
            {token ? <Link to='/myRecipes' className='navlink'>My Cart</Link> : <Link to='/'></Link>}
            <Link to='/home' className='navlink'>Home</Link>
            <Link to='/breakfast' className='navlink' state = {{ type : 'breakfast' }}>Breakfast</Link>
            <Link to='/appetizer' className='navlink' state={{ type: 'appetizer' }}>Appetizers</Link>
            <Link to='/dinner' className='navlink' state = {{ type : 'main-course' }}>Dinner</Link>
            <h1 className='profile-nav'>{username}</h1>
            {token ? <Link to='/auth'><button onClick={logout} className='navlink'>Logout</button> </Link>: <Link to='/' className='navlink'>Sign Up</Link>}
        </div>
    )    
}

export default Navbar