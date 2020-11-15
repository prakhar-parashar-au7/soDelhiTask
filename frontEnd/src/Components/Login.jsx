import React from 'react';
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../Redux/Actions'



const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const responseGoogle = (response) => {
        dispatch(userLoggedIn(response, history))
        // history.push('/Home')
    }

    return (
        <GoogleLogin
            clientId="1060947681639-l44puqvv2mbnn4ojg5pejmlj1rs6it9c.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default Login