import type {
    Message,
    Store,
    Source,
    Messages,
    Payload
} from '../index.d.ts';

export async function handle(data: Message<Messages.Ministry>, source: Source, store: Store): Promise<void> {
    const [first, last] = await Promise.all([
        data.body.first ? source.get<Messages.Assembly>(`/loggjafarthing/${data.body.first}`) : Promise.resolve(null),
        data.body.last ? source.get<Messages.Assembly>(`/loggjafarthing/${data.body.last}`) : Promise.resolve(null),
    ]);
    await store.put<Payload.Ministry>(`/raduneyti/${data.body.ministry_id}`, {
        ...data.body,
        first,
        last
    });
}
