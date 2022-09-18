import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function add(data: Message<Messages.Speech>, source: Source, store: Store): Promise<void> {
    const { congressman_id, assembly_id, issue_id, category, plenary_id,...body } = data.body
    const [congressman, party, constituency, assembly, issue, plenary] = await Promise.all([
        congressman_id
            ? source.get<Messages.Congressman>(`/thingmenn/${congressman_id}`)
            : Promise.resolve(null),
        congressman_id
            ? source.get<Messages.Party[]>(`/thingmenn/${congressman_id}/thingflokkur?dags=${data.body.from}`)
            : Promise.resolve([]),
        congressman_id
            ? source.get<Messages.Constituency[]>(`/thingmenn/${congressman_id}/kjordaemi?dags=${data.body.from}`)
            : Promise.resolve([]),
        assembly_id
            ? source.get<Messages.Assembly>(`/loggjafarthing/${assembly_id}`)
            : Promise.resolve(null),
        assembly_id && issue_id
            ? source.get<Messages.Issue>(`/loggjafarthing/${assembly_id}/thingmal/${category}/${issue_id}`)
            : Promise.resolve(null),
        plenary_id
            ? source.get<Messages.Plenary>(`/loggjafarthing/${assembly_id}/thingfundir/${plenary_id}`)
            : Promise.resolve(null),
    ]);

    await store.put<Payload.Speech>(`/loggjafarthing/${assembly_id}/thingmal/${category.toLowerCase()}/${issue_id}/readur/${body.speech_id}`, {
        ...body,
        assembly: assembly!,
        issue: issue!,
        plenary,
        congressman,
        congressman_party: party?.at(0) || null,
        congressman_constituency: constituency?.at(0) || null
    });
}
