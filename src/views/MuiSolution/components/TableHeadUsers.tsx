import { ChangeEvent, FunctionComponent, MouseEvent } from 'react';
import { Box, Checkbox, TableCell, TableCellProps, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { SortingOrder } from '../types';
import { SortingTitle } from '../utils';

export type UserColumnId = 'id' | 'name' | 'phone' | 'company' | 'city';

export interface UserRow {
  id: number;
  name: string;
  phone: string;
  company: string;
  city: string;
}

interface UserCell {
  align: TableCellProps['align'];
  id: UserColumnId;
  label: string;
}

export const USER_CELLS: readonly UserCell[] = [
  {
    id: 'id',
    align: 'right',
    label: 'ID',
  },
  {
    id: 'name',
    align: 'left',
    label: 'Name',
  },
  {
    id: 'phone',
    align: 'right',
    label: 'Phone',
  },
  {
    id: 'company',
    align: 'left',
    label: 'Company',
  },
  {
    id: 'city',
    align: 'left',
    label: 'City',
  },
];

interface Props {
  numSelected: number;
  order: SortingOrder;
  orderBy: UserColumnId;
  rowCount: number;
  onRequestSort: (event: MouseEvent<unknown>, property: UserColumnId) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Table head component with sorting and filtering
 * Configured for User entity
 * @component TableHeadUsers
 */
const TableHeadForUsersWithSortingAndFilter: FunctionComponent<Props> = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property: UserColumnId) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {USER_CELLS.map((cell) => (
          <TableCell
            key={cell.id}
            align={cell.align}
            //   padding='none'
            //   padding='normal'
            sortDirection={orderBy === cell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : 'asc'}
              onClick={createSortHandler(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {SortingTitle[order]}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadForUsersWithSortingAndFilter;
