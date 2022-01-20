import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Login.css';
import { useState } from 'react/cjs/react.development';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { createUserWithEmailAndPass, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPass } from './LoginManager';

initializeLoginFramework();


const Login = () => {
    const [ newUser, setNewUser ] = useState(false);
    const [user,setUser] = useState({
        isSingnedIn: false,
        name: '',
        email: '',
        password: '',
        photoURL: '',
        error: '',
        success:false
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } }

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }

    const signOut = () => {
        handleSignOut()
        .then(res => {
            handleResponse(res, false);
        })
    }
   
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
        
    }

   


    const handleBlur =(e) => {
        let isFieldValid = true;
        if(e.target.name === "email"){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }if(e.target.name === "password"){
            const isPasswordValid = e.target.value > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber
        }if(isFieldValid){
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit =(e) =>{
        //for sign up
        if(newUser && user.email && user.password){
            createUserWithEmailAndPass(user.name, user.email, user.password)
           .then(res => {
            handleResponse(res, true);
        })
        }

       
        //for sign in
        if(!newUser && user.email && user.password){
            signInWithEmailAndPass(user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            })
        }

        e.preventDefault();
    }


    return (
        <div className="login">
            <div className ="social">
                <h1>Login With</h1>
                <button className="google" onClick= {googleSignIn}> 
                    <FontAwesomeIcon icon={faGoogle} />
                </button>
              
                <button className="facebook"> 
                    <FontAwesomeIcon icon={faFacebook} />
                </button>
            </div> 

            {   user.isSingnedIn ?
                    <button onClick= {signOut}>SignOut</button>
                    :
                    <button onClick= {googleSignIn}>SignIn</button>
                }
            {
               user.isSingnedIn && 
               
                <div>
                   <p>Welcome, <b>{user.name}</b></p> 
                   <p>email: <b>{user.email}</b></p> 
                   <img src={user.photoURL} alt="" />
                </div>

               
            } 
            <hr />
            {
                user.success && <p style={{color:'green'}}>User {newUser ? 'created' : 'logged in'} successfully</p>
            }
            <p style={{color:'red'}}>{user.error}</p>
            <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
            <label>User {newUser ? 'Sign Up' : 'Sign In'}</label>
            <form action="" onSubmit={handleSubmit}>
                {newUser && <input type="text" name='name' placeholder="Your Name" onBlur={handleBlur} /> }<br />
                <input type="email" name="email" placeholder="Your Email" onBlur={handleBlur} required /> <br />
                <input type="password" name="password" placeholder="Your Password" onBlur={handleBlur} required /><br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>
            
        </div>
    );
};

export default Login;