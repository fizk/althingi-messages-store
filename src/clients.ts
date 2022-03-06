import type {Source, Store} from './index.d.ts';

const sourcePath = Deno.env.get("SOURCE_PATH");
const storePath = Deno.env.get("STORE_PATH");

export const SourceClient: Source = {
    get: async (url: string): Promise<Record<string, unknown> | Array<Record<string, unknown>>> => {
        const response = await fetch(`${sourcePath}${url}`);

        console.log(`GET ${storePath}${url} - ${response.status}`);

        return response.json();
    }
};

export const StoreClient: Store = {
    put: async (url: string, data: unknown): Promise<number> => {
        const response = await fetch(`${storePath}${url}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: []
        });
        console.log(`PUT ${storePath}${url} - ${response.status}`, data);

        return Promise.resolve(response.status);
    }
};