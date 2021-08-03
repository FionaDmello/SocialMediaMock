import axios from 'axios';
import React, {useRef, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './Register.css'

export default function Register() {
    const emailRef = useRef();
    const passRef = useRef();
    const usernameRef = useRef();
    const passAgainRef = useRef();

    // hook to keep track and move user along his action history on the app
    const history = useHistory();

    const submitHandler = async(e) => {
        // Stops the page from refreshing on click of button
        e.preventDefault();
        
        if(passAgainRef.current.value != passRef.current.value){
            passAgainRef.current.setCustomValidity("Passwords don't match!");
        }
        else{
            const user ={
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passRef.current.value
            }

            try{
                await axios.post("/auth/register",user);
                history.push("/login")
            }catch(err){
                console.log("Error while registering user",err)
            }
        } 
    }

    return (
        <div className="registerContainer">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">LB Social</h3>
                    <span className="registerDesc">Connect and grow with people all over the world</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={submitHandler}>
                        <input placeholder="User Name" className="registerInput" ref={usernameRef} required/> 
                       <input placeholder="Email" className="registerInput" ref={emailRef} required type="email"/> 
                       <input placeholder="Password" className="registerInput" ref={passRef} required  type="password" minLength={6}/> 
                       <input placeholder="Password again" className="registerInput" ref={passAgainRef} required  type="password" minLength={6}/> 
                       <button className="registerButton" type="submit">Sign Up</button>
                       <button className="registerLoginButton">Log into Account</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}
