import './Login.scss'
import AuthForm from '../../components/AuthForm/AuthForm'
import React from 'react'

/**
 * Login Page container
 * @pathname: /auth/login
 */
export default function Login(props) {
  return (
    <div className='auth-form'>
      <AuthForm isSignIn={true} history={props.route.history}/>
    </div>
  )
}

