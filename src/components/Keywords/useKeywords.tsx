import * as React from 'react';
import axios from 'axios';
import {useQuery} from "@tanstack/react-query";
import {ChipListProps} from "../ChipList";

export const URL = `${import.meta.env.VITE_API_GATEWAY_DEV}/keywords/finder`;

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        statusCode: 200,
    },
}
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

interface KeywordsInterface {
    keywords: string[]
}

export const blankKeywords: KeywordsInterface = {
    keywords: ['']
}

export interface KeywordInterface {
    keyword: string
}

export const blankKeyword: KeywordInterface = {
    keyword: ''
}

export const fetchKeywords = async (keyword: string): Promise<ChipListProps> => {
    // if the keywords.keywords is empty, throw an error
    return typeof keyword === 'undefined'
        ? Promise.reject('No keywords')
        : await axios
            .get(`${URL}?keywords=${keyword}`)
            .then((response) => response.data);
}

export default function useKeywords(keyword: string) {
    return useQuery(["keywords", keyword], () => fetchKeywords(keyword), {
        enabled: false,
        staleTime: 5000
    }).data;
}