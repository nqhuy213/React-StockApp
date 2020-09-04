import { Route, Switch, Redirect} from 'react-router-dom'
import AppLayout from '../AppLayout/AppLayout'
import AuthLayout from '../AuthLayout/AuthLayout'
import publicRoutes from '../../routes/publicRoutes'
import authRoutes from '../../routes/authRoutes'
import _ from 'lodash'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import React, {useState, useEffect, useRef} from 'react'
import {getTokenWithExpiry, deleteToken} from '../../utils/token'

const theme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif" //Customize Material UI theme
   }
})

/**
 * Check if the token is stored in localStorage
 */
const isAuthenticated = () => {
  const token = getTokenWithExpiry()
  if(token){
    return true
  }else{
    return false
  }
}
// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(isAuthenticated())
  const previousUserLoggedIn = usePrevious(userLoggedIn);
  /**
   * Delete token from localStorage
   */
  const logout = () => {
    deleteToken()
    setUserLoggedIn(false)
    window.location.reload()//Refresh the page
  }
  console.log(previousUserLoggedIn)

  useEffect(() => {
    const token = getTokenWithExpiry()
    if(token){
      setUserLoggedIn(true)
    }else{
      setUserLoggedIn(false)
    }
    
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Switch>
      {
        _.map(publicRoutes, (route, key) => {
          const {component, path } = route
          return(
            <Route 
              exact path = {path}
              key = {key}
              render={ (route) => <AppLayout logout={logout} userLoggedIn={userLoggedIn} component={component} route={route}/>}/>
          )
        })
      }
      {
        _.map(authRoutes, (route, key) => {
          const {component, path } = route
          return(
            <Route 
              exact path = {path}
              key = {key}
              render={ (route) => {
                const token = getTokenWithExpiry()
                if(!token){ //Check if user logged in
                  return <AuthLayout component={component} route={route}/>
                }else{  //If user logged, redirect to Homepage
                  return <Redirect to={
                    {
                      pathname: '/',
                    }
                  } /> 
                }
              }  }/>
          )
        })
      }
      </Switch> 
    </ThemeProvider>
    
  )
}

