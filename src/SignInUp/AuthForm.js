import { useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import gsap from 'gsap';
import Navbar from '../Navbar/Navbar';
import './Auth.css';

function AuthForm() {
  const location = useLocation();
  const [isSignIn, setIsSignIn] = useState(location.state?.isSignIn ?? true);
  const doorRef = useRef(null);

  const googleSignin = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Login Success: ", response);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  useEffect(() => {
    if (doorRef.current) {
      const tl = gsap.timeline();
  
      // Step 1: Expand to full
      tl.to(doorRef.current, {
        width: '100%',
        x: '0%',
        duration: 0.4,
        ease: 'power1.inOut',
      });
  
      // Step 2: Slide + Shrink to 50%
      tl.to(doorRef.current, {
        width: '50%',
        x: isSignIn ? '100%' : '0%',
        duration: 0.9,
        ease: 'power1.inOut',
      });
    }
  }, [isSignIn]);
  
  
  

  return (
    <div className="authContainer">

      <Navbar></Navbar>

      <div className="formWrapper">
        
        <div className='formFlex'>
          <form className='signIn'>
            <h1>Sign In</h1>

            <div className="inputs">
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
            </div><br />

            <div className="pswControl">
              <div className="remember">
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <button className="forgot">Forgot Password?</button>
            </div> <br />

            <div className="submitBtnContainer">
              <button type="submit" className="submitBtn">Sign In</button>
              <div className="orContainer"><p>OR</p></div>
              <button className="googleSignin" onClick={() => googleSignin()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                  <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Sign in with Google
              </button>
              <button type="button" onClick={() => setIsSignIn(false)} className='toggleBtn'>
                Need an account? Sign Up
              </button>
            </div>     

          </form>

          <form className='signUp'>
            <h1>Sign Up</h1>

            <div className="inputs">
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" required />
            </div><br />

            <div className="pswControl">
              <div className="remember">
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
            </div> <br />

            <div className="submitBtnContainer">
              <button type="submit" className="submitBtn">Sign Up</button>
              <div className="orContainer"><p>OR</p></div>
              <button className="googleSignin" onClick={() => googleSignin()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                  <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Sign in with Google
              </button>
              <button type="button" onClick={() => setIsSignIn(true)} className='toggleBtn'>
                Already have an account? Sign In 
              </button>
            </div>

          </form>
        </div>
        {/* <img className='door' ref={doorRef} src='/door.png' alt='slide door to cover up each side of sign in sign up and slide through them accordingly'></img> */}
        
        <div ref={doorRef} className="curtain" />
      </div>
    </div>

  );
};

export default AuthForm;