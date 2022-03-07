import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { add, update } from '../../src/handlers/Ministry.ts'

// Compact form: name and function
Deno.test("handlers.Ministry.add", async () => {
    await add({
        id: 1,
        index: 'ministry.add',
        body: {
            ministry_id: 1,
            name: 'ministry',
            abbr_long: 'long',
            abbr_short: 'short',
            first: 1,
            last: null
        }
    }, {
        get: (url: string) => {
            assertEquals(url, '/loggjafarthing/1');
            return Promise.resolve({
                assembly_id: 1,
                from: '2001-01-01',
                ro: '2001-01-01',
            })
        }
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                ministry_id: 1,
                name: 'ministry',
                abbr_long: 'long',
                abbr_short: 'short',
                first: {
                    assembly_id: 1,
                    from: '2001-01-01',
                    ro: '2001-01-01',
                },
                last: null
            });
            assertEquals(url, '/raduneyti/1')
            return Promise.resolve(200)
        }
    });
});

Deno.test("handlers.Ministry.update", async () => {
    await update({
        id: 1,
        index: 'ministry.update',
        body: {
            ministry_id: 1,
            name: 'ministry',
            abbr_long: 'long',
            abbr_short: 'short',
            first: 1,
            last: null
        }
    }, {
        get: (url: string) =>{
            assertEquals(url, '/loggjafarthing/1');
            return Promise.resolve({
                assembly_id: 1,
                from: '2001-01-01',
                ro: '2001-01-01',
            })
        }
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                ministry_id: 1,
                name: 'ministry',
                abbr_long: 'long',
                abbr_short: 'short',
                first: {
                    assembly_id: 1,
                    from: '2001-01-01',
                    ro: '2001-01-01',
                },
                last: null
            });
            assertEquals(url, '/raduneyti/1')
            return Promise.resolve(200)
        }
    });
});
