import React, {useEffect, useState, useRef} from 'react'
import searchLogo from './search-icon.svg'
import './StyledHeaderCell.scss'


const WAIT_INTERVAL = 800 //0.8s after user done typing, perform search

export default function StyledHeaderCell(props) {
  const [searchParams, setSearchParams] = useState(props.searchParams)
  const [order, setOrder] = useState('asc')
  const timer = useRef()
  const mounted = useRef()
  
  useEffect(() => {
    if(!mounted.current){
      mounted.current = true
      triggerChange()
    }else{
      clearTimeout(timer.current)
      timer.current = setTimeout(triggerChange, WAIT_INTERVAL)
    }
  },[searchParams])
  

  const handleChange = (e) => {
    const {name, value} = e.target
    setSearchParams({[name]: value})
  }

  const triggerChange = () =>{
    if(props.onChange){
      props.onChange(searchParams)
    }
  }

  const onClickSort = (e) => {
    props.sort(props.id, order) //Sort data fetched from server
    if(order === 'asc'){
      setOrder('desc')
    }else{
      setOrder('asc')
    }
  }

  const {text, id, filter} = props
  return (
    <th className='table-header-container' onClick={onClickSort}>
      <div className='table-header-wrapper'>
        <div className='table-header-text'><span>{text}</span></div>
        {filter &&
          <section className="search-box-container">
            <img src={searchLogo} alt="Search Logo" className="search-icon"/>
            <input type="text" 
              className="search-box" 
              id="search-box" 
              onChange={handleChange} 
              name={id} 
              value={searchParams[id]}
              onClick={(e) => {e.stopPropagation()}}
              />
          </section>
        }
      </div>
    </th>
  )
}
