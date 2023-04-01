import { test } from 'vitest';
import { rest } from 'msw';
import {fetchAddresses} from "../../api/addresses/fetchAddresses";
import { AddressFields } from '../../types';
import {server} from "../test-setup";

test('fetchAddresses > should call the API with the correct parameters', async ({ expect }) => {
    const address: AddressFields = {
        streetAddress: '123 Main St',
        unitOrAptNum: 'Apt 4B',
        municipality: 'Anytown',
        state: 'CA',
        zipcode: '12345',
    };

    const apiGatewayURL = 'https://test-api.example.com';

    server.use(
        rest.get(`${apiGatewayURL}/address-geocoder`, (req, res, ctx) => {
            expect(req.url.searchParams.toString()).toBe(new URLSearchParams(Object.entries(address)).toString());
            return res(ctx.json('mockedData'));
        }),
    );

    const result = await fetchAddresses(address, apiGatewayURL);
    expect(result).toBe('mockedData');
});

// src/tests/fetchAddresses.test.tsx

test('fetchAddresses > should call the API with the correct parameters', async ({ expect }) => {
    const address: AddressFields = {
        streetAddress: '123 Main St',
        unitOrAptNum: 'Apt 4B',
        municipality: 'Anytown',
        state: 'CA',
        zipcode: '12345',
    };

    const apiGatewayURL = 'https://test-api.example.com';

    server.use(
        rest.get(`${apiGatewayURL}/address-geocoder`, (req, res, ctx) => {
            const assembledParams = req.url.searchParams.toString();
            const expectedParams = new URLSearchParams(Object.entries(address)).toString();
            return res(ctx.json({ assembledParams, expectedParams }));
        }),
    );

    const result = await fetchAddresses(address, apiGatewayURL);
    expect(result.assembledParams).toBe(result.expectedParams);
});



test('fetchAddresses > should throw an error if the API call fails', async ({ expect }) => {
    const address: AddressFields = {
        streetAddress: '123 Main St',
        unitOrAptNum: 'Apt 4B',
        municipality: 'Anytown',
        state: 'CA',
        zipcode: '12345',
    };

    // Mock failed API response
    const error = new Error('AxiosError: Request failed with status code 500');
    server.use(
        rest.get(`*address-geocoder`, (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({ message: error.message }));
        })
    );

    await expect(fetchAddresses(address)).rejects.toThrow(error.message);
});



test('fetchAddresses > should assign a valid URL when not supplied', async ({ expect }) => {
    const address: AddressFields = {
        streetAddress: '123 Main St',
        unitOrAptNum: 'Apt 4B',
        municipality: 'Anytown',
        state: 'CA',
        zipcode: '12345',
    };

    const apiGatewayURL = 'https://test-api.example.com';

    import.meta.env.VITE_APIGATEWAY_URL = apiGatewayURL;

    let assignedURL: string | undefined;

    server.use(
        rest.get(`${apiGatewayURL}/address-geocoder`, (req, res, ctx) => {
            assignedURL = req.url.origin;
            return res(ctx.json({ success: true }));
        }),
    );

    await fetchAddresses(address); // Call the function without supplying a URL
    expect(assignedURL).toBe(apiGatewayURL);
});

test('fetchAddresses > should throw an error if no URL is supplied and VITE_APIGATEWAY_URL is not defined', async ({ expect }) => {
    const address: AddressFields = {
        streetAddress: '123 Main St',
        unitOrAptNum: 'Apt 4B',
        municipality: 'Anytown',
        state: 'CA',
        zipcode: '12345',
    };

    delete import.meta.env.VITE_APIGATEWAY_URL;

    await expect(fetchAddresses(address)).rejects.toThrow('VITE_APIGATEWAY_URL is not defined');
});
