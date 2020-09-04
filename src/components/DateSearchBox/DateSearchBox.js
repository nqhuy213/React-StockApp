import React, {useState} from 'react'
import './DateSearchBox.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * The date picker box
 */
export default function DateSearchBox({searchParams, updateSearchParams}) {
  const [state, setState] = useState({
    fromDate: new Date(searchParams.from),
    toDate: new Date(searchParams.to)
  })


  const handleOnChangeFrom = (date) => {
    setState({...state,
      fromDate:date,
    })}
  
  const handleOnChangeTo = (date) => {
    setState({...state,
      toDate:date,
    })
  }

  const {fromDate, toDate} = state

  //Handle button click event
  const onSubmit = () => {
    const searchParams = {
      from: fromDate.toISOString(),
      to: toDate.toISOString()
    }
    updateSearchParams(searchParams)
  }

  return (
    <div className='date-search'>
      <span>From: </span>
      <DatePicker className='date-picker' dateFormat='dd/MM/yyyy' selected={fromDate} onChange={handleOnChangeFrom}/>
      <span>To: </span>
      <DatePicker className='date-picker' dateFormat='dd/MM/yyyy' selected={toDate} onChange={handleOnChangeTo}/>
      <button className='btn-search' onClick={onSubmit}>Search</button>
    </div>
  )
}