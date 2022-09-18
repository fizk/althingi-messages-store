import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { add } from '../../src/handlers/IssueCategory.ts';
import type { Messages, } from '../../src/index.d.ts';

Deno.test("IssueCategory.add", async () => {
    const input = {
        id: '',
        index: '',
        body: {
            category_id: 1,
            issue_id: 1,
            assembly_id: 1,
            category: 'a',
        }
    };

    function* generateSourceResponse() {
        yield Promise.resolve<Messages.Category>({
            category_id: 1,
            super_category_id: 2,
            description: '',
            title: ''
        });
        yield Promise.resolve<Messages.SuperCategory>({
            super_category_id: 2,
            title: ''
        });

        return Promise.reject(new Error('Invalid client call'));
    }
    const sourceResponse = generateSourceResponse();

    function* generateStoreResponse() {
        yield {
            data:{
                category_id: 1,
                super_category_id: 2,
                description: '',
                title: ''
            },
            url: `/loggjafarthing/1/thingmal/a/1/efnisflokkar`,
        };
        yield {
            data: {
                super_category_id: 2,
                title: ''
            },
            url: `/loggjafarthing/1/thingmal/a/1/efnishopar`
        };

        return new Error('Invalid client call');
    }
    const storeResponse = generateStoreResponse();

    await add(input,
    {
        get: <T>(_url: string): Promise<T> => {
            return sourceResponse.next().value as Promise<T>;
        }
    }, {
        put: <T>(url: string, data: unknown) => {
            const response = storeResponse.next().value as T | Error;
            assertEquals(data, (response as unknown as {data: T})?.data);
            assertEquals(url, (response as unknown as {url: string})?.url);
            // @todo the PUT URL
            // assertEquals(url, '/nefndarseta/1');
            return Promise.resolve(200);
        }
    });
});

Deno.test("IssueCategory.add | no super category", async () => {
    const input = {
        id: '',
        index: '',
        body: {
            category_id: 1,
            issue_id: 1,
            assembly_id: 1,
            category: 'a',
        }
    };

    function* generateSourceResponse() {
        yield Promise.resolve<Messages.Category>({
            category_id: 1,
            super_category_id: null,
            description: '',
            title: ''
        });

        return Promise.reject(new Error('Invalid client call'));
    }
    const sourceResponse = generateSourceResponse();

    function* generateStoreResponse() {
        yield {
            data:{
                category_id: 1,
                super_category_id: null,
                description: '',
                title: ''
            },
            url: `/loggjafarthing/1/thingmal/a/1/efnisflokkar`,
        };

        return new Error('Invalid client call');
    }
    const storeResponse = generateStoreResponse();

    await add(input,
    {
        get: <T>(_url: string): Promise<T> => {
            return sourceResponse.next().value as Promise<T>;
        }
    }, {
        put: <T>(url: string, data: unknown) => {
            const response = storeResponse.next().value as T | Error;
            assertEquals(data, (response as unknown as {data: T})?.data);
            assertEquals(url, (response as unknown as {url: string})?.url);

            return Promise.resolve(200);
        }
    });
});
