import {vi, test} from 'vitest';
import {rest} from 'msw';
import {fetchMemos} from "../../../api/transactions/fetchMemos";
import {server} from "../../test-setup";

describe('fetchMemos', () => {

    test("fetchMemos: handles an error response", async () => {
        server.use(
            rest.get(
                `*/transactions/get-memos`,
                (req, res, ctx) => {
                    return res(ctx.status(500));
                }
            )
        );

        await expect(fetchMemos()).rejects.toThrow();
    });


    test("fetchMemos: successfully fetches memos", async () => {
        server.use(
            rest.get(
                `*/transactions/get-memos`,
                (req, res, ctx) => {
                    return res(ctx.status(200), ctx.json(['Test Memo 1', 'Test Memo 2']));
                }
            )
        );

        const result = await fetchMemos();

        expect(result).toHaveLength(2);
        expect(result[0]).toBe("Test Memo 1");
        expect(result[1]).toBe("Test Memo 2");
    });


})