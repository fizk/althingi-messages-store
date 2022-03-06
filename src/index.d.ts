type Maybe<T> = null | undefined | T;

export interface DataStructure {
    value1: string
    value2: string
}

export interface Message<T>  {
    'id' : number | string
    'body': T
    'index' : string
}

export interface Assembly {
    'assembly_id': string
    'from': Maybe<string>
    'to': Maybe<string>
}

export interface Source {
    get: (url: string) => Promise<Record<string, unknown> | Array<Record<string, unknown>>>
}

export interface Store {
    put: (url: string, data: unknown) => Promise<number>
}