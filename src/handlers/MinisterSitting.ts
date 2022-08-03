import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function handle(data: Message<Messages.MinisterSitting>, source: Source, store: Store): Promise<void> {
    const {assembly_id, congressman_id, ministry_id, party_id, ...body} = data.body;

    const [assembly, congressman, ministry, constituencies, party] = await Promise.all([
        assembly_id ? source.get<Messages.Assembly>(`/loggjafarthing/${assembly_id}`) : Promise.resolve(null),
        congressman_id ? source.get<Messages.Congressman>(`/thingmenn/${congressman_id}`) : Promise.resolve(null),
        ministry_id ? source.get<Messages.Ministry>(`/radherraembaetti/${ministry_id}`) : Promise.resolve(null),
        congressman_id ? source.get<Messages.Constituency[]>(`/thingmenn/${congressman_id}/kjordaemi?dags=${body.from}`) : Promise.resolve([]),
        party_id ? source.get<Messages.Party>(`/thingflokkar/${party_id}`) : Promise.resolve(null),
    ]);

    const [first_ministry_assembly, last_ministry_assembly] = await Promise.all([
        ministry?.first ? source.get<Messages.Assembly>(`/loggjafarthing/${ministry?.first}`) : Promise.resolve(null),
        ministry?.last ? source.get<Messages.Assembly>(`/loggjafarthing/${ministry?.last}`) : Promise.resolve(null),
    ]);

    await store.put<Payload.MinisterSitting>(`/radherraseta/${data.body.minister_sitting_id}`, {
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
