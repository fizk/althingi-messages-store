import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { add, update } from '../../src/handlers/Inflation.ts'

// Compact form: name and function
Deno.test("handlers.Inflation.add", async () => {
    await add({
        id: 1,
        index: 'inflation.add',
        body: {
            id: 1,
            value: 2,
            date: '2001-01-01',
        }
    }, {
        get: (_url: string) => Promise.resolve({})
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

Deno.test("handlers.Inflation.update", async () => {
    await update({
        id: 1,
        index: 'inflation.update',
        body: {
            id: 1,
            value: 2,
            date: '2001-01-01',
        }
    }, {
        get: (_url: string) => Promise.resolve({})
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
