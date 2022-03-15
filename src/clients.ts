import type {Source, Store} from './index.d.ts';

const sourcePath = Deno.env.get("SOURCE_PATH");
const storePath = Deno.env.get("STORE_PATH");

export const SourceClient: Source = {
    get: async <T>(url: string): Promise<T | null> => {
        const response = await fetch(`${sourcePath}${url}`);

        console.log(`GET ${storePath}${url} - ${response.status}`);

        if (response.status === 200) {
            return response.json();
        }
        return Promise.resolve(null);
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
