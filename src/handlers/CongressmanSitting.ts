import type { CongressmanSitting, Message } from '../index.d.ts';
import type { SourceClient, StoreClient } from '../clients.ts';

export async function update(data: Message<CongressmanSitting>, source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    const {assembly_id, congressman_id, constituency_id, party_id, ...body} = data.body;
    const [assembly, congressman, constituency, party] = await Promise.all([
        assembly_id ? source.get(`/loggjafarthing/${assembly_id}`) : Promise.resolve(null),
        congressman_id ? source.get(`/thingmenn/${congressman_id}`) : Promise.resolve(null),
        constituency_id ? source.get(`/kjordaemi/${constituency_id}`) : Promise.resolve(null),
        party_id ? source.get(`/thingflokkar/${party_id}`) : Promise.resolve(null),
    ]);
    await store.put(`/thingseta/${body.session_id}`, {
        ...body,
        assembly,
        congressman,
        constituency,
        party
    });
}

export async function add(data: Message<CongressmanSitting>, source: typeof SourceClient, store: typeof StoreClient): Promise<void> {
    const { assembly_id, congressman_id, constituency_id, party_id, ...body } = data.body;
    const [assembly, congressman, constituency, party] = await Promise.all([
        assembly_id ? source.get(`/loggjafarthing/${assembly_id}`) : Promise.resolve(null),
        congressman_id ? source.get(`/thingmenn/${congressman_id}`) : Promise.resolve(null),
        constituency_id ? source.get(`/kjordaemi/${constituency_id}`) : Promise.resolve(null),
        party_id ? source.get(`/thingflokkar/${party_id}`) : Promise.resolve(null),
    ]);
    await store.put(`/thingseta/${body.session_id}`, {
        ...body,
        assembly,
        congressman,
        constituency,
        party
    });
}
