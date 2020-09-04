import { getStockSymbols } from '../../api/stocks';
import StockTable from '../../components/StockTable/StockTable';
import React, {useState, useEffect} from 'react'
import './Stocks.scss'
import FullpageLoader from '../../components/FullpageLoader/FullpageLoader';
import {compareValues} from '../../utils/sort'

/**
 * Stocks Page container (Homepage)
 * @pathname: /
 */
export default function Stocks() {
  const [state, setState] = useState(
    {
      data:[],
      searchParams: {industry:''},
      error: '',
      tableLoading: false,
      pageLoading: false
    }
  )
  
  useEffect(() => {
    setState({...state, tableLoading: true, pageLoading: true})
  },[])
  
  /**
   * Update the search parameters and fetch API
   * @param {object} searchParams - The search parameters used to fetch API
   * @endpoint: /stocks/symbols
   */
  const updateSearchParams = async (searchParams) =>{
    setState({...state, tableLoading: true})
    const res = await getStockSymbols(searchParams)
    if(res.error){
      setState({searchParams: searchParams, data:[], tableLoading: false, error: res.message})
    }else{
      setState({searchParams: searchParams, data:res, tableLoading: false, error: ''})
    }
  }
  
  /**
   * Sort the table by field
   * @param {string} field - A field in the table. Example: 'open'
   * @param {string} order - Order to sort: 'asc' or 'desc'
   */
  const sortBy = (field, order) => {
    const oldData = data
    setState({...state, data: oldData.sort(compareValues(field, order))})
  }

  const {data, searchParams, tableLoading, error} = state
  
  if(state.pageLoading){
    return(<FullpageLoader loading={state.pageLoading}/>)
  }
  return (
    <div className='stock-table'>
      <StockTable data={data} onChange={updateSearchParams} 
        searchParams={searchParams}
        loading={tableLoading}
        error={error}
        sortBy={sortBy}
      />
    </div>
  )
}


