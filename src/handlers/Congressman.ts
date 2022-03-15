import type { Congressman, Message, Source, Store } from '../index.d.ts';

export async function handle(data: Message<Congressman>, _source: Source, store: Store): Promise<void> {
    await store.put(`/thingmenn/${data.body.congressman_id}`, data.body);
}
