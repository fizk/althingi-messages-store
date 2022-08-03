import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { handle } from '../../src/handlers/CommitteeSitting.ts'
import type {
    Messages,
} from '../../src/index.d.ts';

Deno.test("CommitteeSitting.handle", async () => {
    function* generateResponse() {
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 4,
            from: '2001-01-01',
            to: '2001-01-01',
        });
        yield Promise.resolve<Messages.Committee>({
            committee_id: 1,
            name: 'name',
            first_assembly_id: 1,
            last_assembly_id: 1,
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short',
        });
        yield Promise.resolve<Messages.Congressman>({
            congressman_id: 2,
            name: 'congressman_name',
            abbreviation: 'abbr',
            birth: '2001-01-01',
            death: null
        });
        yield Promise.resolve<Messages.Party[]>([{
            party_id: 5,
            name: 'party_name',
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short',
            color: null,
        }]);
        yield Promise.resolve<Messages.Constituency[]>([{
            constituency_id: 3,
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short',
            description: null,
            name: 'constituency_name'
        }]);
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 4,
            from: '2001-01-01',
            to: '2001-01-01',
        });
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 4,
            from: '2001-01-01',
            to: '2001-01-01',
        });

        return Promise.reject({});
    }
    const response = generateResponse();

    await handle({
        id: 1,
        index: 'committee-sitting.add',
        body: {
            committee_sitting_id: 1,
            congressman_id: 2,
            committee_id: 3,
            assembly_id: 4,
            order: 1,
            role: 'role',
            from: '2001-01-01',
            to: '2002-01-01',
        }
    }, {
        get: <T>(_url: string): Promise<T>  => {
            return response.next().value as Promise<T>;
        }
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                committee_sitting_id: 1,
                congressman: {
                    congressman_id: 2,
                    name: 'congressman_name',
                    abbreviation: 'abbr',
                    birth: '2001-01-01',
                    death: null
                },
                congressman_constituency: {
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
                congressman_party: {
                    party_id: 5,
                    name: 'party_name',
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                    color: null,
                },
                committee: {
                    committee_id: 1,
                    name: 'name',
                    first_assembly_id: 1,
                    last_assembly_id: 1,
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                },
                first_committee_assembly: {
                    assembly_id: 4,
                    from: "2001-01-01",
                    to: "2001-01-01",
                },
                last_committee_assembly: {
                    assembly_id: 4,
                    from: "2001-01-01",
                    to: "2001-01-01",
                },
                from: "2001-01-01",
                to: "2002-01-01",
                role: 'role',
                order: 1
            });
            assertEquals(url, '/nefndarseta/1');
            return Promise.resolve(200);
        }
    });
});

Deno.test("CommitteeSitting.handle | only required", async () => {
    function* generateResponse() {
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 4,
            from: '2001-01-01',
            to: '2001-01-01',
        });
        yield Promise.resolve<Messages.Committee>({
            committee_id: 1,
            name: 'name',
            first_assembly_id: null,
            last_assembly_id: null,
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short',
        });
        yield Promise.resolve<Messages.Congressman>({
            congressman_id: 2,
            name: 'congressman_name',
            abbreviation: 'abbr',
            birth: '2001-01-01',
            death: null
        });
        yield Promise.resolve<Messages.Party[]>([{
            party_id: 5,
            name: 'party_name',
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short',
            color: null,
        }]);
        yield Promise.resolve<Messages.Constituency[]>([{
            constituency_id: 3,
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short',
            description: null,
            name: 'constituency_name'
        }]);

        return Promise.reject({});
    }
    const response = generateResponse();

    await handle({
        id: 1,
        index: 'committee-sitting.add',
        body: {
            committee_sitting_id: 1,
            congressman_id: 2,
            committee_id: 3,
            assembly_id: 4,
            order: 1,
            role: 'role',
            from: '2001-01-01',
            to: '2002-01-01',
        }
    }, {
        get: <T>(_url: string): Promise<T>  => {
            return response.next().value as Promise<T>;
        }
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                committee_sitting_id: 1,
                congressman: {
                    congressman_id: 2,
                    name: 'congressman_name',
                    abbreviation: 'abbr',
                    birth: '2001-01-01',
                    death: null
                },
                congressman_constituency: {
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
                congressman_party: {
                    party_id: 5,
                    name: 'party_name',
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                    color: null,
                },
                committee: {
                    committee_id: 1,
                    name: 'name',
                    first_assembly_id: null,
                    last_assembly_id: null,
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                },
                first_committee_assembly: null,
                last_committee_assembly: null,
                from: "2001-01-01",
                to: "2002-01-01",
                role: 'role',
                order: 1
            });
            assertEquals(url, '/nefndarseta/1');
            return Promise.resolve(200);
        }
    });
});

Deno.test("CommitteeSitting.handle | no party or constituency", async () => {
    function* generateResponse() {
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 4,
            from: '2001-01-01',
            to: '2001-01-01',
        });
        yield Promise.resolve<Messages.Committee>({
            committee_id: 1,
            name: 'name',
            first_assembly_id: null,
            last_assembly_id: null,
            abbr_long: 'abbr_long',
            abbr_short: 'abbr_short',
        });
        yield Promise.resolve<Messages.Congressman>({
            congressman_id: 2,
            name: 'congressman_name',
            abbreviation: 'abbr',
            birth: '2001-01-01',
            death: null
        });
        yield Promise.resolve<Messages.Party[]>([]);
        yield Promise.resolve<Messages.Constituency[]>([]);

        return Promise.reject({});
    }
    const response = generateResponse();

    await handle({
        id: 1,
        index: 'committee-sitting.add',
        body: {
            committee_sitting_id: 1,
            congressman_id: 2,
            committee_id: 3,
            assembly_id: 4,
            order: 1,
            role: 'role',
            from: '2001-01-01',
            to: '2002-01-01',
        }
    }, {
        get: <T>(_url: string): Promise<T>  => {
            return response.next().value as Promise<T>;
        }
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                committee_sitting_id: 1,
                congressman: {
                    congressman_id: 2,
                    name: 'congressman_name',
                    abbreviation: 'abbr',
                    birth: '2001-01-01',
                    death: null
                },
                assembly: {
                    assembly_id: 4,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
                congressman_party: null,
                congressman_constituency: null,
                committee: {
                    committee_id: 1,
                    name: 'name',
                    first_assembly_id: null,
                    last_assembly_id: null,
                    abbr_long: 'abbr_long',
                    abbr_short: 'abbr_short',
                },
                first_committee_assembly: null,
                last_committee_assembly: null,
                from: "2001-01-01",
                to: "2002-01-01",
                role: 'role',
                order: 1
            });
            assertEquals(url, '/nefndarseta/1');
            return Promise.resolve(200);
        }
    });
});
