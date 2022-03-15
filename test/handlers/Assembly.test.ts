import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { handle } from '../../src/handlers/Assembly.ts';

Deno.test("Assembly.handle", async () => {
    await handle({
        id: 1,
        index: 'assembly.add',
        body: {
            assembly_id: 1,
            from: '2001-01-01',
            to: '2001-01-01'
        }
    }, {
        get: <T>(_url: string) => Promise.resolve({} as T)
    }, {
        put: (url: string, data: unknown) => {
            assertEquals(data, {
                assembly_id: 1,
                from: '2001-01-01',
                to: '2001-01-01'
            });
            assertEquals(url, '/loggjafarthing/1')
            return Promise.resolve(200)
        }
    });
});
