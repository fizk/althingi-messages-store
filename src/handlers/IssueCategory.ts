import type {
    Message,
    Source,
    Store,
    Messages,
    Payload
} from '../index.d.ts';

export async function add(data: Message<Messages.IssueCategory>, source: Source, store: Store): Promise<void> {
    const {assembly_id, category, issue_id, category_id} = data.body;

    const contentCategory = await source.get<Messages.Category>(
        `/loggjafarthing/${assembly_id}/thingmal/${category}/${issue_id}/efnisflokkar/${category_id}`
    );
    await store.put<Payload.Category>(
        `/loggjafarthing/${assembly_id}/thingmal/${category.toLowerCase()}/${issue_id}/efnisflokkar`,
        contentCategory!
    );

    const contentSuperCategory = contentCategory?.super_category_id
        ? await source.get<Messages.SuperCategory>(`/thingmal/efnisflokkar/${contentCategory?.super_category_id}`)
        : null;

    contentSuperCategory
        ? await store.put<Payload.SuperCategory>(
            `/loggjafarthing/${assembly_id}/thingmal/${category.toLowerCase()}/${issue_id}/efnishopar`,
            contentSuperCategory!
        )
        : null;
}

