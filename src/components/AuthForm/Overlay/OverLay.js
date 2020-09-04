import React from 'react'
import './Overlay.scss'


export default function OverLay(props) {
  return (
    <div className='overlay-container'>
      <div className='overlay-panel overlay-left'>
        <h1>Already had an account?</h1>
        <button className='ghost' onClick={props.showSignIn}>Sign In</button>
      </div>
      <div className='overlay-panel overlay-right'>
        <h1>Don't have an account?</h1>
        <button className='ghost' onClick={props.showSignUp}>Sign Up</button>
      </div>
    </div>
  )
}


