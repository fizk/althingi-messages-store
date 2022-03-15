import type { Party, Message, Store, Source } from '../index.d.ts';

export async function handle(data: Message<Party>, _source: Source, store: Store): Promise<void> {
    await store.put(`/thingflokkar/${data.body.party_id}`, data.body);
}
