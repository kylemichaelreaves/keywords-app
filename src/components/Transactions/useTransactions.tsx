import * as React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from 'axios';


const URL = import.meta.env.VITE_APIGATEWAY_URL

async function fetchTransactions() {
    return await axios.get(`${URL}/transactions/get-transactions`)
        .then(res => res.data)
}

function useTransactions() {
    return useQuery(
        ['transactions'],
        () => fetchTransactions()
    )
}

export {useTransactions}