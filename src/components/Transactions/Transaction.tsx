import * as React from 'react';
import {LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import { TransactionInterface } from '../../types';
import { UseQueryResult } from '@tanstack/react-query';
import {useTransactions} from "./useTransactions";

export async function transactionLoader({ params }: LoaderFunctionArgs) {
    const transactionId = Number(params?.transactionId);
    return {
        transaction: useTransactions(transactionId)
    };
}

export default function Transaction() {
    const { transactionQuery } = useLoaderData() as {
        transactionQuery: UseQueryResult<TransactionInterface>;
    };
    const transaction = transactionQuery?.data;
    return transaction ? (
        <>
            <h1>Transaction</h1>
            <p>Transaction ID: {transaction.transactionId}</p>
            <p>Transaction Date: {transaction.date}</p>
            <p>Transaction Description: {transaction.memo}</p>
            <p>Transaction Amount: {transaction.amountCredit}</p>
            <p>Transaction Amount: {transaction.amountDebit}</p>
        </>
    ) : (
        <div>
            <h1>Transaction not found</h1>
        </div>
    );
}
