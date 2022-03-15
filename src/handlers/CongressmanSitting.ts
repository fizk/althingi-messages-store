import type {
    CongressmanSitting,
    CongressmanSittingPayload,
    Assembly,
    Congressman,
    Constituency,
    Party,
    Message,
    Source,
    Store
} from '../index.d.ts';

export async function handle(data: Message<CongressmanSitting>, source: Source, store: Store): Promise<void> {
    const {assembly_id, congressman_id, constituency_id, party_id, ...body} = data.body;
    const [assembly, congressman, constituency, party] = await Promise.all([
        source.get<Assembly>(`/loggjafarthing/${assembly_id}`),
        source.get<Congressman>(`/thingmenn/${congressman_id}`),
        source.get<Constituency>(`/kjordaemi/${constituency_id}`),
        party_id ? source.get<Party>(`/thingflokkar/${party_id}`) : Promise.resolve(null),
    ]);
    await store.put<CongressmanSittingPayload>(`/thingseta/${body.session_id}`, {
        ...body,
        assembly,
        congressman,
        congressman_constituency: constituency,
        congressman_party: party
    });
}
