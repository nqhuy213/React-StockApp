import React from 'react'
import './StyledTable.scss'
export default function StyledTable(props) {
  return (
    <table className='data-table'>
      {props.children}
    </table>
  )
}
