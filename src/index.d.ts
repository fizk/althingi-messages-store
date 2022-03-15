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

export interface Committee {
    committee_id: number
    name: string
    first_assembly_id: Maybe<number>
    last_assembly_id: Maybe<number>
    abbr_long: Maybe<string>
    abbr_short: Maybe<string>
}

export interface Inflation {
    id: number
    value: number
    date: string
}

export interface Congressman {
    congressman_id: number
    name: string
    birth: string
    death: Maybe<string>
    abbreviation: Maybe<string>
}

export interface CongressmanSitting {
    session_id: number
    congressman_id: number
    constituency_id: number
    assembly_id: number
    party_id: Maybe<number>
    from: Maybe<string>
    to: Maybe<string>
    type: Maybe<string>
    abbr: Maybe<string>
}

export interface CommitteeSitting {
    committee_sitting_id: number
    congressman_id: number
    committee_id: number
    assembly_id: number
    order: Maybe<number>
    role: Maybe<string>
    from: string
    to: Maybe<string>
}

export interface PresidentSitting {
    president_id : number
    congressman_id: number
    assembly_id: number
    from : string
    to: Maybe<string>
    title: string
    abbr: Maybe<string>
}

export interface MinisterSitting {
    minister_sitting_id : number
    assembly_id: number
    ministry_id: number
    congressman_id: number
    party_id: Maybe<number>
    from: string
    to: Maybe<string>
}

export interface Source {
    get: <T>(url: string) => Promise<T>
}

export interface Store {
    put: (url: string, data: unknown) => Promise<number>
}
