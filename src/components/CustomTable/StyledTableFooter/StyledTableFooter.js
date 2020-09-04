import React from 'react'
import './StyledTableFooter.scss'

export default function StyledTableFooter(props) {
  return (
    <tfoot className='table-footer'>
      {props.children}
    </tfoot>
  )
}
