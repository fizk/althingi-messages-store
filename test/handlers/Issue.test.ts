import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { add } from '../../src/handlers/Issue.ts';
import type { Messages, } from '../../src/index.d.ts';

Deno.test("Issue.handle", async () => {
    const input = {
        id: '',
        index: '',
        body: {
            issue_id: 3,
            assembly_id: 1,
            congressman_id: 2,
            category: 'A',
            name: 'Issue name',
            sub_name: null,
            type: null,
            type_name: null,
            type_subname: null,
            status: null,
            question: null,
            goal: null,
            major_changes: null,
            changes_in_law: null,
            costs_and_revenues: null,
            deliveries: null,
            additional_information: null,
        }
    };

    const expected = {
        assembly: {
            assembly_id: 1,
            from: '2001-01-01',
            to: '2001-01-01',
        },
        congressman: {
            congressman_id: 2,
            name: 'string',
            birth: '2001-01-01',
            death: null,
            abbreviation: 'abbreviation',
        },
        issue_id: 3,
        category: 'a',
        name: 'Issue name',
        sub_name: null,
        type: null,
        type_name: null,
        type_subname: null,
        status: null,
        question: null,
        goal: null,
        major_changes: null,
        changes_in_law: null,
        costs_and_revenues: null,
        deliveries: null,
        additional_information: null,
        content_categories: [],
        content_super_categories: [],
        proponents: []
    }

    function* generateResponse() {
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 1,
            from: '2001-01-01',
            to: '2001-01-01',
        });
        yield Promise.resolve<Messages.Congressman>({
            congressman_id: 2,
            name: 'string',
            birth: '2001-01-01',
            death: null,
            abbreviation: 'abbreviation',
        });

        return Promise.reject({});
    }
    const response = generateResponse();

    await add(input,
    {
        get: <T>(_url: string): Promise<T> => {
            return response.next().value as Promise<T>;
        }
    }, {
        put: (_url: string, data: unknown) => {
            assertEquals(data, expected);
            // @todo the PUT URL
            // assertEquals(url, '/nefndarseta/1');
            return Promise.resolve(200);
        }
    });
});
