import React from 'react'
import './FullpageLoader.scss'
import LoaderGif from './Loader.gif'

/**
 * Loading Screen
 */
export default function FullpageLoader({loading}) {
  if(!loading){
    return null
  }
  return (
    <div>
      <div className='loader-container'>
        <div className='loader'>
          <img src={LoaderGif} alt='spinner'/>
        </div>
      </div>
    </div>
  )
}
