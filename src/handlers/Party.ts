import type { Party, Message } from '../index.d.ts';
import type { SourceClient, StoreClient } from '../clients.ts';

export async function update(data: Message<Party>, _source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    await store.put(`/thingflokkar/${data.body.party_id}`, data.body);
}

export async function add(data: Message<Party>, _source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    await store.put(`/thingflokkar/${data.body.party_id}`, data.body);
}
