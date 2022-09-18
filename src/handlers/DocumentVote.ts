import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

// @todo lovercase category
export async function add(data: Message<Messages.Vote>, source: Source, store: Store): Promise<void> {

    const { assembly_id, issue_id, category, document_id, committee_to, ...body} = data.body;

    const [assembly, issue, committee] = await Promise.all([
        assembly_id
            ? source.get<Messages.Assembly>(`/loggjafarthing/${assembly_id}`)
            : Promise.resolve(null),
        issue_id
            ? source.get<Messages.Issue>(`/loggjafarthing/${assembly_id}/thingmal/A/${issue_id}`)
            : Promise.resolve(null),
        committee_to
            ? source.get<Messages.Committee>(`/nefndir/${committee_to}`)
            : Promise.resolve(null),
    ]);

    const [first, last] = await Promise.all([
        committee
            ? source.get<Messages.Assembly>(`/loggjafarthing/${committee.first_assembly_id}`)
            : Promise.resolve(null),
        committee
            ? source.get<Messages.Assembly>(`/loggjafarthing/${committee.last_assembly_id}`)
            : Promise.resolve(null),
    ]);

    await store.put<Payload.Vote>(`/loggjafarthing/${assembly_id}/thingmal/${category.toLowerCase()}/${issue_id}/thingskjol/${document_id}/atkaedagreidsla`, {
        ...body,
        items: [],
        issue: issue!,
        assembly: assembly!,
        document_id: document_id,
        committee: committee,
        committee_first_assembly: first,
        committee_last_assembly: last,
    });
}
