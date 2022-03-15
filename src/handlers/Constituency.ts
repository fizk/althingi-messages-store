import type { Constituency, Message, Source, Store } from '../index.d.ts';

export async function handle(data: Message<Constituency>, _source: Source, store: Store): Promise<void> {
    await store.put(`/kjordaemi/${data.body.constituency_id}`, data.body);
}
