import React, {useState,useEffect} from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material';

const DataTable = ({rows,columns}) => {
    return(
        <div className="dataTable">
            <TableContainer sx={{
    height: 600    
  }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" sx={{
      height: "max-content"
    }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            {columns.map((column) => (
                                <TableCell align="right">{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.farmname}
                        </TableCell>
                        <TableCell align="right">{row.datevalue}</TableCell>
                        <TableCell align="right">{row.metrictype}</TableCell>
                        <TableCell align="right">{row.metricvalue}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default DataTable;
