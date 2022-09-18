import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

// @todo lovercase category
export async function add(data: Message<Messages.Document>, source: Source, store: Store): Promise<void> {

    const { document_id, issue_id, assembly_id, category, date, type, url } = data.body;

    const [assembly, issue] = await Promise.all([
        assembly_id
            ? source.get<Messages.Assembly>(`/loggjafarthing/${assembly_id}`)
            : Promise.resolve(null),
        issue_id
            ? source.get<Messages.Issue>(`/loggjafarthing/${assembly_id}/thingmal/A/${issue_id}`)
            : Promise.resolve(null),
    ]);

    await store.put<Payload.Document>(`/loggjafarthing/${assembly_id}/thingmal/${category.toLowerCase()}/${issue_id}/thingskjol/${document_id}`, {
        document_id: document_id,
        issue: issue!,
        assembly: assembly!,
        date: date,
        url: url,
        type: type,
        proponents: [],
        votes: [],
    });
}
