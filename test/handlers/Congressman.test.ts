import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { add, update } from '../../src/handlers/Congressman.ts'

// Compact form: name and function
Deno.test("handlers.Congressman.add", async () => {
    await add({
        id: 1,
        index: 'congressman.add',
        body: {
            congressman_id: 1,
            name: 'string',
            birth: '2001-01-01',
            death: null,
            abbreviation: 'abbr'
        }
    }, {
        get: (_url: string) => Promise.resolve({})
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                congressman_id: 1,
                name: 'string',
                birth: '2001-01-01',
                death: null,
                abbreviation: 'abbr'
            });
            assertEquals(url, '/thingmenn/1')
            return Promise.resolve(200)
        }
    });
});

Deno.test("handlers.Congressman.update", async () => {
    await update({
        id: 1,
        index: 'assembly.update',
        body: {
            congressman_id: 1,
            name: 'string',
            birth: '2001-01-01',
            death: null,
            abbreviation: 'abbr'
        }
    }, {
        get: (_url: string) => Promise.resolve({})
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                congressman_id: 1,
                name: 'string',
                birth: '2001-01-01',
                death: null,
                abbreviation: 'abbr'
            });
            assertEquals(url, '/thingmenn/1')
            return Promise.resolve(200)
        }
    });
});
