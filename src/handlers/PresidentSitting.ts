import type {
    PresidentSitting,
    PresidentSittingPayload,
    Congressman,
    Party,
    Constituency,
    Assembly,
    Message,
    Source,
    Store
} from '../index.d.ts';

export async function handle(data: Message<PresidentSitting>, source: Source, store: Store): Promise<void> {
    const { assembly_id, congressman_id, ...body } = data.body;

    const [assembly, congressman, parties, constituencies] = await Promise.all([
        assembly_id ? source.get<Assembly>(`/loggjafarthing/${assembly_id}`) : Promise.resolve(null),
        congressman_id ? source.get<Congressman>(`/thingmenn/${congressman_id}`) : Promise.resolve(null),
        congressman_id ? source.get<Party[]>(`/thingmenn/${congressman_id}/thingflokkur?dags=${body.from}`) : Promise.resolve([]),
        congressman_id ? source.get<Constituency[]>(`/thingmenn/${congressman_id}/kjordaemi?dags=${body.from}`) : Promise.resolve([]),
    ]);

    await store.put<PresidentSittingPayload>(`/forsetaseta/${data.body.president_id}`, {
        ...body,
        assembly,
        congressman,
        congressman_party: parties.at(0) || null,
        congressman_constituency: constituencies.at(0) || null,
    });
}
