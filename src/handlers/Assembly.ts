import type {
    Assembly,
    AssemblyPayload,
    Message,
    Source,
    Store
} from '../index.d.ts';

export async function handle(data: Message<Assembly>, _source: Source, store: Store): Promise<void> {
    await store.put<AssemblyPayload>(`/loggjafarthing/${data.body.assembly_id}`, data.body);
}
