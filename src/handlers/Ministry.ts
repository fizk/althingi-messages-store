import type {
    Assembly,
    Ministry,
    MinistryPayload,
    Message,
    Store,
    Source
} from '../index.d.ts';

export async function handle(data: Message<Ministry>, source: Source, store: Store): Promise<void> {
    const [first, last] = await Promise.all([
        data.body.first ? source.get<Assembly>(`/loggjafarthing/${data.body.first}`) : Promise.resolve(null),
        data.body.last ? source.get<Assembly>(`/loggjafarthing/${data.body.last}`) : Promise.resolve(null),
    ]);
    await store.put<MinistryPayload>(`/raduneyti/${data.body.ministry_id}`, {
        ...data.body,
        first,
        last
    });
}
