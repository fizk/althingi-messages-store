import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { handle } from '../../src/handlers/PresidentSitting.ts'
import type {
    // Assembly,
    // Congressman,
    // Constituency,
    // Party,
    Messages,
} from '../../src/index.d.ts';

Deno.test("PresidentSitting.handle", async () => {
    function* generateResponse() {
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 3,
            from: '2001-01-01',
            to: '2001-01-01',
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
        index: 'president.add',
        body: {
            president_id: 1,
            congressman_id: 2,
            assembly_id: 3,
            from: '2001-01-01',
            to: null,
            title: 'title',
            abbr: 'abbr',
        }
    }, {
        get: <T>(_url: string): Promise<T>  => {
            return response.next().value as Promise<T>;
        }
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                president_id: 1,
                title: 'title',
                abbr: 'abbr',
                from: '2001-01-01',
                to: null,
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
                    assembly_id: 3,
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
            });
            assertEquals(url, '/forsetaseta/1');
            return Promise.resolve(200);
        }
    });
});

Deno.test("PresidentSitting.handle | no party or constituency", async () => {
    function* generateResponse() {
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 3,
            from: '2001-01-01',
            to: '2001-01-01',
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
        index: 'president.add',
        body: {
            president_id: 1,
            congressman_id: 2,
            assembly_id: 3,
            from: '2001-01-01',
            to: null,
            title: 'title',
            abbr: 'abbr',
        }
    }, {
        get: <T>(_url: string): Promise<T>  => {
            return response.next().value as Promise<T>;
        }
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                president_id: 1,
                title: 'title',
                abbr: 'abbr',
                from: '2001-01-01',
                to: null,
                congressman: {
                    congressman_id: 2,
                    name: 'congressman_name',
                    abbreviation: 'abbr',
                    birth: '2001-01-01',
                    death: null
                },
                congressman_constituency: null,
                congressman_party: null,
                assembly: {
                    assembly_id: 3,
                    from: '2001-01-01',
                    to: '2001-01-01',
                },
            });
            assertEquals(url, '/forsetaseta/1');
            return Promise.resolve(200);
        }
    });
});
