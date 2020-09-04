import Stock from '../containers/Stocks/Stocks'
import StockDetails from '../containers/StockDetails/StockDetails'

export default{
  Stock:{
    component: Stock,
    path: '/'
  },
  StockDetails: {
    component: StockDetails,
    path: '/stocks/:symbol'
  },  
}