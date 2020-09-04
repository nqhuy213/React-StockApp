import React, {Fragment} from 'react'
import HeaderBar from './HeaderBar/HeaderBar'
import './AppLayout.scss'
import {Modal, Button} from 'semantic-ui-react'

/**
 * Layout for public routes: '/', '/stock/:symbol'
 */
export default function AppLayout (props){
  const userLoggedIn = props.userLoggedIn
  const Component = props.component
  const route = props.route

  return (
    <Fragment>
      <HeaderBar userLoggedIn={userLoggedIn} logout={props.logout}/>
      <div className='page-container'>
        <Component route={route} userLoggedIn={userLoggedIn}/>
      </div>
    </Fragment>
      
  )
}
