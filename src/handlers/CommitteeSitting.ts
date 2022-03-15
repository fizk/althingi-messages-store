import type {
    CommitteeSitting,
    Committee,
    Assembly,
    Congressman,
    Party,
    Constituency,
    Message,
    Store,
    Source
 } from '../index.d.ts';


export async function handle(data: Message<CommitteeSitting>, source: Source, store: Store): Promise<void> {
    const { assembly_id, committee_id, congressman_id, ...body } = data.body;
    const [
        assembly,
        committee,
        congressman,
        parties,
        constituencies
    ] = await Promise.all([
        assembly_id ? source.get<Assembly>(`/loggjafarthing/${assembly_id}`) : Promise.resolve(null),
        committee_id ? source.get<Committee>(`/nefndir/${committee_id}`) : Promise.resolve(null),
        congressman_id ? source.get<Congressman>(`/thingmenn/${congressman_id}`) : Promise.resolve(null),
        congressman_id ? source.get<Party[]>(`/thingmenn/${congressman_id}/thingflokkur?dags=${body.from}`) : Promise.resolve([]),
        congressman_id ? source.get<Constituency[]>(`/thingmenn/${congressman_id}/kjordaemi?dags=${body.from}`) : Promise.resolve([]),
    ]);

    const [
        first_committee_assembly,
        last_committee_assembly
    ] = await Promise.all([
        committee?.first_assembly_id
            ? source.get<Assembly>(`/loggjafarthing/${committee?.first_assembly_id}`)
            : Promise.resolve(null),
        committee?.last_assembly_id
            ? source.get<Assembly>(`/loggjafarthing/${committee?.last_assembly_id}`)
            : Promise.resolve(null),
    ]);

    await store.put(`/nefndarseta/${body.committee_sitting_id}`, {
        ...body,
        assembly,
        committee,
        congressman,
        party: parties?.at(0) || null,
        constituency: constituencies?.at(0) || null,
        first_committee_assembly,
        last_committee_assembly
    });
}
