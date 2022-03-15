import type { CongressmanSitting, Message, Source, Store } from '../index.d.ts';

export async function handle(data: Message<CongressmanSitting>, source: Source, store: Store): Promise<void> {
    const {assembly_id, congressman_id, constituency_id, party_id, ...body} = data.body;
    const [assembly, congressman, constituency, party] = await Promise.all([
        source.get(`/loggjafarthing/${assembly_id}`),
        source.get(`/thingmenn/${congressman_id}`),
        source.get(`/kjordaemi/${constituency_id}`),
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
