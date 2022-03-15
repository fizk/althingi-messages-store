import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { handle } from '../../src/handlers/Inflation.ts'

// Compact form: name and function
Deno.test("handlers.Inflation.add", async () => {
    await handle({
        id: 1,
        index: 'inflation.add',
        body: {
            id: 1,
            value: 2,
            date: '2001-01-01',
        }
    }, {
        get: <T>(_url: string): Promise<T> => Promise.resolve({} as T)
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                id: 1,
                value: 2,
                date: '2001-01-01',
            });
            assertEquals(url, '/verdbolga/1')
            return Promise.resolve(200)
        }
    });
});
