import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { handle } from '../../src/handlers/Committee.ts';

Deno.test("Committee.handle | incuding first", async () => {
    await handle({
        id: 1,
        index: 'committee.add',
        body: {
            committee_id: 1,
            name: 'name',
            first_assembly_id: 2,
            last_assembly_id: null,
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short'
        }
    }, {
        get: <T>(url: string): Promise<T> => {
            assertEquals(url, '/loggjafarthing/2');
            return Promise.resolve({
                assembly_id: 2,
                from: '2001-01-01',
                to: '2001-01-01',
            } as unknown as T)
        }
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                committee_id: 1,
                name: 'name',
                abbr_long: 'abbr_long',
                abbr_short: 'abbr_short',
                first: {
                    assembly_id: 2,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
                last: null
            });
            assertEquals(url, '/nefndir/1')
            return Promise.resolve(200)
        }
    });
});

Deno.test("Committee.add | incuding last", async () => {
    await handle({
        id: 1,
        index: 'committee.add',
        body: {
            committee_id: 1,
            name: 'name',
            first_assembly_id: null,
            last_assembly_id: 3,
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short'
        }
    }, {
        get: <T>(url: string): Promise<T> => {
            assertEquals(url, '/loggjafarthing/3');
            return Promise.resolve({
                assembly_id: 3,
                from: '2001-01-01',
                to: '2001-01-01',
            } as unknown as T)
        }
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                committee_id: 1,
                name: 'name',
                abbr_long: 'abbr_long',
                abbr_short: 'abbr_short',
                last: {
                    assembly_id: 3,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
                first: null
            });
            assertEquals(url, '/nefndir/1')
            return Promise.resolve(200)
        }
    });
});
