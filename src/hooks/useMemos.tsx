import * as React from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchMemos} from "../api/transactions/fetchMemos";

export function useMemos() {
    return useQuery(
        ['memos'],
        () => fetchMemos(), {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        }
    )
}