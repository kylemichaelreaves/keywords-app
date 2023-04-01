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
]
