import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

// @todo lovercase category
export async function add(data: Message<Messages.CommitteeDocument>, source: Source, store: Store): Promise<void> {

    const { document_id, issue_id, assembly_id, category, committee_id, document_committee_id, name, part } = data.body;

    const committee = await source.get<Messages.Committee>(`/nefndir/${committee_id}`);

    const [first, last] = await Promise.all([
        committee?.first_assembly_id
            ? source.get<Messages.Assembly>(`/loggjafarthing/${committee?.first_assembly_id}`)
            : Promise.resolve(null),
        committee?.last_assembly_id
            ? source.get<Messages.Assembly>(`/loggjafarthing/${committee?.last_assembly_id}`)
            : Promise.resolve(null),
    ]);

    await store.put<Payload.CommitteeDocument>(`/loggjafarthing/${assembly_id}/thingmal/${category.toLowerCase()}/${issue_id}/thingskjol/${document_id}/nefndir`, {
        document_committee_id,
        document_id,
        assembly_id,
        issue_id,
        category,
        committee: committee,
        committee_name: name,
        committee_part: part,
        committee_first_assembly: first,
        committee_last_assembly: last,
    });
}
