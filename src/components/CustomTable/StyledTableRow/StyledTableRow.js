import React from 'react'
import './StyledTableRow.scss'

export default function StyledTableRow(props) {
  const {borderBottom, active} = props
  return (
    <tr className={`${borderBottom ? 'border-bottom' : ''} ${active?'active': ''}`}>
      {props.children}
    </tr>
  )
}
