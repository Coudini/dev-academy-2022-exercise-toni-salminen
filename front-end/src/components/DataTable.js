import React, {useState,useEffect} from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'

// Component for listing all farm data into a table
const DataTable = ({rows,columns}) => {
    return(
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
    )
}

export default DataTable;
