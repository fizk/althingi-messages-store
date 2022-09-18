import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function add(data: Message<Messages.CongressmanSitting>, source: Source, store: Store): Promise<void> {
    const {assembly_id, congressman_id, constituency_id, party_id, ...body} = data.body;
    const [assembly, congressman, constituency, party] = await Promise.all([
        source.get<Messages.Assembly>(`/loggjafarthing/${assembly_id}`),
        source.get<Messages.Congressman>(`/thingmenn/${congressman_id}`),
        source.get<Messages.Constituency>(`/kjordaemi/${constituency_id}`),
        party_id ? source.get<Messages.Party>(`/thingflokkar/${party_id}`) : Promise.resolve(null),
    ]);
    await store.put<Payload.CongressmanSitting>(`/thingseta/${body.session_id}`, {
        ...body,
        assembly: assembly!,
        congressman: congressman!,
        congressman_constituency: constituency!,
        congressman_party: party
    });
}
