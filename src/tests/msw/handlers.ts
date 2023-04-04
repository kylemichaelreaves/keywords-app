import {rest} from 'msw'
import {AddressResponse} from "../../types";
import {addressesMock} from "../data/addressMock";

export const handlers = [
    rest.get('*/address-geocoder', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json<AddressResponse[]>(addressesMock))
    }),
    //     handle errors
    rest.get('*', (req, res, ctx) => {
        console.error(`Unhandled request: ${req.url.toString()}`);
        return res(ctx.status(500));
    }),

    rest.get('*/transactions/get-memos', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(['Test Memo 1', 'Test Memo 2']))
    }),

    rest.get('*/transactions/get-months', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(['01/2021', '01/2022']))
    }),
]
