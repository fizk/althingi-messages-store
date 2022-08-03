import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function handle(data: Message<Messages.Assembly>, _source: Source, store: Store): Promise<void> {
    await store.put<Payload.Assembly>(`/loggjafarthing/${data.body.assembly_id}`, data.body);
}
