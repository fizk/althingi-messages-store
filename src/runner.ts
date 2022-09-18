import { Buffer } from 'https://deno.land/std@0.110.0/node/buffer.ts';
import { Kafka } from 'https://deno.land/x/kafkasaur@v0.0.7/index.ts';
import type { Message, Source, Store } from './index.d.ts';
import { SourceClient, StoreClient } from './clients.ts';
import { ConsoleLogger, LEVELS, logLevel } from './logger.ts'


//declare host and name
const port = Deno.env.get("QUEUE_PORT");
const host = Deno.env.get("QUEUE_HOST");
const clientId = Deno.env.get("QUEUE_CLIENT_ID");
const log = ConsoleLogger(logLevel);

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

        consumer.on(consumer.events.HEARTBEAT, event => logEvent(LEVELS.DEBUG,'DEBUG','HEARTBEAT', event));
        // consumer.on(consumer.events.COMMIT_OFFSETS, event => logEvent(LEVELS.DEBUG,'DEBUG', 'COMMIT_OFFSETS', event));
        // consumer.on(consumer.events.GROUP_JOIN, event => logEvent(LEVELS.DEBUG,'DEBUG', 'GROUP_JOIN', event));
        // consumer.on(consumer.events.FETCH, event => logEvent(LEVELS.DEBUG,'DEBUG', 'FETCH', event));
        // consumer.on(consumer.events.FETCH_START, event => logEvent(LEVELS.DEBUG,'DEBUG', 'FETCH_START', event));
        // consumer.on(consumer.events.START_BATCH_PROCESS, event => logEvent(LEVELS.DEBUG,'DEBUG', 'START_BATCH_PROCESS', event));
        // consumer.on(consumer.events.END_BATCH_PROCESS, event => logEvent(LEVELS.DEBUG,'DEBUG', 'END_BATCH_PROCESS', event));
        consumer.on(consumer.events.CONNECT, event => logEvent(LEVELS.INFO,'INFO', 'CONNECT', event));
        consumer.on(consumer.events.DISCONNECT, event => logEvent(LEVELS.INFO,'INFO', 'DISCONNECT', event));
        consumer.on(consumer.events.STOP, event => logEvent(LEVELS.INFO,'INFO', 'STOP', event));
        consumer.on(consumer.events.CRASH, event => logEvent(LEVELS.ERROR,'ERROR', 'CRASH', event));
        // consumer.on(consumer.events.REBALANCING, event => logEvent(LEVELS.DEBUG,'DEBUG', 'REBALANCING', event));
        // consumer.on(consumer.events.RECEIVED_UNSUBSCRIBED_TOPICS, event => logEvent(LEVELS.DEBUG,'DEBUG', 'RECEIVED_UNSUBSCRIBED_TOPICS', event));
        // consumer.on(consumer.events.REQUEST, event => logEvent(LEVELS.DEBUG,'DEBUG', 'REQUEST', event));
        // consumer.on(consumer.events.REQUEST_TIMEOUT, event => logEvent(LEVELS.ERROR,'ERROR', 'REQUEST_TIMEOUT', event));
        // consumer.on(consumer.events.REQUEST_QUEUE_SIZE, event => logEvent(LEVELS.DEBUG,'DEBUG', 'REQUEST_QUEUE_SIZE', event));

        await consumer.subscribe({ topic, fromBeginning: false })
        await consumer.run({
            eachMessage: async (payload) => {
                try {
                    const decoder = new TextDecoder();
                    const response = decoder.decode(payload.message.value as Buffer);
                    const message: Message<T> = JSON.parse(response);

                    await callback(message, SourceClient, StoreClient);
                    log({
                        namespace: 'Subscribe',
                        label: 'INFO',
                        level: LEVELS.INFO,
                        log: {
                            message: response,
                            topic: `${group}:${topic}`,
                        }
                    });
                } catch (e) {
                    const decoder = new TextDecoder();
                    log({
                        namespace: 'Subscribe',
                        label: 'ERROR',
                        level: LEVELS.ERROR,
                        log: {
                            message: decoder.decode(payload.message.value as Buffer),
                            topic: `${group}:${topic}`,
                            error: `${e.toString()} | ${e.message}`,
                            error_stack: e.stack || '',
                            error_location: `${e.fileName || ''} - ${e.lineNumber}:${e.columnNumber}`
                        }
                    });
                }
            }
        });
    } catch (e) {
        log({
            namespace: 'Subscribe',
            label: 'ERROR',
            level: LEVELS.ERROR,
            log: {
                message: null,
                topic: `${group}:${topic}`,
                error: `${e.toString()} | ${e.message}`,
                error_stack: e.stack || '',
                error_location: `${e.fileName || ''} - ${e.lineNumber}:${e.columnNumber}`
            }
        });
    }
}

const logEvent = (level: number, label: string, message: string, event: unknown) => log({
        namespace: 'Event',
        label,
        level,
        log: {message,event,}
    });

