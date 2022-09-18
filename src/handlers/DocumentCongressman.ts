import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

// @todo lovercase category
export async function add(data: Message<Messages.CongressmanDocument>, source: Source, store: Store): Promise<void> {

    const {assembly_id, congressman_id, category, document_id, issue_id, minister, order} = data.body;

    const document = await source.get<Messages.Document>(`/loggjafarthing/${assembly_id}/thingmal/${category}/${issue_id}/thingskjal/${document_id}`);
    const [congressman, party, constituency ] = await Promise.all([
        congressman_id ? source.get<Messages.Congressman>(`/thingmenn/${congressman_id}`) : Promise.resolve(null),
        congressman_id ? source.get<Messages.Party[]>(`/thingmenn/${congressman_id}/thingflokkur?dags=${document?.date}`) : Promise.resolve([]),
        congressman_id ? source.get<Messages.Constituency[]>(`/thingmenn/${congressman_id}/kjordaemi?dags=${document?.date}`) : Promise.resolve([]),
    ]);

    await store.put<Payload.CongressmanDocument>(`/loggjafarthing/${assembly_id}/thingmal/${category.toLowerCase()}/${issue_id}/thingskjol/${document_id}/thingmenn`, {
        congressman: congressman!,
        party: party?.at(0) || null,
        constituency: constituency?.at(0) || null,
        minister,
        order,
    });
}
