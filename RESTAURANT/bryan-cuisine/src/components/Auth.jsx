import {useState, useContext} from 'react';
import AuthForm from  './AuthForm';
import { UserContext } from '../context/UserProvider';

const initInputs = {username: '', password: ''}

const Auth = () => {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const {signUp, login, errMSg, resetAuthErr} = useContext(UserContext)
    
    const handleChange = (e) => {
        const {name, value} = e.target 
        console.log(name, value)
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        signUp(inputs)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        login(inputs)
    }

    const toggleForm = () => {
        setToggle(prev => !prev)
        resetAuthErr()
    }
    
    return(
        <div className='landing-page'>
            <h1 className='sitetitle'>BRYAN CUISINE</h1>
            { !toggle ?
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText='Login'
                        errMSg={errMSg}
                    />
                    <p onClick={() => toggleForm()} className='createAccount'>Create Account</p>
                </>
                :
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignUp}
                        inputs={inputs}
                        btnText='Create Account'
                        errMSg={errMSg}
                    />
                    <p onClick={()=> toggleForm()} className='haveaccount'>Already have an account?</p>
                </>
            }
        </div>
    )
}

export default Auth;