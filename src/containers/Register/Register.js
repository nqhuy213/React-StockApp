import AuthForm from '../../components/AuthForm/AuthForm'
import React from 'react'

/**
 * Register Page container
 * @pathname: /auth/register
 */
export default function Register(props) {
  return (
    <div className='auth-form'>
      <AuthForm isSignIn={false} history={props.route.history}/>
    </div>
  )
}
