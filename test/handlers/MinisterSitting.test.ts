import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { handle } from '../../src/handlers/MinisterSitting.ts';
import type {
    // Assembly,
    // Congressman ,
    // Ministry,
    // Constituency,
    // Party,
    Messages
} from '../../src/index.d.ts';

Deno.test("MinisterSitting.handle", async () => {
    function* generateResponse() {
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 2,
            from: '2001-01-01',
            to: '2001-01-01',
        });
        yield Promise.resolve<Messages.Congressman>({
            congressman_id: 3,
            name: 'congressman_name',
            abbreviation: 'abbr',
            birth: '2001-01-01',
            death: null
        });
        yield Promise.resolve<Messages.Ministry>({
            ministry_id: 4,
            name: 'name',
            abbr_short: 'abbr_short',
            abbr_long: 'abbr_long',
            first: 10,
            last: 20,
        });
        yield Promise.resolve<Messages.Constituency[]>([{
            constituency_id: 3,
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short',
            description: null,
            name: 'constituency_name'
        }]);
        yield Promise.resolve<Messages.Party>({
            party_id: 5,
            name: 'party_name',
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short',
            color: null,
        });
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 10,
            from: '2001-01-01',
            to: '2001-01-01',
        });
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 20,
            from: '2001-01-01',
            to: '2001-01-01',
        });

        return Promise.reject({});
    }
    const response = generateResponse();


    await handle({
        id: 1,
        index: 'minister-sitting.add',
        body: {
            minister_sitting_id: 1,
            assembly_id: 2,
            congressman_id: 3,
            ministry_id: 4,
            party_id: 5,
            from: '2001-01-01',
            to: null
        }
    }, {
        get: <T>(_url: string) => response.next().value as Promise<T>
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                minister_sitting_id: 1,
                from: '2001-01-01',
                to: null,
                assembly: {
                    assembly_id: 2,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
                congressman: {
                    congressman_id: 3,
                    name: 'congressman_name',
                    abbreviation: 'abbr',
                    birth: '2001-01-01',
                    death: null
                },
                ministry: {
                    ministry_id: 4,
                    name: 'name',
                    abbr_short: 'abbr_short',
                    abbr_long: 'abbr_long',
                    first: 10,
                    last: 20,
                },
                congressman_constituency: {
                    constituency_id: 3,
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                    description: null,
                    name: 'constituency_name'
                },
                congressman_party: {
                    party_id: 5,
                    name: 'party_name',
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                    color: null,
                },
                first_ministry_assembly: {
                    assembly_id: 10,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
                last_ministry_assembly: {
                    assembly_id: 20,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
            });
            assertEquals(url, '/radherraseta/1')
            return Promise.resolve(200)
        }
    });
});

Deno.test("MinisterSitting.handle | no constituency, no party", async () => {
    function* generateResponse() {
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 2,
            from: '2001-01-01',
            to: '2001-01-01',
        });
        yield Promise.resolve<Messages.Congressman>({
            congressman_id: 3,
            name: 'congressman_name',
            abbreviation: 'abbr',
            birth: '2001-01-01',
            death: null
        });
        yield Promise.resolve<Messages.Ministry>({
            ministry_id: 4,
            name: 'name',
            abbr_short: 'abbr_short',
            abbr_long: 'abbr_long',
            first: 10,
            last: 20,
        });
        yield Promise.resolve<Messages.Constituency[]>([]);
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 10,
            from: '2001-01-01',
            to: '2001-01-01',
        });
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 20,
            from: '2001-01-01',
            to: '2001-01-01',
        });

        return Promise.reject({});
    }
    const response = generateResponse();


    await handle({
        id: 1,
        index: 'minister-sitting.add',
        body: {
            minister_sitting_id: 1,
            assembly_id: 2,
            congressman_id: 3,
            ministry_id: 4,
            party_id: null,
            from: '2001-01-01',
            to: null
        }
    }, {
        get: <T>(_url: string) => response.next().value as Promise<T>
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                minister_sitting_id: 1,
                from: '2001-01-01',
                to: null,
                assembly: {
                    assembly_id: 2,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
                congressman: {
                    congressman_id: 3,
                    name: 'congressman_name',
                    abbreviation: 'abbr',
                    birth: '2001-01-01',
                    death: null
                },
                ministry: {
                    ministry_id: 4,
                    name: 'name',
                    abbr_short: 'abbr_short',
                    abbr_long: 'abbr_long',
                    first: 10,
                    last: 20,
                },
                congressman_constituency: null,
                congressman_party: null,
                first_ministry_assembly: {
                    assembly_id: 10,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
                last_ministry_assembly: {
                    assembly_id: 20,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
            });
            assertEquals(url, '/radherraseta/1')
            return Promise.resolve(200)
        }
    });
});

Deno.test("MinisterSitting.handle | no ministry assembly", async () => {
    function* generateResponse() {
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 2,
            from: '2001-01-01',
            to: '2001-01-01',
        });
        yield Promise.resolve<Messages.Congressman>({
            congressman_id: 3,
            name: 'congressman_name',
            abbreviation: 'abbr',
            birth: '2001-01-01',
            death: null
        });
        yield Promise.resolve<Messages.Ministry>({
            ministry_id: 4,
            name: 'name',
            abbr_short: 'abbr_short',
            abbr_long: 'abbr_long',
            first: null,
            last: null,
        });
        yield Promise.resolve<Messages.Constituency[]>([{
            constituency_id: 3,
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short',
            description: null,
            name: 'constituency_name'
        }]);
        yield Promise.resolve<Messages.Party>({
            party_id: 5,
            name: 'party_name',
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short',
            color: null,
        });

        return Promise.reject({});
    }
    const response = generateResponse();


    await handle({
        id: 1,
        index: 'minister-sitting.add',
        body: {
            minister_sitting_id: 1,
            assembly_id: 2,
            congressman_id: 3,
            ministry_id: 4,
            party_id: 5,
            from: '2001-01-01',
            to: null
        }
    }, {
        get: <T>(_url: string) => response.next().value as Promise<T>
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                minister_sitting_id: 1,
                from: '2001-01-01',
                to: null,
                assembly: {
                    assembly_id: 2,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
                congressman: {
                    congressman_id: 3,
                    name: 'congressman_name',
                    abbreviation: 'abbr',
                    birth: '2001-01-01',
                    death: null
                },
                ministry: {
                    ministry_id: 4,
                    name: 'name',
                    abbr_short: 'abbr_short',
                    abbr_long: 'abbr_long',
                    first: null,
                    last: null,
                },
                congressman_constituency: {
                    constituency_id: 3,
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                    description: null,
                    name: 'constituency_name'
                },
                congressman_party: {
                    party_id: 5,
                    name: 'party_name',
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                    color: null,
                },
                first_ministry_assembly: null,
                last_ministry_assembly: null,
            });
            assertEquals(url, '/radherraseta/1')
            return Promise.resolve(200)
        }
    });
});
