import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function tableRow({ data }) {
    return (
        <TableRow>
            {
                Object.values(data.fields)
                .map((row, index) => <TableCell key={`${row}-${index}`}>{row.toString()}</TableCell>)
            }
        </TableRow>
    )
}

export default tableRow