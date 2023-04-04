import * as React from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchMonths} from "../api/transactions/fetchMonths";

export function useMonths() {
    return useQuery(
        ['months'],
        () => fetchMonths(), {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        }
    )
}