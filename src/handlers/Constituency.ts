import type { Constituency, Message } from '../index.d.ts';
import type { SourceClient, StoreClient } from '../clients.ts';

export async function update(data: Message<Constituency>, _source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    await store.put(`/kjordaemi/${data.body.constituency_id}`, data.body);
}

export async function add(data: Message<Constituency>, _source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    await store.put(`/kjordaemi/${data.body.constituency_id}`, data.body);
}
