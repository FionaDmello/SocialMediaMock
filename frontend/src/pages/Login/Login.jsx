import React,{ useContext, useRef } from 'react'
import './Login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/authContext';
// import { Redirect } from 'react-router-dom';

export default function Login() {
    // can use useState here. 
    // to avoid unnecessary rerenders when useEffect is not used in component, this works better
    const emailRef = useRef();
    const passRef = useRef();
    // to access global state
    const {isFetching, error, dispatch} = useContext(AuthContext);

    const submitHandler = (e) => {
        // Stops the page from refreshing on click of button
        e.preventDefault()
        loginCall({email:emailRef.current.value, password:passRef.current.value}, dispatch);
    }
    
    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">LB Social</h3>
                    <span className="loginDesc">Connect and grow with people all over the world</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={submitHandler}>
                       <input placeholder="Email" type="email" className="loginInput" required ref={emailRef}/> 
                       <input placeholder="Password" type="password" className="loginInput" required minLength={6} ref={passRef}/> 
                       <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? "Loading..." : "Log In"}</button>
                       <span className="loginForgot">Forgot Password?</span>
                       <button className="loginRegisterButton">Create a New Account</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}
