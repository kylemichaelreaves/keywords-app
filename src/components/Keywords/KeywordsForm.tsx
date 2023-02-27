import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {blankKeyword, fetchKeywords, KeywordInterface} from "./useKeywords";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ChipList, {ChipListProps} from "../ChipList";

export default function KeywordsForm() {

    const queryClient = useQueryClient();

    const [keywords, setKeywords] = React.useState('');
    const {
        isFetching,
        isError,
        data,
        status,
        refetch,
        error
    } =
        useQuery<ChipListProps, AxiosError>(
            ['keywords', keywords],
            () => fetchKeywords(keywords),
            {
                enabled: false,
                // keepPreviousData: true,
                staleTime: 5000
            }
        )
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setKeywords(event.currentTarget.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        refetch();
    }

    const todos: string[] = [
        'Move the nltk data to a folder inside of the SAM project',
        `The <code>Button</code> should be disabled when the input is empty.`,
        `An <code>Alert</code> should be displayed when the input is empty.`,
        `useQuery should use <code>disabled: true</code> in its options, to avoid fetching on mount`,
        'the keywords should be debounced so the lambda is not called on every keystroke',
        `keywords should be returned in a clickable <code>ChipArray</code>`,
        `A <code>LoadingButton</code> should be displayed when the query is fetching`,
    ]

    return (
        <>
            <h2>KeywordsForm</h2>
            {keywords ? keywords :
                <Alert severity="warning">
                    <AlertTitle>Empty Keyword Input!</AlertTitle>
                    You haven't entered an input yet.
                </Alert>
            }{
                data ? <ChipList keywords={data.keywords} /> : null
            }
            <form onSubmit={handleSubmit}>
                <TextField
                    id="filled-hidden-label-small"
                    name="keyword"
                    placeholder="enter a keyword"
                    value={keywords}
                    onChange={handleChange}
                >
                </TextField>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={isFetching || !keywords}
                >{
                    isFetching ? <CircularProgress/> : "Find Keywords"
                }
                </Button>
            </form>
        </>
    );
}