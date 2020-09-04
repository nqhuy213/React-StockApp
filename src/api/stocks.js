import {callAPI} from './base'

export const getStockSymbols = (params) => callAPI('/stocks/symbols', 'GET', params)

export const getStockDetails = (stockSymbol, params) => callAPI(`/stocks/${stockSymbol}`, 'GET', params)

export const getStockQuote = (stockSymbol, params) => callAPI(`/stocks/authed/${stockSymbol}`, 'GET', params)