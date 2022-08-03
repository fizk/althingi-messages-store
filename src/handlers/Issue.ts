import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function handle(data: Message<Messages.Issue>, source: Source, store: Store): Promise<void> {
    const { assembly_id, congressman_id, ...body } = data.body;
    const [assembly, congressman] = await Promise.all([
        source.get<Messages.Assembly>(`/loggjafarthing/${assembly_id}`),
        source.get<Messages.Congressman>(`/thingmenn/${congressman_id}`),
    ]);

    // @todo the PUT URL
    await store.put<Payload.Issue>(`/loggjafarthing/${data.body.issue_id}`, {
        ...body,
        assembly: assembly!,
        congressman: congressman!
    });
}
