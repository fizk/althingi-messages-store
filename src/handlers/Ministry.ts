import type { Ministry, Message } from '../index.d.ts';
import type { SourceClient, StoreClient } from '../clients.ts';

export async function update(data: Message<Ministry>, source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    const [first, last] = await Promise.all([
        data.body.first ? source.get(`/loggjafarthing/${data.body.first}`) : Promise.resolve(null),
        data.body.last ? source.get(`/loggjafarthing/${data.body.last}`) : Promise.resolve(null),
    ]);
    await store.put(`/raduneyti/${data.body.ministry_id}`, {
        ...data.body,
        first,
        last
    });
}

export async function add(data: Message<Ministry>, source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    const [first, last] = await Promise.all([
        data.body.first ? source.get(`/loggjafarthing/${data.body.first}`) : Promise.resolve(null),
        data.body.last ? source.get(`/loggjafarthing/${data.body.last}`) : Promise.resolve(null),
    ]);
    await store.put(`/raduneyti/${data.body.ministry_id}`, {
        ...data.body,
        first,
        last
    });
}
