import type { Inflation, Message } from '../index.d.ts';
import type { SourceClient, StoreClient } from '../clients.ts';

export async function update(data: Message<Inflation>, _source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    await store.put(`/verdbolga/${data.body.id}`, data.body);
}

export async function add(data: Message<Inflation>, _source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    await store.put(`/verdbolga/${data.body.id}`, data.body);
}
