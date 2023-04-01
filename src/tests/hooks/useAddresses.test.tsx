import React from 'react';
import {setupServer} from 'msw/node';
import {test} from 'vitest';
import {waitFor, renderHook} from '@testing-library/react';
import {AddressFields} from '../../types';
import {useAddress} from "../../hooks/useAddresses";
import {rest} from "msw";
import {createQueryProviderWrapper} from "../create-query-client-wrapper";

export const server = setupServer(
    rest.get('*', (req, res, ctx) => {
        console.error(`Unhandled request: ${req.url.toString()}`);
        return res(ctx.status(500));
    }),
);

test('useAddress > fetches data when refetch is called', async () => {
    server.use(
        rest.get(`*/address-geocoder`, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({result: 'mocked data'}));
        })
    );

    const validAddress: AddressFields = {
        streetAddress: '274 Main St',
        unitOrAptNum: '',
        municipality: 'Hackensack',
        state: 'NJ',
        zipcode: '07601',
    };

    const {result} = renderHook(() => useAddress(validAddress), {wrapper: createQueryProviderWrapper()});

    await waitFor(() => result.current.refetch(), {timeout: 6000});

    expect(result.current.isLoading).toBe(true);
});

test('useAddress > throws an error if the lambda has returned an error', async () => {
    const invalidAddress: AddressFields = {
        streetAddress: '123 Main St',
        unitOrAptNum: 'Apt 4B',
        municipality: 'Anytown',
        state: 'CA',
        zipcode: '12345'
    };

    const {result} = renderHook(() => useAddress(invalidAddress), {wrapper: createQueryProviderWrapper()});

    await waitFor(() => result.current.refetch(), {timeout: 6000});

    expect(result.current.data).toBeUndefined();

});

