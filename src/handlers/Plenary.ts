import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function handle(data: Message<Messages.Plenary>, source: Source, store: Store): Promise<void> {
    const { assembly_id, ...body } = data.body;
    const assembly = await source.get<Messages.Assembly>(`loggjafarthing/${assembly_id}`);

    // @todo the PUT URL
    await store.put<Payload.Plenary>(`/loggjafarthing/${data.body.plenary_id}`, {
        ...body,
        assembly: assembly!
    });
}
