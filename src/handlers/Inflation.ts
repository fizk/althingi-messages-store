import type {
    Inflation,
    InflationPayload,
    Message,
    Source,
    Store
} from '../index.d.ts';

export async function handle(data: Message<Inflation>, _source: Source, store: Store): Promise<void> {
    await store.put<InflationPayload>(`/verdbolga/${data.body.id}`, data.body);
}
