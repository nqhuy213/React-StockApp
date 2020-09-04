import React, { useState, Fragment } from 'react'
import Overlay from './Overlay/OverLay'
import SignInForm from './InnerForm/SignInForm'
import SignUpForm from './InnerForm/SignUpForm'
import './AuthForm.scss'

/**
 * A combination of SignInForm and SignUp Form and Overlay
 */
export default function AuthForm(props) {
  const [isSignIn, setIsSignIn] = useState(props.isSignIn)
  const toSignInForm = () => {
    setIsSignIn(true)
  }
  const toSignUpForm = () => {
    setIsSignIn(false)
  }
  const loginSuccess = () => {
    props.history.goBack()
  }
  return (
    <Fragment>
      <Overlay showSignIn={toSignInForm} showSignUp={toSignUpForm}/>
      {
        isSignIn?
        <div className='form-container login'>
          <SignInForm loginSuccess={loginSuccess}/>
        </div>
        
        :<div className='form-container register'>
          <SignUpForm/>
        </div> 
      }
    </Fragment>
  )
}


