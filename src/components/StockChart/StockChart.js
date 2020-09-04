import React, {useState, useEffect} from 'react'
import { getDateString } from '../../utils/date'
import './StockChart.scss'
import ReactApexChart from 'react-apexcharts'

/**
 * Candlestick Chart based on react-apexcharts
 */
export default function StockChart({data, symbol}){
  const [state, setState] = useState({
    series: [
      {
        data: [...data].reverse().map((stock) => { //Reverse the data fetched from server
          return {
            x: stock.timestamp,
            y: [stock.open, stock.high, stock.low, stock.close]
          }
        })
      }
    ],
    
    options: {
      chart: {
        type: 'candlestick',
        height: 400,
        toolbar:{
          show:false
        },

        zoom:{
          enabled:false
        }
      },
      title: {
        text: symbol,
        align: 'left'
      },
      xaxis: {
        labels:{
          formatter: function(value) {
            return getDateString(value)
          }
        }
      },
      tooltip:{
        enabled: true
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    },
  })

  useEffect(() => {
    const reverseData = [...data].reverse() //Reverse the data fetched from server
    setState({
      ...state, 
      series: [
        {
          data: reverseData.map((stock) => {
            return {
              x: new Date(stock.timestamp),
              y: [stock.open, stock.high, stock.low, stock.close]
            }
          })
        }
      ]
    })
  },[data])

  return (
    <ReactApexChart options={state.options} series={state.series} type='candlestick' height={400}/>
  )
}
