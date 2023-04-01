import * as React from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchAddresses} from "../api/addresses/fetchAddresses";
import {AddressFields} from "../types";

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

