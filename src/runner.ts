//deno-lint-ignore-file require-await
import { Buffer } from 'https://deno.land/std@0.110.0/node/buffer.ts';
import { Kafka, logLevel } from 'https://deno.land/x/kafkasaur@v0.0.7/index.ts';
import prettyConsolelogger2 from 'https://deno.land/x/kafkasaur@v0.0.7/examples/prettyConsoleLogger2.ts'
import type { Message, Source, Store } from './index.d.ts';
import { SourceClient, StoreClient } from './clients.ts';

//declare host and name
const port = Deno.env.get("QUEUE_PORT");
const host = Deno.env.get("QUEUE_HOST");

//intialize broker
const kafka = new Kafka({
    logLevel: logLevel.INFO,
    logCreator: prettyConsolelogger2,
    brokers: [`${host}:${port}`],
    clientId: 'store-messanger-consumer',
})

export async function runner<T>(
    topic: string,
    group: string,
    callback: (data: Message<T>, source: Source, store: Store) => Promise<void>
) {
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
                console.log(response, topic, group);
            } catch (e) {
                const decoder = new TextDecoder();
                console.error(e.message, topic, group, decoder.decode(payload.message.value as Buffer));
            }
        }
    });
}