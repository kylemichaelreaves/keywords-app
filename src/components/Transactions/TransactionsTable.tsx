import * as React from 'react';
import {useTransactions} from "./useTransactions";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Alert from "@mui/material/Alert";
import CircularProgress from '@mui/material/CircularProgress';


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
            {isFetching && <CircularProgress/>}
            <h1>Transactions Table</h1>
            {isSuccess && data && (
                <DataGrid
                    columns={columns}
                    rows={data}
                    autoHeight={true}
                    sx={{bgcolor: 'background.paper', color: 'black'}}
                    getRowId={(row) => row['Transaction Number']}
                />
            )}
        </>
    )
}