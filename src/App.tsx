import './App.css'
import {Navbar} from "./components/Navbar";
import * as React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SavingsIcon from "@mui/icons-material/Savings";
import {BrowserRouter, Link, Outlet} from "react-router-dom";
import KeywordsForm from "./components/Keywords/KeywordsForm";
import TransactionsTable from "./components/Transactions/TransactionsTable";
import AddressGeocoder from "./components/AddressGeocoder/AddressGeocoder";
import Home from "./components/Home";

export const routes = [
    {path: '/', label: 'Home', icon: <HomeOutlinedIcon/>, component: Home},
    {path: '/keywords', label: 'Keywords', icon: <KeyOutlinedIcon/>, component: KeywordsForm},
    {path: '/address-geocoder', label: 'Address Geocoder', icon: <LocationOnOutlinedIcon/>, component: AddressGeocoder},
    {path: '/transactions', label: 'Transactions', icon: <SavingsIcon/>, component: TransactionsTable},
];

function App() {

    return (
        <>
            <Navbar routes={routes}/>
            <Outlet/>
        </>
    )
}

export default App
