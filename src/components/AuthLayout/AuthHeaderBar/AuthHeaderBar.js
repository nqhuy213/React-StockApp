import React from 'react'

export default function AuthHeaderBar() {
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
    </div>
  )
}
