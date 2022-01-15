import React, {useState,useEffect} from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'

const DataTable = ({rows,columns}) => {
    console.log("DataTable");
    console.log("rows:",rows);
    console.log("columns;",columns);
    return(
        <div style={{ height: '85%', width: '100%'}}>
        
            <DataGrid
                rows={rows}
                columns={[
                    {field: 'farmname', headerName: 'Name', width: 300},
                    {field: 'datevalue', headerName: 'Date', width: 200},
                    {field: 'metrictype', headerName: 'Metric', width: 200},
                    {field: 'metricvalue', headerName: 'Value', width: 200}
                ]}
                pageSize={9}
                rowsPerPageOptions={[9]}
            />


            {/*
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
             */}
        </div>
    )
}

export default DataTable;
