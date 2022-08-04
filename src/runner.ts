import { Buffer } from 'https://deno.land/std@0.110.0/node/buffer.ts';
import { Kafka } from 'https://deno.land/x/kafkasaur@v0.0.7/index.ts';
import type { Message, Source, Store } from './index.d.ts';
import { SourceClient, StoreClient } from './clients.ts';

const LEVELS = {
    NOTHING: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 4,
    DEMO: 5,
    DEBUG: 6
};

const ConsoleLogger = (_logLevel: number) => ({ namespace, level, log }: {
    namespace: string,
    level: number,
    label: string,
    log: Record<string, unknown>
}) => {
    const { message, ...extra } = log;
    const payload = {
        section_name: namespace,
        request_method: message,
        response_status: level,
        request_headers: extra.headers || {},
        request_uri: '',
        response_headers: {},
        error_file: null,
        error_message: null,
        error_trace: extra || null
    };

    console.log(JSON.stringify(payload));
}

//declare host and name
const port = Deno.env.get("QUEUE_PORT");
const host = Deno.env.get("QUEUE_HOST");
const clientId = Deno.env.get("QUEUE_CLIENT_ID");

const logLevel = LEVELS.WARN;

//intialize broker
const kafka = new Kafka({
    logLevel,
    logCreator: ConsoleLogger,
    brokers: [`${host}:${port}`],
    clientId: clientId,
});

export async function runner<T>(
    topic: string,
    group: string,
    callback: (data: Message<T>, source: Source, store: Store) => Promise<void>
) {
    try {
        const consumer = kafka.consumer({ groupId: group })
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: false })
        await consumer.run({
            eachMessage: async (payload) => {
                try {
                    const decoder = new TextDecoder();
                    const response = decoder.decode(payload.message.value as Buffer);
                    const message: Message<T> = JSON.parse(response);
                    await callback(message, SourceClient, StoreClient);
                    ConsoleLogger(logLevel)({
                        namespace: 'Request',
                        label: 'DEBUG',
                        level: LEVELS.DEBUG,
                        log: {
                            message: `${group}:${topic}`,
                            headers: {topic, group}
                        }
                    });
                } catch (e) {
                    const decoder = new TextDecoder();
                    ConsoleLogger(logLevel)({
                        namespace: 'Request',
                        label: 'ERROR',
                        level: LEVELS.ERROR,
                        log: {
                            message: `${e.message} | ${group}:${topic}`,
                            headers: { topic, group },
                            payload: JSON.parse(decoder.decode(payload.message.value as Buffer))
                        }
                    });
                }
            }
        });
    } catch (e) {
        ConsoleLogger(logLevel)({
            namespace: 'Consumer',
            label: 'ERROR',
            level: LEVELS.ERROR,
            log: {
                message: `${e.message} | ${group}:${topic}`,
                headers: { topic, group },
            }
        });
    }
}
