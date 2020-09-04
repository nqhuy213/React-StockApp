import React, {useState, useEffect} from 'react'
import './StockQuoteTable.scss'
import StyledTable from '../CustomTable/StyledTable/StyledTable'
import StyledTableHeader from '../CustomTable/StyledTableHeader/StyledTableHeader'
import StyledTableRow from '../CustomTable/StyledTableRow/StyledTableRow'
import StyledHeaderCell from '../CustomTable/StyledHeaderCell/StyledHeaderCell'
import StyledTableBody from '../CustomTable/StyledTableBody/StyledTableBody'
import StyledTableCell from '../CustomTable/StyledTableCell/StyledTableCell'
import StyledTableFooter from '../CustomTable/StyledTableFooter/StyledTableFooter'
import TablePagination from '@material-ui/core/TablePagination/TablePagination'
import TablePaginationAction from '../CustomTable/TablePaginationAction/TablePaginationAction'
import { getDateString } from '../../utils/date'
import _ from 'lodash'

export default function StockQuoteTable({quotes, loading , error, ...props}) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const emptyRows = error? 0 : rowsPerPage - Math.min(rowsPerPage, quotes.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setPage(0) //Set page to 0 everytime the component rerender
  },[quotes])
  
  /**
   * Sort the table by field - Client Sorting
   * @param {string} key - A field in the table. Example: 'open'
   * @param {*} order - Order to sort: 'asc' or 'desc'
   */
  const sortBy = (key, order = 'asc') => {
    props.sortBy(key, order)
    setPage(0)
  }

  return (
    <StyledTable>
      <StyledTableHeader>
        <StyledTableRow>
          <StyledHeaderCell id='timestamp' text='DATE' sort={sortBy}/>
          <StyledHeaderCell id='open' text='OPEN' sort={sortBy}/>
          <StyledHeaderCell id='high' text='HIGH' sort={sortBy}/>
          <StyledHeaderCell id='low' text='LOW' sort={sortBy}/>
          <StyledHeaderCell id='close' text='CLOSE' sort={sortBy}/>
          <StyledHeaderCell id='volumes' text='VOLUMES' sort={sortBy}/>
        </StyledTableRow>
      </StyledTableHeader>
      <StyledTableBody loading={loading}>
        {error.trim().length > 0 ?
          <StyledTableRow borderBottom={true}>
            <StyledTableCell colSpan={3}>{error}</StyledTableCell>
          </StyledTableRow>
          :
          (rowsPerPage > 0
            ? quotes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : quotes
            ).map((quote) => (
              <StyledTableRow borderBottom={true} active={true} key={quote.timestamp}>
                <StyledTableCell>{getDateString(quote.timestamp)}</StyledTableCell>
                <StyledTableCell>{quote.open}</StyledTableCell>
                <StyledTableCell>{quote.high}</StyledTableCell>
                <StyledTableCell>{quote.low}</StyledTableCell>
                <StyledTableCell>{quote.close}</StyledTableCell>
                <StyledTableCell>{quote.volumes}</StyledTableCell>
              </StyledTableRow>
            ))
        }
        {
          emptyRows > 0 && 
          _.times(emptyRows, (i) => {
            return (
              <StyledTableRow key={i}><StyledTableCell colSpan={6}/></StyledTableRow>
            )
          })
        }
      </StyledTableBody>
      <StyledTableFooter>
        <StyledTableRow>
          <TablePagination
            style={{overflow: 'hidden'}}
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={6}
            count={quotes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationAction}
          />
        </StyledTableRow>
      </StyledTableFooter>
    </StyledTable>
  )
}
