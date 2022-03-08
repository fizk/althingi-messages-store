import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { add, update } from '../../src/handlers/Constituency.ts'

// Compact form: name and function
Deno.test("handlers.Constituency.add", async () => {
    await add({
        id: 1,
        index: 'constituency.add',
        body: {
            constituency_id: 1,
            name: 'some name',
            abbr_short: 'abbr_short',
            abbr_long: 'abbr_long',
            description: 'description'
        }
    }, {
        get: (_url: string) => Promise.resolve({})
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                constituency_id: 1,
                name: 'some name',
                abbr_short: 'abbr_short',
                abbr_long: 'abbr_long',
                description: 'description'
            });
            assertEquals(url, '/kjordaemi/1')
            return Promise.resolve(200)
        }
    });
});

Deno.test("handlers.Constituency.update", async () => {
    await update({
        id: 1,
        index: 'constituency.update',
        body: {
            constituency_id: 1,
            name: 'some name',
            abbr_short: 'abbr_short',
            abbr_long: 'abbr_long',
            description: 'description'
        }
    }, {
        get: (_url: string) => Promise.resolve({})
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                constituency_id: 1,
                name: 'some name',
                abbr_short: 'abbr_short',
                abbr_long: 'abbr_long',
                description: 'description'
            });
            assertEquals(url, '/kjordaemi/1')
            return Promise.resolve(200)
        }
    });
});
