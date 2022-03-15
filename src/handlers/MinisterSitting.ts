import type {
    Assembly,
    Congressman,
    Constituency,
    Ministry,
    MinisterSitting,
    MinisterSittingPayload,
    Party,
    Message,
    Source,
    Store
} from '../index.d.ts';

export async function handle(data: Message<MinisterSitting>, source: Source, store: Store): Promise<void> {
    const {assembly_id, congressman_id, ministry_id, party_id, ...body} = data.body;

    const [assembly, congressman, ministry, constituencies, party] = await Promise.all([
        assembly_id ? source.get<Assembly>(`/loggjafarthing/${assembly_id}`) : Promise.resolve(null),
        congressman_id ? source.get<Congressman>(`/thingmenn/${congressman_id}`) : Promise.resolve(null),
        ministry_id ? source.get<Ministry>(`/radherraembaetti/${ministry_id}`) : Promise.resolve(null),
        congressman_id ? source.get<Constituency[]>(`/thingmenn/${congressman_id}/kjordaemi?dags=${body.from}`) : Promise.resolve([]),
        party_id ? source.get<Party>(`/thingflokkar/${party_id}`) : Promise.resolve(null),
    ]);

    const [first_ministry_assembly, last_ministry_assembly] = await Promise.all([
        ministry?.first ? source.get<Assembly>(`/loggjafarthing/${ministry?.first}`) : Promise.resolve(null),
        ministry?.last ? source.get<Assembly>(`/loggjafarthing/${ministry?.last}`) : Promise.resolve(null),
    ]);

    await store.put<MinisterSittingPayload>(`/radherraseta/${data.body.minister_sitting_id}`, {
        ...body,
        assembly,
        ministry,
        congressman,
        congressman_constituency: constituencies?.at(0) || null,
        congressman_party: party,
        first_ministry_assembly,
        last_ministry_assembly,
    });
}
