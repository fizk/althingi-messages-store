import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { add, update } from '../../src/handlers/Ministry.ts'

Deno.test("handlers.Ministry.add | incuding first", async () => {
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

Deno.test("handlers.Ministry.add | incuding last", async () => {
    await add({
        id: 1,
        index: 'ministry.add',
        body: {
            ministry_id: 1,
            name: 'ministry',
            abbr_long: 'long',
            abbr_short: 'short',
            first: null,
            last: 2
        }
    }, {
        get: (url: string) => {
            assertEquals(url, '/loggjafarthing/2');
            return Promise.resolve({
                assembly_id: 2,
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
                last: {
                    assembly_id: 2,
                    from: '2001-01-01',
                    ro: '2001-01-01',
                },
                first: null
            });
            assertEquals(url, '/raduneyti/1')
            return Promise.resolve(200)
        }
    });
});

Deno.test("handlers.Ministry.update | including first", async () => {
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

Deno.test("handlers.Ministry.update | including last", async () => {
    await update({
        id: 1,
        index: 'ministry.update',
        body: {
            ministry_id: 1,
            name: 'ministry',
            abbr_long: 'long',
            abbr_short: 'short',
            last: 2,
            first: null
        }
    }, {
        get: (url: string) => {
            assertEquals(url, '/loggjafarthing/2');
            return Promise.resolve({
                assembly_id: 2,
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
                last: {
                    assembly_id: 2,
                    from: '2001-01-01',
                    ro: '2001-01-01',
                },
                first: null
            });
            assertEquals(url, '/raduneyti/1')
            return Promise.resolve(200)
        }
    });
});
