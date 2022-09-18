import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function add(data: Message<Messages.Plenary>, source: Source, store: Store): Promise<void> {
    const { assembly_id, ...body } = data.body;
    const assembly = await source.get<Messages.Assembly>(`/loggjafarthing/${assembly_id}`);

    await store.put<Payload.Plenary>(`/loggjafarthing/${assembly_id}/thingfundir/${data.body.plenary_id}`, {
        ...body,
        assembly: assembly!
    });
}
