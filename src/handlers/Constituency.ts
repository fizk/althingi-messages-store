import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function handle(data: Message<Messages.Constituency>, _source: Source, store: Store): Promise<void> {
    await store.put<Payload.Constituency>(`/kjordaemi/${data.body.constituency_id}`, data.body);
}
