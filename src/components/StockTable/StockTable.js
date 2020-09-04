import './StockTable.scss'
import React, {useState, useEffect } from 'react'
import StyledTable from '../CustomTable/StyledTable/StyledTable'
import StyledTableHeader from '../CustomTable/StyledTableHeader/StyledTableHeader'
import StyledTableRow from '../CustomTable/StyledTableRow/StyledTableRow'
import StyledHeaderCell from '../CustomTable/StyledHeaderCell/StyledHeaderCell'
import StyledTableBody from '../CustomTable/StyledTableBody/StyledTableBody'
import StyledTableCell from '../CustomTable/StyledTableCell/StyledTableCell'
import StyledTableFooter from '../CustomTable/StyledTableFooter/StyledTableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationAction from '../CustomTable/TablePaginationAction/TablePaginationAction'

export default function StockTable(props) {
  const {data,loading, error, searchParams} = props
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  const updateSearchParams = (searchParams) => {
    props.onChange(searchParams)
  }
  useEffect(() => {
    setPage(0)
  },[data])

  
  /**
   * Sort the table by field - Client sorting
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
          <StyledHeaderCell id='symbol' text='SYMBOL'
            sort={sortBy}
          />
          <StyledHeaderCell id='name' text='COMPANY NAME'
            sort={sortBy}
          />
          <StyledHeaderCell id='industry' text='INDUSTRY'
            filter={true} onChange={updateSearchParams}
            searchParams={searchParams}
            sort={sortBy}
          />
        </StyledTableRow>
      </StyledTableHeader>
      <StyledTableBody loading={loading}>
        {
          error.trim().length > 0 ?
          <StyledTableRow borderBottom={true}>
            <StyledTableCell colSpan={3}>{error}</StyledTableCell>
          </StyledTableRow>
          :(
            (rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
              ).map((stock) => (
                <StyledTableRow borderBottom={true} active={true} key={stock.symbol}>
                  <StyledTableCell symbol={stock.symbol} primary={true}>{stock.symbol}</StyledTableCell>
                  <StyledTableCell>{stock.name}</StyledTableCell>
                  <StyledTableCell>{stock.industry}</StyledTableCell>
                </StyledTableRow>
              ))
            
          )
        }
      </StyledTableBody>
      <StyledTableFooter>
        <StyledTableRow>
          <TablePagination
            style={{overflow: 'hidden'}}
            rowsPerPageOptions={[15, 50, 100, { label: 'All', value: -1 }]}
            colSpan={3}
            count={data.length}
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


 