type Maybe<T> = null | undefined | T;

export interface Message<T>  {
    id : number | string
    body: T
    index : string
}

export interface Assembly {
    assembly_id: number
    from: Maybe<string>
    to: Maybe<string>
}

export interface Ministry {
    ministry_id: number
    name: Maybe<string>
    abbr_short: Maybe<string>
    abbr_long: Maybe<string>
    first: Maybe<number>
    last: Maybe<number>
}

export interface Party {
    party_id: number
    name: string
    abbr_short: Maybe<string>
    abbr_long: Maybe<string>
    color: Maybe<string>
}

export interface Constituency {
    constituency_id: number
    name: Maybe<string>
    abbr_short: Maybe<string>
    abbr_long: Maybe<string>
    description: Maybe<string>
}

export interface Source {
    get: (url: string) => Promise<Record<string, unknown> | Array<Record<string, unknown>>>
}

export interface Store {
    put: (url: string, data: unknown) => Promise<number>
}
