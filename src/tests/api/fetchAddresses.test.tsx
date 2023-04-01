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
    const error = new Error('url is not valid');
    server.use(
        rest.get(`*address-geocoder`, (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({ message: error.message }));
        })
    );

    await expect(fetchAddresses(address)).rejects.toThrow(error.message);
});
