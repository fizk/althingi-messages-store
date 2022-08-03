import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { handle } from '../../src/handlers/PlenaryAgenda.ts';
import type { Messages, } from '../../src/index.d.ts';

Deno.test("PlenaryAgenda.handle", async () => {

    const input = {
        id: 1,
        index: 'plenary-agenda.add',
        body: {
            item_id: 1,
            plenary_id: 2,
            issue_id: 3,
            assembly_id: 4,
            category: 'A',
            iteration_type: '1',
            iteration_continue: '*',
            iteration_comment: 'iteration_comment',
            comment: 'comment',
            comment_type: 'comment_type',
            posed_id: 5,
            posed: 'posed',
            answerer_id: 6,
            answerer: 'answerer',
            counter_answerer_id: 7,
            counter_answerer: 'counter_answerer',
            instigator_id: 8,
            instigator: 'instigator'
        }
    };

    const expected = {
        item_id: 1,
        plenary: {
            plenary_id: 2,
            assembly_id: 4,
            from: '2001-01-01 00:00:00', //('Y-m-d H:i'),
            to: '2001-01-01 00:00:00', //('Y-m-d H:i'),
            name: null
        },
        issue: {
            issue_id: 3,
            assembly_id: 4,
            congressman_id: 100,
            category: 'A',
            name: null,
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
        },
        assembly: {
            assembly_id: 4,
            from: null,
            to: null,
        },
        iteration_type: '1',
        iteration_continue: '*',
        iteration_comment: 'iteration_comment',
        comment: 'comment',
        comment_type: 'comment_type',
        posed: {
            congressman_id: 5,
            name: 'posed name',
            birth: '2001-01-01',
            death: null,
            abbreviation: null,
        },
        posed_party: {
            party_id: 300,
            name: 'posed_party',
            abbr_short: null,
            abbr_long: null,
            color: null,
        },
        posed_constituency: {
            constituency_id: 400,
            name: 'posed_constituency',
            abbr_short: null,
            abbr_long: null,
            description: null,
        },
        posed_title: 'posed',
        answerer: {
            congressman_id: 6,
            name: 'answerer name',
            birth: '2001-01-01',
            death: null,
            abbreviation: null,
        },
        answerer_party: {
            party_id: 300,
            name: 'answerer_party',
            abbr_short: null,
            abbr_long: null,
            color: null,
        },
        answerer_constituency: {
            constituency_id: 400,
            name: 'answerer_constituency',
            abbr_short: null,
            abbr_long: null,
            description: null,
        },
        answerer_title: 'answerer',
        counter_answerer: {
            congressman_id: 7,
            name: 'counter_answerer name',
            birth: '2001-01-01',
            death: null,
            abbreviation: null,
        },
        counter_answerer_party: {
            party_id: 300,
            name: 'counter_answerer_party',
            abbr_short: null,
            abbr_long: null,
            color: null,
        },
        counter_answerer_constituency: {
            constituency_id: 400,
            name: 'counter_answerer_constituency',
            abbr_short: null,
            abbr_long: null,
            description: null,
        },
        counter_answerer_title: 'counter_answerer',
        instigator: {
            congressman_id: 7,
            name: 'instigator name',
            birth: '2001-01-01',
            death: null,
            abbreviation: null,
        },
        instigator_party: {
            party_id: 300,
            name: 'instigator_party',
            abbr_short: null,
            abbr_long: null,
            color: null,
        },
        instigator_constituency: {
            constituency_id: 400,
            name: 'instigator_constituency',
            abbr_short: null,
            abbr_long: null,
            description: null,
        },
        instigator_title: 'instigator',
    };

    function* generateResponse() {
        yield Promise.resolve<Messages.Plenary>({
            plenary_id: 2,
            assembly_id: 4,
            from: '2001-01-01 00:00:00', //('Y-m-d H:i'),
            to: '2001-01-01 00:00:00', //('Y-m-d H:i'),
            name: null
        });
        yield Promise.resolve<Messages.Issue>({
            issue_id: 3,
            assembly_id: 4,
            congressman_id: 100,
            category: 'A',
            name: null,
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
        });
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 4,
            from: null,
            to: null,
        });

        // posed
        yield Promise.resolve<Messages.Congressman>({
            congressman_id: 5,
            name: 'posed name',
            birth: '2001-01-01',
            death: null,
            abbreviation: null,
        });
        yield Promise.resolve<Messages.Party[]>([{
            party_id: 300,
            name: 'posed_party',
            abbr_short: null,
            abbr_long: null,
            color: null,
        }]);
        yield Promise.resolve<Messages.Constituency[]>([{
            constituency_id: 400,
            name: 'posed_constituency',
            abbr_short: null,
            abbr_long: null,
            description: null,
        }]);

        //answerer
        yield Promise.resolve<Messages.Congressman>({
            congressman_id: 6,
            name: 'answerer name',
            birth: '2001-01-01',
            death: null,
            abbreviation: null,
        });
        yield Promise.resolve<Messages.Party[]>([{
            party_id: 300,
            name: 'answerer_party',
            abbr_short: null,
            abbr_long: null,
            color: null,
        }]);
        yield Promise.resolve<Messages.Constituency[]>([{
            constituency_id: 400,
            name: 'answerer_constituency',
            abbr_short: null,
            abbr_long: null,
            description: null,
        }]);

        //counter_answerer
        yield Promise.resolve<Messages.Congressman>({
            congressman_id: 7,
            name: 'counter_answerer name',
            birth: '2001-01-01',
            death: null,
            abbreviation: null,
        });
        yield Promise.resolve<Messages.Party[]>([{
            party_id: 300,
            name: 'counter_answerer_party',
            abbr_short: null,
            abbr_long: null,
            color: null,
        }]);
        yield Promise.resolve<Messages.Constituency[]>([{
            constituency_id: 400,
            name: 'counter_answerer_constituency',
            abbr_short: null,
            abbr_long: null,
            description: null,
        }]);

        //instigator
        yield Promise.resolve<Messages.Congressman>({
            congressman_id: 7,
            name: 'instigator name',
            birth: '2001-01-01',
            death: null,
            abbreviation: null,
        });
        yield Promise.resolve<Messages.Party[]>([{
            party_id: 300,
            name: 'instigator_party',
            abbr_short: null,
            abbr_long: null,
            color: null,
        }]);
        yield Promise.resolve<Messages.Constituency[]>([{
            constituency_id: 400,
            name: 'instigator_constituency',
            abbr_short: null,
            abbr_long: null,
            description: null,
        }]);

        return Promise.reject(new Error('request don\'t line up'));
    }

    const response = generateResponse();

    await handle(input,
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

Deno.test("PlenaryAgenda.handle | missing values", async () => {

    const input = {
        id: 1,
        index: 'plenary-agenda.add',
        body: {
            item_id: 1,
            plenary_id: 2,
            issue_id: 3,
            assembly_id: 4,
            category: 'A',
            iteration_type: '1',
            iteration_continue: '*',
            iteration_comment: 'iteration_comment',
            comment: 'comment',
            comment_type: 'comment_type',
            posed_id: null,
            posed: null,
            answerer_id: null,
            answerer: null,
            counter_answerer_id: null,
            counter_answerer: null,
            instigator_id: null,
            instigator: null,
        }
    };

    const expected = {
        item_id: 1,
        plenary: {
            plenary_id: 2,
            assembly_id: 4,
            from: '2001-01-01 00:00:00', //('Y-m-d H:i'),
            to: '2001-01-01 00:00:00', //('Y-m-d H:i'),
            name: null
        },
        issue: {
            issue_id: 3,
            assembly_id: 4,
            congressman_id: 100,
            category: 'A',
            name: null,
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
        },
        assembly: {
            assembly_id: 4,
            from: null,
            to: null,
        },
        iteration_type: '1',
        iteration_continue: '*',
        iteration_comment: 'iteration_comment',
        comment: 'comment',
        comment_type: 'comment_type',
        posed: null,
        posed_party: null,
        posed_constituency: null,
        posed_title: null,
        answerer: null,
        answerer_party: null,
        answerer_constituency: null,
        answerer_title: null,
        counter_answerer: null,
        counter_answerer_party: null,
        counter_answerer_constituency: null,
        counter_answerer_title: null,
        instigator: null,
        instigator_party: null,
        instigator_constituency: null,
        instigator_title: null,
    };

    function* generateResponse() {
        yield Promise.resolve<Messages.Plenary>({
            plenary_id: 2,
            assembly_id: 4,
            from: '2001-01-01 00:00:00', //('Y-m-d H:i'),
            to: '2001-01-01 00:00:00', //('Y-m-d H:i'),
            name: null
        });
        yield Promise.resolve<Messages.Issue>({
            issue_id: 3,
            assembly_id: 4,
            congressman_id: 100,
            category: 'A',
            name: null,
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
        });
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 4,
            from: null,
            to: null,
        });

        return Promise.reject(new Error('request don\'t line up'));
    }

    const response = generateResponse();

    await handle(input,
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
