import React from 'react'
import './StyledTableHeader.scss'
export default function StyledTableHeader(props) {
  return (
    <thead className='table-header'>
      {props.children}
    </thead>
  )
}
