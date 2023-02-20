import {useState, createContext, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    console.log(token)
    config.headers.Authorization = `Bearer ${token}`
    return config
})

// Add inits as needed (menu options, etc)
const UserProvider = (props) => {
    const initState = {
        user: '',
        email: '',
        password: '',
        id: '',
        token: "",
        errMsg: ''
    }

// Error Handling
    const handleAuthErr = (errMsg) => {
        setUserState(prevState =>({...prevState, errMsg}))
    }

    const [userState, setUserState] = useState(initState)

    const signUp = (credentials) => {
        axios.post('/auth/signup', credentials)
        .then(res => {
            const { token } = res.data
            localStorage.setItem('token', token)

            setUserState(prevUserState => ({
                ...prevUserState,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))    
    }

    const login = (credentials) => {
        axios.post('/auth/login', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            getMyCart()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const logout = () =>{
        localStorage.removeItem('token')
        setUserState(prevState => ({ ...initState }))
    }

    const resetAuthErr = () => {
        setUserState(prevState=>({ ...prevState, errMsg: " "}))
    }

    const getMyCart = () => {
        userAxios.get('/api/shoppingcart')
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                cart: res.data
            }))
        })
    }

    useEffect(() => {
        setUserState(prevState => ({
            ...prevState,
            user: JSON.parse(localStorage.getItem('recipes')) || {},
            token: localStorage.getItem('token') || "",  
        }))
        getMyCart()
    }, [])
    
    return(
        <UserContext.Provider value = { { ...userState, signUp, logout, resetAuthErr, handleAuthErr } }>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserProvider