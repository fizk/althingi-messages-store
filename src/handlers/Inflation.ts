import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function add(data: Message<Messages.Inflation>, _source: Source, store: Store): Promise<void> {
    await store.put<Payload.Inflation>(`/verdbolga/${data.body.id}`, data.body);
}
