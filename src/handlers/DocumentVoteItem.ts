import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

// @todo lovercase category
export async function add(data: Message<Messages.VoteItem>, source: Source, store: Store): Promise<void> {

    const {vote_item_id, vote_id, congressman_id, vote} = data.body;

    const voteRecord = await source.get<Messages.Vote>(`${vote_id}`);

    const {assembly_id, issue_id, category, document_id} = voteRecord!;

    const [congressman, party, constituency] = await Promise.all([
        congressman_id
            ? source.get<Messages.Congressman>(`/thingmenn/${congressman_id}`)
            : Promise.resolve(null),
        congressman_id
            ? source.get<Messages.Party[]>(`/thingmenn/${congressman_id}/thingflokkur?dags=${voteRecord?.date}`)
            : Promise.resolve([]),
        congressman_id
            ? source.get<Messages.Constituency[]>(`/thingmenn/${congressman_id}/kjordaemi?dags=${voteRecord?.date}`)
            : Promise.resolve([]),
    ]);

    await store.put<Payload.VoteItem>(`/loggjafarthing/${assembly_id}/thingmal/${category.toLowerCase()}/${issue_id}/thingskjol/${document_id}/kostningar/${vote_item_id}`, {
        vote_item_id: vote_item_id,
        vote_id: vote_id,
        congressman: congressman!,
        party: party?.at(0) || null,
        constituency: constituency?.at(0) || null,
        vote: vote,
    });
}
