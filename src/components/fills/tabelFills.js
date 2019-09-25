import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/styles';
import TabelRow from './tabelRow';

const styles = {
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
}



function SimpleTable({
    data,
    handleChangePage, 
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
    classes
}) {
    return (
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {
                          data[0]
                          ? Object.keys(data[0].fields).map(key => <TableCell key={key}>{key}</TableCell>)
                          : null
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  { data.map(row => <TabelRow key={row.id} data={row}></TabelRow>)}
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
        
        export default withStyles(styles)(SimpleTable)