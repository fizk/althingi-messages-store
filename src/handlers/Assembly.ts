import type { Assembly, Message } from '../index.d.ts';
import type { SourceClient, StoreClient } from '../clients.ts';

export async function update(data: Message<Assembly>, _source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    await store.put(`/loggjafarthing/${data.body.assembly_id}`, data.body);
}

export async function add(data: Message<Assembly>, _source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    await store.put(`/loggjafarthing/${data.body.assembly_id}`, data.body);
}