import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { handle } from '../../src/handlers/Plenary.ts';
import type { Messages, } from '../../src/index.d.ts';

Deno.test("Plenary.handle", async () => {
    const input = {
        id: 1,
        index: 'assembly.add',
        body: {
            plenary_id: 1,
            assembly_id: 2,
            from: null, //('Y-m-d H:i'),
            to: null, //('Y-m-d H:i'),
            name: null,
        }
    }
    const expected = {
        plenary_id: 1,
        assembly: {
            assembly_id: 2,
            from: '2001-01-01',
            to: '2001-01-01',
        },
        from: null,
        to: null,
        name: null,
    };

    function* generateResponse() {
        yield Promise.resolve<Messages.Assembly>({
            assembly_id: 2,
            from: '2001-01-01',
            to: '2001-01-01',
        });

        return Promise.reject(new Error('request don\'t line up'));
    }

    const response = generateResponse();

    await handle(input, {
        get: <T>(_url: string): Promise<T> => {
            return response.next().value as Promise<T>;
        }
    }, {
        put: (_url: string, data: unknown) => {
            assertEquals(data, expected);
            // @todo the PUT URL
            // assertEquals(url, '/loggjafarthing/1')
            return Promise.resolve(200)
        }
    });
});
