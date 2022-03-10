import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { add, update } from '../../src/handlers/CongressmanSitting.ts'
import type {
    Assembly,
    Congressman,
    Constituency,
    Party
} from '../../src/index.d.ts';

function* generateResponse() {
    yield Promise.resolve<Assembly>({
        assembly_id: 4,
        from: '2001-01-01',
        to: '2001-01-01',
    });
    yield Promise.resolve<Congressman>({
        congressman_id: 2,
        name: 'congressman_name',
        abbreviation: 'abbr',
        birth: '2001-01-01',
        death: null
    });
    yield Promise.resolve<Constituency>({
        constituency_id: 3,
        abbr_long: 'abbr_long',
        abbr_short: 'abbr_short',
        description: null,
        name: 'constituency_name'
    });
    yield Promise.resolve<Party>({
        party_id: 5,
        name: 'party_name',
        abbr_long: 'abbr_long',
        abbr_short: 'abbr_short',
        color: null,
    });

    return Promise.reject({});
}

// Compact form: name and function
Deno.test("handlers.CongressmanSitting.add", async () => {
    const response = generateResponse();

    await add({
        id: 1,
        index: 'congressman-sitting.add',
        body: {
            session_id: 1,
            congressman_id: 2,
            constituency_id: 3,
            assembly_id: 4,
            party_id: 5,
            from: "2001-01-01",
            to: "2001-01-01",
            type: "type",
            abbr: "abbr",
        }
    }, {
        get: (_url: string): Promise<Record<string, unknown>>  => {
            return response.next().value as Promise<Record<string, unknown>>;
        }
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                session_id: 1,
                congressman: {
                    congressman_id: 2,
                    name: 'congressman_name',
                    abbreviation: 'abbr',
                    birth: '2001-01-01',
                    death: null
                },
                constituency: {
                    constituency_id: 3,
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                    description: null,
                    name: 'constituency_name'
                },
                assembly: {
                    assembly_id: 4,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
                party: {
                    party_id: 5,
                    name: 'party_name',
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                    color: null,
                },
                from: "2001-01-01",
                to: "2001-01-01",
                type: "type",
                abbr: "abbr",
            });
            assertEquals(url, '/thingseta/1')
            return Promise.resolve(200)
        }
    });
});

Deno.test("handlers.CongressmanSitting.update", async () => {
    const response = generateResponse();

    await update({
        id: 1,
        index: 'congressman-sitting.update',
        body: {
            session_id: 1,
            congressman_id: 2,
            constituency_id: 3,
            assembly_id: 4,
            party_id: 5,
            from: "2001-01-01",
            to: "2001-01-01",
            type: "type",
            abbr: "abbr",
        }
    }, {
        get: (_url: string): Promise<Record<string, unknown>>  => {
            return response.next().value as Promise<Record<string, unknown>>;
        }
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                session_id: 1,
                congressman: {
                    congressman_id: 2,
                    name: 'congressman_name',
                    abbreviation: 'abbr',
                    birth: '2001-01-01',
                    death: null
                },
                constituency: {
                    constituency_id: 3,
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                    description: null,
                    name: 'constituency_name'
                },
                assembly: {
                    assembly_id: 4,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
                party: {
                    party_id: 5,
                    name: 'party_name',
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                    color: null,
                },
                from: "2001-01-01",
                to: "2001-01-01",
                type: "type",
                abbr: "abbr",
            });
            assertEquals(url, '/thingseta/1')
            return Promise.resolve(200)
        }
    });
});

