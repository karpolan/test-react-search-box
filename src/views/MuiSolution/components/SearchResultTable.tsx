import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import TableHeadUsers, { USER_CELLS, UserColumnId, UserRow } from './TableHead';
import TableToolbar from './TableToolbar';
import { useState, MouseEvent, ChangeEvent, useMemo, FunctionComponent, useEffect, useId } from 'react';
import { getComparator, SortingOrder, stableSort, User } from '../../../utils';

// Map types and variables to local variants
type DataItem = User;
type Row = UserRow;
type OrderBy = UserColumnId;
const CELS = USER_CELLS;
const PAGINATION_OPTIONS = [5, 10, 25];

// Default values
const orderByDefault: OrderBy = 'id';
const sortingOrderDefault: SortingOrder = 'asc';
const rowsPerPageDefault = PAGINATION_OPTIONS[0];

interface Props {
  data: readonly DataItem[];
  searchText?: string;
}

/**
 * Render a table with sorting and filtering for given rows
 * @component SearchResultTable
 */
const SearchResultTable: FunctionComponent<Props> = ({ data, searchText }) => {
  const htmlId = useId();
  const [order, setOrder] = useState<SortingOrder>(sortingOrderDefault);
  const [orderBy, setOrderBy] = useState<OrderBy>(orderByDefault);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<readonly Row[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDefault);
  const [selected, setSelected] = useState<readonly number[]>([]);

  useEffect(() => {
    // Map API data to local rows
    const dataToRows = data.map((item: DataItem) => ({
      id: item.id,
      name: item.name,
      // email: item.email,
      phone: item.phone,
      company: item.company.name,
      city: item.address.city,
    }));
    setRows(dataToRows);
  }, [data]);

  const handleRequestSort = (_: MouseEvent<unknown>, property: UserColumnId) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rows, rowsPerPage]
  );

  return (
    <>
      <Paper
        sx={{
          width: '100%',
          //   mb: 2
        }}
      >
        <TableToolbar numSelected={selected.length} searchText={searchText} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHeadUsers
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `${htmlId}-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                    {row.name}
                </TableCell> */}

                    {CELS.map((cell) => (
                      <TableCell align={cell.align}>{row[cell.id]}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                // style={{
                //   height: (dense ? 33 : 53) * emptyRows,
                // }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={PAGINATION_OPTIONS}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default SearchResultTable;
