import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { add, update } from '../../src/handlers/Assembly.ts'

// Compact form: name and function
Deno.test("handlers.Assembly.add", async () => {
    await add({
        id: 1,
        index: 'assembly.add',
        body: {
            assembly_id: 1,
            from: '2001-01-01',
            to: '2001-01-01'
        }
    }, {
        get: (_url: string) => Promise.resolve({})
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

Deno.test("handlers.Assembly.update", async () => {
    await update({
        id: 1,
        index: 'assembly.update',
        body: {
            assembly_id: 1,
            from: '2001-01-01',
            to: '2001-01-01'
        }
    }, {
        get: (_url: string) => Promise.resolve({})
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
