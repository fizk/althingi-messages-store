import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { add } from '../../src/handlers/Congressman.ts'

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
        get: <T>(_url: string): Promise<T> => Promise.resolve({} as T)
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
