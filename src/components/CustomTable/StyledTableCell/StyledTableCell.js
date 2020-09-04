import React from 'react'
import './StyledTableCell.scss'
export default function StyledTableCell(props) {
  return (
    <td className='table-cell' colSpan={props.colSpan}>
      <div className='table-cell-wrapper'>
        {
          props.primary?
          <span className='primary'><a href={`/stocks/${props.symbol}`}>{props.children}</a></span>
          :props.children
        }
      </div>
    </td>
  )
}
