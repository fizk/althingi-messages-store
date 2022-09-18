import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function add(data: Message<Messages.Issue>, source: Source, store: Store): Promise<void> {
    const { assembly_id, congressman_id, ...body } = data.body;
    const [assembly, congressman] = await Promise.all([
        source.get<Messages.Assembly>(`/loggjafarthing/${assembly_id}`),
        congressman_id ? source.get<Messages.Congressman>(`/thingmenn/${congressman_id}`) : Promise.resolve(null),
    ]);


    // @todo the PUT URL
    await store.put<Payload.Issue>(`/loggjafarthing/${assembly_id}/thingmal/${data.body.category.toLowerCase()}/${data.body.issue_id}`, {
        ...body,
        category: body.category.toLowerCase(),
        proponents: [],
        content_categories: [],
        content_super_categories: [],
        assembly: assembly!,
        congressman: congressman!
    });
}

export async function update(data: Message<Messages.Issue>, _source: Source, store: Store): Promise<void> {
    // deno-lint-ignore no-unused-vars
    const { assembly_id, congressman_id, ...body } = data.body;

    // @todo the PUT URL
    await store.put<Payload.Issue>(`/loggjafarthing/${assembly_id}/thingmal/${data.body.category.toLowerCase()}/${data.body.issue_id}`, {
        ...body,
        category: body.category.toLowerCase(),
    });
}
