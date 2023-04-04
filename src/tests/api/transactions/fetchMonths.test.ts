import {test} from 'vitest';
import {rest} from 'msw';
import {fetchMonths} from '../../../api/transactions/fetchMonths';
import {server} from "../../test-setup";

describe('fetchMonths', () => {
    test('returns an array of months', async ({ expect }) => {
        server.use(
            rest.get('*/transactions/get-months', (req, res, ctx) => {
                return res(ctx.json(['2021-01', '2021-02']), ctx.status(200));
            }),
        );

        const result = await fetchMonths();

        expect(result).toEqual(['2021-01', '2021-02']);
    });

    test('returns an error message if the request fails', async ({ expect }) => {
        server.use(
            rest.get('*/transactions/get-months', (req, res, ctx) => {
                return res(ctx.status(500));
            }),
        );

        try {
            await fetchMonths();
        } catch (error: any) {
            expect(error.message).toEqual('AxiosError: Request failed with status code 500');
        }
    });

})