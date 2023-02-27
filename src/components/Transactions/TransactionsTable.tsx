import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useTransactions} from "./useTransactions";
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import Alert from "@mui/material/Alert";

const columns: GridColDef[] = [
    {field: 'Transaction Number', headerName: 'Transaction Number', width: 200},
    {field: 'Date', headerName: 'Date', width: 200},
    {field: 'Memo', headerName: 'Memo', width: 200},
    {field: 'Amount Debit', headerName: 'Amount Debit', width: 200},
    {field: 'Amount Credit', headerName: 'Amount Credit', width: 200},
]

export default function TransactionsTable() {

    const {data, isLoading, isError, isFetching, isSuccess, error} = useTransactions()


    return (
        <>
            {isLoading && <Alert severity="info">Loading...</Alert>}
            {isError && error && <Alert severity="error">Error: (error)</Alert>}
            {isFetching && <p>Fetching...</p>}
            <h1>Transactions Table</h1>
            {isSuccess && (
                <DataGrid columns={columns} rows={data}/>
            )}
        </>
    )
}