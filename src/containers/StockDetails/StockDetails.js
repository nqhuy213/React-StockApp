import React, {useEffect, useState, Fragment} from 'react'
import {getStockDetails, getStockQuote} from '../../api/stocks'
import StockQuoteTable from '../../components/StockQuoteTable/StockQuoteTable'
import './StockDetails.scss'
import { addDays} from 'date-fns'
import StockChart from '../../components/StockChart/StockChart'
import DateSearchBox from '../../components/DateSearchBox/DateSearchBox'
import FullpageLoader from '../../components/FullpageLoader/FullpageLoader';
import {compareValues} from '../../utils/sort'
import { Modal, Button, Header} from 'semantic-ui-react'

/***
 * Stock Quote Page container
 * @pathname: /stocks/:symbol
 */
export default function StockDetails (props){
  const symbol = props.route.match.params.symbol ///Stock symbol
  const userLoggedIn = props.userLoggedIn
  const [state, setState] = useState(
    {
      stockDetails: {},
      stockQuotes: [],
      searchParams: {
        from: new Date().toISOString(),
        to: new Date().toISOString()
      },
      error: '',
      tableLoading: false,
      pageLoading: true,
      sessionExpired: false
    }
  )
  const {stockDetails, stockQuotes, searchParams, error, tableLoading, sessionExpired} = state
  /**
   * Get the lastest price of a stock
   * @endpoint: /stocks/{symbol}
   */
  useEffect(() => {
    const fetchStockQuote = async () => {
      const res = await getStockDetails(symbol, '') //endpoint: /stocks/{symbol}
      if(res.error){

        setState({...state, error: res.message, tableLoading:false, pageLoading:false})
      }else{
        const start = new Date(res.timestamp)
        start.setUTCHours(0,0,0,0)
        setState({
          ...state,
          stockDetails: res,
          searchParams:{
            from: start.toISOString(),
            to: addDays(start,1).toISOString()
          },
          stockQuotes: [res],
          tableLoading: false,
          pageLoading:false,
        })
      }
    }
    fetchStockQuote()
  }, [symbol])

  /**
   * Update the search parameters and fetch API
   * @param {object} searchParams - the search parameters used to fetch API
   * @endpoint: /stocks/authed/{symbol}
   */
  const updateSearchParams = async (searchParams) => {
    setState({...state, tableLoading: true})
    const res = await getStockQuote(symbol, searchParams)
    if(res.error){
      if(res.message.includes('Authorization')){
        setState({...state, tableLoading: false, sessionExpired: true})
      }else{
        setState({...state, tableLoading: false, error: res.message, stockQuotes:[]})
      }
    }else{
      setState({...state,
        stockQuotes:res,
        tableLoading: false,
        error: '' })
    }
  }

  /**
   * Sort the table by field
   * @param {string} field - A field in the table. Example: 'open'
   * @param {string} order - Order to sort: 'asc' or 'desc'
   */
  const sortBy = (field, order) => {
    const oldData = stockQuotes
    setState({...state, stockQuotes: oldData.sort(compareValues(field, order))})
  }

  if(state.pageLoading){
    return(<FullpageLoader loading={state.pageLoading}/>) //Show loading spinner
  }

  
  return (
      <div className='stock-details-container'>
        <Modal open={sessionExpired}>
          <Modal.Header>Session expired</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <p>
                Please login to continue.
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <a href='/auth/login'>
              <Button color='red'>
                Login
              </Button>
            </a>
          </Modal.Actions>
        </Modal>
        <div className='center-container'>
          <div className='stock-header'>
            <span>{stockDetails.symbol} - {stockDetails.name}</span>
          </div>
          {
            userLoggedIn ?
            <DateSearchBox searchParams={searchParams} updateSearchParams={updateSearchParams}/>
            :
            <div className='request-login'>
              <a href='/auth/login'>Please login to get more details.</a>
            </div>
          }
            <div className='quote-table-container'>
              <StockQuoteTable error={error} quotes={stockQuotes} loading={tableLoading} sortBy={sortBy}/>
            </div>
            
          </div>
          {
            userLoggedIn && (
              stockQuotes.length > 1 && (
                <Fragment>
                  <div className='charts-container'>
                    <div className='stock-chart-container'>
                    <StockChart symbol={symbol} label='Close' data={stockQuotes}/>
                    </div>
                  </div>
                </Fragment>
              )
            )
          }
      </div>
      
  )
}
