import React, { useState } from 'react'
import './Login.css'
import LinkedInIcon from './Linkedin-Icon.png'
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';


function Login() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();


  const register = () => {
    if (!name) {
        return alert("Please enter a full name!");
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        updateProfile(userCredential.user,{
            displayName: name,
            photoURL: profilePic,
        })
        .then(() => {
            dispatch(login({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: name,
                photoURL: profilePic
            }))
        })
    }).catch((error) => alert(error.message))
  };
  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        dispatch(
            login({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            displayName: name,
            photoURL: profilePic
            })
        );
    }).catch((error) => alert(error));

  };

  return (
    <div className='login'>
        <img src={LinkedInIcon} alt=''/>

        <form>
            <input type='text' placeholder='Full name' value={name} onChange={e => setName(e.target.value)}/>
            <input type='text' placeholder='Profile pic URL (Optional)' value={profilePic} onChange={e => setProfilePic(e.target.value)}/>
            <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={loginToApp}>Sign In</button>
        </form>

        <p>Not a memmber?{" "} 
            <span className='login_register' onClick={register}>Register Now</span>
        </p>
    </div>
  )
}

export default Login