import type { Congressman, Message } from '../index.d.ts';
import type { SourceClient, StoreClient } from '../clients.ts';

export async function update(data: Message<Congressman>, _source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    await store.put(`/thingmenn/${data.body.congressman_id}`, data.body);
}

export async function add(data: Message<Congressman>, _source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    await store.put(`/thingmenn/${data.body.congressman_id}`, data.body);
}
