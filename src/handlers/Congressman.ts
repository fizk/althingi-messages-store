import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function handle(data: Message<Messages.Congressman>, _source: Source, store: Store): Promise<void> {
    await store.put<Payload.Congressman>(`/thingmenn/${data.body.congressman_id}`, data.body);
}
