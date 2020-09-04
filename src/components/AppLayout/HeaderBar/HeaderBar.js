import React, { Fragment } from 'react'
import './HeaderBar.scss'

/**
 * The navigation bar
 */
export default function HeaderBar (props) {
  const {userLoggedIn} = props
  return (
    <div className='bar-container'>
      <div className='logo-container'>
        <a href='/'>
          StockInsights<span>.</span>
        </a>
      </div>
      <div className='header-slogan'>
        <div className='slogan'>The fastest way to <span>follow</span> the market</div>
      </div>
      {
        !userLoggedIn ?
        <div className='authentication-buttons'>
          <Fragment>
            <a href='/auth/login'><button className='login-button'>Login</button></a>
            <a href='/auth/register'><button className='register-button secondary'>Register</button></a>
          </Fragment>
        </div>
        :
        <button className='logout-button secondary' onClick={props.logout}>Logout</button>
      }
    </div>
  )
}
