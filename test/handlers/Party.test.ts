import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { add, update } from '../../src/handlers/Party.ts'

// Compact form: name and function
Deno.test("handlers.Party.add", async () => {
    await add({
        id: 1,
        index: 'party.add',
        body: {
            party_id: 1,
            name: 'party name',
            abbr_long: 'long',
            abbr_short: 'short',
            color: null
        }
    }, {
        get: (_url: string) => Promise.resolve({})
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                party_id: 1,
                name: 'party name',
                abbr_long: 'long',
                abbr_short: 'short',
                color: null
            });
            assertEquals(url, '/thingflokkar/1')
            return Promise.resolve(200)
        }
    });
});

Deno.test("handlers.Party.update", async () => {
    await update({
        id: 1,
        index: 'party.update',
        body: {
            party_id: 1,
            name: 'party name',
            abbr_long: 'long',
            abbr_short: 'short',
            color: null
        }
    }, {
        get: (_url: string) => Promise.resolve({})
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                party_id: 1,
                name: 'party name',
                abbr_long: 'long',
                abbr_short: 'short',
                color: null
            });
            assertEquals(url, '/thingflokkar/1')
            return Promise.resolve(200)
        }
    });
});
