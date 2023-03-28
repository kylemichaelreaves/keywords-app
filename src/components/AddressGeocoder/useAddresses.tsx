import * as React from 'react';
import {useQuery} from "@tanstack/react-query";
import axios from 'axios';
import {AddressFields} from "../../types";


const URL = import.meta.env.VITE_APIGATEWAY_URL

async function fetchAddresses(address: AddressFields) {
    return address === undefined
        ? Promise.reject(new Error('addressFields is undefined'))
        : await axios.get(`${URL}/address-geocoder`, {params: address})
            .then(res => res.data)
            .catch(err => {
                console.log(err);
                throw err;
            });
}

export function useAddress(addressFields: AddressFields) {
    return useQuery(
        ['address', addressFields],
        () => fetchAddresses(addressFields), {
            enabled: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        }
    )
}
