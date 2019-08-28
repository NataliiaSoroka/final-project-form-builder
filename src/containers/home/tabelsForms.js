import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import RowComponent from './tableRow';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));



export default function SimpleTable({ 
    data, 
    handleChangePage, 
    handleChangeRowsPerPage,
    page,
    rowsPerPage 
}) {
  const classes = useStyles();


  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Fields</TableCell>
            <TableCell align="right">Fill peaple</TableCell>
            <TableCell align="center">Update</TableCell>
            <TableCell align="center">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(row => <RowComponent  row={row}  key={row.id}/> )}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Paper>
  );
}