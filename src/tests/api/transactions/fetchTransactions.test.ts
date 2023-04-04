import {vi, test} from 'vitest';
import {fetchTransactions} from "../../../api/transactions/fetchTransactions";
import {rest} from 'msw';
import {server} from "../../test-setup";

describe('fetchTransactions', () => {
    test('should fetch transactions successfully', async ({expect}) => {
        server.use(
        rest.get(`*/transactions/get-transactions`, (req, res, ctx) => {
            const limit = req.url.searchParams.get('limit');
            const offset = req.url.searchParams.get('offset');
            const transactions = [
                {id: 1, description: 'Transaction 1'},
                {id: 2, description: 'Transaction 2'},
            ];
            return res(
                ctx.status(200),
                ctx.json(transactions.slice(Number(offset), Number(offset) + Number(limit))),
            );
        }));

        const limit = 10;
        const offset = 0;

        const result = await fetchTransactions(limit, offset);

        expect(result).toBeDefined();
        expect(result.length).toEqual(2);
    });


    test('should return an error when the request fails', async ({ expect }) => {
        server.use(
            rest.get(`*/transactions/get-transactions`, (req, res, ctx) => {
                return res(ctx.status(500));
            }),
        );

        const limit = 10;
        const offset = 0;

        try {
            await fetchTransactions(limit, offset);
        } catch (error: unknown | any) {
            expect(error).toBeDefined();
            expect(error.message).toBe('AxiosError: Request failed with status code 500');
        }
    })
});
