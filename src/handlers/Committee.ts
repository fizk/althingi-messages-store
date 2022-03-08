import type { Committee, Message } from '../index.d.ts';
import type { SourceClient, StoreClient } from '../clients.ts';

export async function update(data: Message<Committee>, source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    const { first_assembly_id, last_assembly_id, ...body } = data.body;
    const [first, last] = await Promise.all([
        first_assembly_id ? source.get(`/loggjafarthing/${first_assembly_id}`) : Promise.resolve(null),
        last_assembly_id ? source.get(`/loggjafarthing/${last_assembly_id}`) : Promise.resolve(null),
    ]);
    await store.put(`/nefndir/${data.body.committee_id}`, {
        ...body,
        first,
        last
    });
}

export async function add(data: Message<Committee>, source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    const { first_assembly_id, last_assembly_id, ...body } = data.body;
    const [first, last] = await Promise.all([
        first_assembly_id ? source.get(`/loggjafarthing/${first_assembly_id}`) : Promise.resolve(null),
        last_assembly_id ? source.get(`/loggjafarthing/${last_assembly_id}`) : Promise.resolve(null),
    ]);
    await store.put(`/nefndir/${data.body.committee_id}`, {
        ...body,
        first,
        last
    });
}
