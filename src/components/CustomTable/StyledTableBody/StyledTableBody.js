import React from 'react'
import './StyledTableBody.scss'

export default function StyledTableBody(props) {
  const {loading} = props
  return (
    <tbody className={loading ? 'loading-wrapper' : undefined}>
      {props.children}
    </tbody>
  )
}
