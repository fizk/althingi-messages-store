import type {
    Message,
    Store,
    Source,
    Messages,
    Payload
} from '../index.d.ts';

export async function add(data: Message<Messages.Party>, _source: Source, store: Store): Promise<void> {
    await store.put<Payload.Party>(`/thingflokkar/${data.body.party_id}`, data.body);
}
