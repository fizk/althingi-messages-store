import type {
    Committee,
    Message,
    Source,
    Store,
    Assembly
} from '../index.d.ts';

export async function handle(data: Message<Committee>, source: Source, store: Store): Promise<void> {
    const { first_assembly_id, last_assembly_id, ...body } = data.body;
    const [first, last] = await Promise.all([
        first_assembly_id ? source.get<Assembly>(`/loggjafarthing/${first_assembly_id}`) : Promise.resolve(null),
        last_assembly_id ? source.get<Assembly>(`/loggjafarthing/${last_assembly_id}`) : Promise.resolve(null),
    ]);
    await store.put(`/nefndir/${data.body.committee_id}`, {
        ...body,
        first,
        last
    });
}
