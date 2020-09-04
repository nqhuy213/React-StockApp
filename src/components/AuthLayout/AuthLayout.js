import React, {Fragment, useEffect, useState } from 'react'
import AuthHeaderBar from './AuthHeaderBar/AuthHeaderBar'
import './AuthLayout.scss'
import {getTokenWithExpiry} from  '../../utils/token'

/**
 * Layout for authRoutes: '/auth/login', '/auth/register'
 */
export default function AuthLayout({component, route}) {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {
    const token = getTokenWithExpiry()
    if(token){ //Check if token is stored in localStorage
      setUserLoggedIn(true)
    }
  }, [])
  const Component = component
  return (
    <Fragment>
        <AuthHeaderBar/>
        <div className='page-container'>
          <div className='auth-header'>Join the community</div>
          <Component userLoggedIn={userLoggedIn} route={route}/>
        </div>
      </Fragment>
  )
}

