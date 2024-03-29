import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function add(data: Message<Messages.Committee>, source: Source, store: Store): Promise<void> {
    const { first_assembly_id, last_assembly_id, ...body } = data.body;
    const [first, last] = await Promise.all([
        first_assembly_id ? source.get<Messages.Assembly>(`/loggjafarthing/${first_assembly_id}`) : Promise.resolve(null),
        last_assembly_id ? source.get<Messages.Assembly>(`/loggjafarthing/${last_assembly_id}`) : Promise.resolve(null),
    ]);
    await store.put<Payload.Committee>(`/nefndir/${data.body.committee_id}`, {
        ...body,
        first,
        last
    });
}
