import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import KeywordsForm from "./components/Keywords/KeywordsForm";
import AddressGeocoder from "./components/AddressGeocoder/AddressGeocoder";
import Home from "./components/Home";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import TransactionsTable from "./components/Transactions/TransactionsTable";
import Transaction, {transactionLoader} from "./components/Transactions/Transaction";
import ErrorPage from "./components/ErrorPage";

const queryClient = new QueryClient()

const router = createBrowserRouter([{
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/keywords',
            element: <KeywordsForm/>
        },
        {
            path: '/address-geocoder',
            element: <AddressGeocoder/>
        },
        {
            path: '/transactions',
            element: <TransactionsTable/>
        },
        {
            path: '/transactions/:transactionId',
            element: <Transaction/>,
            loader: transactionLoader
        }
    ],
}
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen/>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>
)
