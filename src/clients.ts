import type {Source, Store} from './index.d.ts';
import { ConsoleLogger, LEVELS, logLevel } from './logger.ts'

const sourcePath = Deno.env.get("SOURCE_PATH");
const storePath = Deno.env.get("STORE_PATH");

export const SourceClient: Source = {
    get: async <T>(url: string): Promise<T | null> => {
        const response = await fetch(`${sourcePath}${url}`);

        const payload = response.status === 200
            ? await response.json()
            : await Promise.resolve(null);

        ConsoleLogger(logLevel)({
            namespace: 'Client',
            level: LEVELS.INFO,
            label: 'INFO',
            log: {
                message: null,
                request_url: `${sourcePath}${url}`,
                request_method: `GET`,
                response_status: response.status,
                response_body: payload
            }
        });

        return Promise.resolve(payload);
    }
};

export const StoreClient: Store = {
    put: async (url: string, data: unknown): Promise<number> => {
        const response = await fetch(`${storePath}${url}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: []
        });

        const payload = response.status >= 300
            ? await response.json()
            : Promise.resolve(null);

        ConsoleLogger(logLevel)({
            namespace: 'Client',
            level: LEVELS.INFO,
            label: 'INFO',
            log: {
                message: null,
                request_url: `${storePath}${url}`,
                request_method: `PUT`,
                response_status: response.status,
                request_body: data,
                response_body: payload
            }
        });

        return Promise.resolve(response.status);
    }
};
