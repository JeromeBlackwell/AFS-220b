import {useState, createContext, useEffect} from 'react'
import axios from 'axios'

export const UserContext = createContext()

const userAxios = axios.create()
userAxios.inteceptors.request.use(config => {
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
            const {user, email, id, token} = res.data
            localStorage.setItem('email', email)
            localStorage.setItem('id', id)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))

            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                id,
                email,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))

        return(
            <UserContext.Provider value = { { ...userState, signUp } }>
                {props.children}
            </UserContext.Provider>
        )
    }
}
export default UserProvider