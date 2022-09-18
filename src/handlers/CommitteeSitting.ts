import type {
    Message,
    Store,
    Source,
    Messages,
    Payload
 } from '../index.d.ts';


export async function add(data: Message<Messages.CommitteeSitting>, source: Source, store: Store): Promise<void> {
    const { assembly_id, committee_id, congressman_id, ...body } = data.body;
    const [
        assembly,
        committee,
        congressman,
        parties,
        constituencies
    ] = await Promise.all([
        assembly_id ? source.get<Messages.Assembly>(`/loggjafarthing/${assembly_id}`) : Promise.resolve(null),
        committee_id ? source.get<Messages.Committee>(`/nefndir/${committee_id}`) : Promise.resolve(null),
        congressman_id ? source.get<Messages.Congressman>(`/thingmenn/${congressman_id}`) : Promise.resolve(null),
        congressman_id ? source.get<Messages.Party[]>(`/thingmenn/${congressman_id}/thingflokkur?dags=${body.from}`) : Promise.resolve([]),
        congressman_id ? source.get<Messages.Constituency[]>(`/thingmenn/${congressman_id}/kjordaemi?dags=${body.from}`) : Promise.resolve([]),
    ]);

    const [
        first_committee_assembly,
        last_committee_assembly
    ] = await Promise.all([
        committee?.first_assembly_id
            ? source.get<Messages.Assembly>(`/loggjafarthing/${committee?.first_assembly_id}`)
            : Promise.resolve(null),
        committee?.last_assembly_id
            ? source.get<Messages.Assembly>(`/loggjafarthing/${committee?.last_assembly_id}`)
            : Promise.resolve(null),
    ]);

    await store.put<Payload.CommitteeSitting>(`/nefndarseta/${body.committee_sitting_id}`, {
        ...body,
        assembly,
        committee,
        congressman,
        congressman_party: parties?.at(0) || null,
        congressman_constituency: constituencies?.at(0) || null,
        first_committee_assembly,
        last_committee_assembly
    });
}
