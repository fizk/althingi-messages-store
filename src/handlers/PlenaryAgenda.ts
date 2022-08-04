import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function handle(data: Message<Messages.PlenaryAgenda>, source: Source, store: Store): Promise<void> {

    const {
        plenary_id,
        issue_id,
        category,
        assembly_id,
        posed_id,
        posed,
        answerer_id,
        answerer,
        counter_answerer_id,
        counter_answerer,
        instigator_id,
        instigator,
        ...body
    } = data.body;

    const plenary = await source.get<Messages.Plenary>(`/loggjafarthing/${assembly_id}/thingfundir/${plenary_id}`);

    const [
        issue,
        assembly,
        posed_member,
        posed_party,
        posed_constituency,
        answerer_member,
        answerer_party,
        answerer_constituency,
        counter_answerer_member,
        counter_answerer_party,
        counter_answerer_constituency,
        instigator_member,
        instigator_party,
        instigator_constituency,
    ] = await Promise.all([
        issue_id ? source.get<Messages.Issue>(`/loggjafarthing/${assembly_id}/thingmal/${category}/${issue_id}`) : Promise.resolve(null),
        assembly_id ? source.get<Messages.Assembly>(`/loggjafarthing/${assembly_id}`) : Promise.resolve(null),

        posed_id ? source.get<Messages.Congressman>(`/thingmenn/${posed_id}`) : Promise.resolve(null),
        posed_id ? source.get<Messages.Party[]>(`/thingmenn/${posed_id}/thingflokkur?dags=${plenary?.from}`) : Promise.resolve([]),
        posed_id ? source.get<Messages.Constituency[]>(`/thingmenn/${posed_id}/kjordaemi?dags=${plenary?.from}`) : Promise.resolve([]),

        answerer_id ? source.get<Messages.Congressman>(`/thingmenn/${answerer_id}`) : Promise.resolve(null),
        answerer_id ? source.get<Messages.Party[]>(`/thingmenn/${answerer_id}/thingflokkur?dags=${plenary?.from}`) : Promise.resolve([]),
        answerer_id ? source.get<Messages.Constituency[]>(`/thingmenn/${answerer_id}/kjordaemi?dags=${plenary?.from}`) : Promise.resolve([]),

        counter_answerer_id ? source.get<Messages.Congressman>(`/thingmenn/${counter_answerer_id}`) : Promise.resolve(null),
        counter_answerer_id ? source.get<Messages.Party[]>(`/thingmenn/${counter_answerer_id}/thingflokkur?dags=${plenary?.from}`) : Promise.resolve([]),
        counter_answerer_id ? source.get<Messages.Constituency[]>(`/thingmenn/${counter_answerer_id}/kjordaemi?dags=${plenary?.from}`) : Promise.resolve([]),

        instigator_id ? source.get<Messages.Congressman>(`/thingmenn/${instigator_id}`) : Promise.resolve(null),
        instigator_id ? source.get<Messages.Party[]>(`/thingmenn/${instigator_id}/thingflokkur?dags=${plenary?.from}`) : Promise.resolve([]),
        instigator_id ? source.get<Messages.Constituency[]>(`/thingmenn/${instigator_id}/kjordaemi?dags=${plenary?.from}`) : Promise.resolve([]),
    ]);

    await store.put<Payload.PlenaryAgenda>(`/loggjafarthing/${assembly_id}/thingfundir/${plenary_id}/lidir/${data.body.item_id}`, {
        ...body,
        plenary: plenary!,
        issue: {
            ...issue!,
            category: issue?.category?.toLowerCase() || 'a'
        },
        assembly: assembly!,

        posed: posed_member,
        posed_title: posed,
        posed_party: posed_party?.at(0) || null,
        posed_constituency: posed_constituency?.at(0) || null,

        answerer: answerer_member,
        answerer_title: answerer,
        answerer_party: answerer_party?.at(0) || null,
        answerer_constituency: answerer_constituency?.at(0) || null,

        counter_answerer: counter_answerer_member,
        counter_answerer_title: counter_answerer,
        counter_answerer_party: counter_answerer_party?.at(0) || null,
        counter_answerer_constituency: counter_answerer_constituency?.at(0) || null,

        instigator: instigator_member,
        instigator_title: instigator,
        instigator_party: instigator_party?.at(0) || null,
        instigator_constituency: instigator_constituency?.at(0) || null,
    });
}
