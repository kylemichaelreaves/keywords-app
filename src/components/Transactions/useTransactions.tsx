import * as React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from 'axios';


const URL = import.meta.env.VITE_APIGATEWAY_URL

async function fetchTransactions() {
    return await axios.get(`${URL}/transactions/get-transactions`)
        .then(res => res.data)
        .catch(err => {
            console.log(err);
            throw err;
        });
}

async function fetchTransaction(transactionId: number) {
    return await axios.get(`${URL}/transactions/get-transaction/${transactionId}`)
        .then(res => res.data)
        .catch(err => {
            console.log(err);
            throw err;
        });
}

function useTransactions(id?: number) {
    const queryKey = id ? ['transaction', id] : ['transactions'];
    const queryFn = id ? () => fetchTransaction(id) : fetchTransactions;
    return useQuery(queryKey, queryFn);
}


export {useTransactions}