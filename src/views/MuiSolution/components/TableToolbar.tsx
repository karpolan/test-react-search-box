import { FunctionComponent } from 'react';
import { Toolbar, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AppIconButton } from '../../../components';

interface Props {
  numSelected: number;
  searchText?: string;
}

/**
 * Table toolbar to support selection and actions
 * @component TableToolbar
 */
const TableToolbar: FunctionComponent<Props> = ({ numSelected, searchText }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Search results for "{searchText}"
        </Typography>
      )}
      {numSelected > 0 ? (
        <AppIconButton icon="delete" title="Delete" />
      ) : (
        <AppIconButton icon="filter" title="Filter list" />
      )}
    </Toolbar>
  );
};

export default TableToolbar;
