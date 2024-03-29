type Maybe<T> = null | undefined | T;

export interface Source {
    get: <T>(url: string) => Promise<T | null>
}

export interface Store {
    put: <T>(url: string, data: T) => Promise<number>
}

export interface Message<T> {
    id: number | string
    body: T
    index: string
}

/**
 * This namespace contains the messages sent from The Source through Kafka.
 * This is the shape of the objects as defined by the PHP's The Source system
 */
export namespace Messages {
    export interface Assembly {
        assembly_id: number
        from: Maybe<string>
        to: Maybe<string>
    }

    export interface Category {
        category_id: number;
        super_category_id: Maybe<number>
        title: Maybe<string>
        description: Maybe<string>
    }

    export interface SuperCategory {
        super_category_id: Maybe<number>
        title: Maybe<string>
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

    export interface Issue {
        issue_id: number
        assembly_id: number
        congressman_id: number
        category: string
        name: Maybe<string>
        sub_name: Maybe<string>
        type: Maybe<string>
        type_name: Maybe<string>
        type_subname: Maybe<string>
        status: Maybe<string>
        question: Maybe<string>
        goal: Maybe<string>
        major_changes: Maybe<string>
        changes_in_law: Maybe<string>
        costs_and_revenues: Maybe<string>
        deliveries: Maybe<string>
        additional_information: Maybe<string>
    }

    interface IssueCategory {
        category_id: number
        issue_id: number
        assembly_id: number
        category: string
    }

    export interface PlenaryAgenda {
        item_id: number
        plenary_id: number
        issue_id: number
        assembly_id: number
        category: string
        iteration_type: Maybe<string>
        iteration_continue: Maybe<string>
        iteration_comment: Maybe<string>
        comment: Maybe<string>
        comment_type: Maybe<string>
        posed_id: Maybe<number>
        posed: Maybe<string>
        answerer_id: Maybe<number>
        answerer: Maybe<string>
        counter_answerer_id: Maybe<number>
        counter_answerer: Maybe<string>
        instigator_id: Maybe<number>
        instigator: Maybe<string>
    }

    export interface Plenary {
        plenary_id: number
        assembly_id: number
        from: Maybe<string> //('Y-m-d H:i'),
        to: Maybe<string> //('Y-m-d H:i'),
        name: Maybe<string>
    }

    export interface Speech {
        speech_id: string
        plenary_id: number
        assembly_id: number
        issue_id: number
        category: string
        congressman_id: number
        congressman_type: Maybe<string>
        from: Maybe<string> //('Y-m-d H:i:s'),
        to: Maybe<string> //('Y-m-d H:i:s'),
        text: Maybe<string>
        type: Maybe<string>
        iteration: Maybe<string>
        word_count: number
        validated: boolean
    }

    export interface Document {
        document_id: number
        issue_id: number
        category: string
        assembly_id: number
        date: string //'Y-m-d H:i:s'),
        url: Maybe<string>
        type: string
    }

    export interface CongressmanDocument  {
        document_id: number
        issue_id: number,
        category: string,
        assembly_id: number,
        congressman_id: number,
        minister: Maybe<string>,
        order: number,
    }


    export interface CommitteeDocument  {
        document_committee_id: number
        document_id: number
        assembly_id: number
        issue_id: number
        category: string
        committee_id: number
        part: Maybe<string>
        name: Maybe<string>
    }

    export interface Vote {
        vote_id: number,
        issue_id: number,
        category: string,
        assembly_id: number,
        document_id: Maybe<number>,
        date: Maybe<string>,
        type: Maybe<string>,
        outcome: Maybe<string>,
        method: Maybe<string>,
        yes: Maybe<number>,
        no: Maybe<number>,
        inaction: Maybe<number>,
        committee_to: Maybe<string>,
    }

    export interface VoteItem {
        vote_id: number
        congressman_id: number
        vote: string
        vote_item_id: number
    }
}

/**
 * This namespace contains the payload sent to The Store via HTTP requests
 * This is the shape of object that The Store is expecting.
 */
export namespace Payload {

    export interface Assembly {
        assembly_id: number
        from: Maybe<string>
        to: Maybe<string>
    }

    export interface Committee {
        committee_id: number
        name: string
        abbr_long: Maybe<string>
        abbr_short: Maybe<string>
        first: Maybe<Messages.Assembly>,
        last: Maybe<Messages.Assembly>,
    }

    export interface CommitteeSitting {
        committee_sitting_id: number
        order: Maybe<number>
        role: Maybe<string>
        from: string
        to: Maybe<string>
        assembly: Maybe<Messages.Assembly>,
        committee: Maybe<Messages.Committee>,
        congressman: Maybe<Messages.Congressman>,
        congressman_party: Maybe<Messages.Party>
        congressman_constituency: Maybe<Messages.Constituency>,
        first_committee_assembly: Maybe<Messages.Assembly>,
        last_committee_assembly: Maybe<Messages.Assembly>
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
        from: Maybe<string>
        to: Maybe<string>
        type: Maybe<string>
        abbr: Maybe<string>
        assembly: Messages.Assembly,
        congressman: Messages.Congressman,
        congressman_constituency: Messages.Constituency,
        congressman_party: Maybe<Messages.Party>
    }

    export interface Constituency {
        constituency_id: number
        name: Maybe<string>
        abbr_short: Maybe<string>
        abbr_long: Maybe<string>
        description: Maybe<string>
    }

    export interface Inflation {
        id: number
        value: number
        date: string
    }

    export interface MinisterSitting {
        minister_sitting_id: number
        from: string
        to: Maybe<string>
        assembly: Maybe<Messages.Assembly>
        ministry: Maybe<Messages.Ministry>
        congressman: Maybe<Messages.Congressman>
        congressman_constituency: Maybe<Messages.Constituency>
        congressman_party: Maybe<Messages.Party>
        first_ministry_assembly: Maybe<Messages.Assembly>
        last_ministry_assembly: Maybe<Messages.Assembly>
    }

    export interface Ministry {
        ministry_id: number
        name: Maybe<string>
        abbr_short: Maybe<string>
        abbr_long: Maybe<string>
        first: Maybe<Messages.Assembly>
        last: Maybe<Messages.Assembly>
    }

    export interface Party {
        party_id: number
        name: string
        abbr_short: Maybe<string>
        abbr_long: Maybe<string>
        color: Maybe<string>
    }

    export interface PresidentSitting {
        president_id: number
        from: string
        to: Maybe<string>
        title: string
        abbr: Maybe<string>
        assembly: Maybe<Messages.Assembly>
        congressman: Maybe<Messages.Congressman>
        congressman_party: Maybe<Messages.Party>
        congressman_constituency: Maybe<Messages.Constituency>

    }

    export interface Issue {
        issue_id: number
        assembly?: Messages.Assembly
        congressman?: Messages.Congressman
        category: string
        name: Maybe<string>
        sub_name: Maybe<string>
        type: Maybe<string>
        type_name: Maybe<string>
        type_subname: Maybe<string>
        status: Maybe<string>
        question: Maybe<string>
        goal: Maybe<string>
        major_changes: Maybe<string>
        changes_in_law: Maybe<string>
        costs_and_revenues: Maybe<string>
        deliveries: Maybe<string>
        additional_information: Maybe<string>
        proponents?: Array<{
            congressman: Messages.Congressman,
            party: Messages.Party,
            constituency: Messages.Constituency,
        }>
        content_categories?: Array<Messages.Category>
        content_super_categories?: Array<Messages.SuperCategory>
    }

    export interface Category {
        category_id: number;
        super_category_id: Maybe<number>
        title: Maybe<string>
        description: Maybe<string>
    }

    export interface SuperCategory {
        super_category_id: Maybe<number>
        title: Maybe<string>
    }

    export interface Plenary {
        plenary_id: number
        assembly: Messages.Assembly
        from: Maybe<string> //('Y-m-d H:i'),
        to: Maybe<string> //('Y-m-d H:i'),
        name: Maybe<string>
    }

    export interface PlenaryAgenda {
        item_id: number
        plenary: Messages.Plenary
        issue: Messages.Issue
        assembly: Messages.Assembly
        iteration_type: Maybe<string>
        iteration_continue: Maybe<string>
        iteration_comment: Maybe<string>
        comment: Maybe<string>
        comment_type: Maybe<string>
        posed: Maybe<Messages.Congressman>
        posed_party: Maybe<Messages.Party>
        posed_constituency: Maybe<Messages.Constituency>
        posed_title: Maybe<string>
        answerer: Maybe<Messages.Congressman>
        answerer_party: Maybe<Messages.Party>
        answerer_constituency: Maybe<Messages.Constituency>
        answerer_title: Maybe<string>
        counter_answerer: Maybe<Messages.Congressman>
        counter_answerer_party: Maybe<Messages.Party>
        counter_answerer_constituency: Maybe<Messages.Constituency>
        counter_answerer_title: Maybe<string>
        instigator: Maybe<Messages.Congressman>
        instigator_party: Maybe<Messages.Party>
        instigator_constituency: Maybe<Messages.Constituency>
        instigator_title: Maybe<string>
    }

    interface Speech {
        speech_id: string
        plenary: Maybe<Messages.Plenary>
        assembly: Messages.Assembly
        issue: Messages.Issue
        congressman: Maybe<Messages.Congressman>
        congressman_party: Maybe<Messages.Party>
        congressman_constituency: Maybe<Messages.Constituency>
        congressman_type: Maybe<string>
        from: Maybe<string> //('Y-m-d H:i:s'),
        to: Maybe<string> //('Y-m-d H:i:s'),
        text: Maybe<string>
        type: Maybe<string>
        iteration: Maybe<string>
        word_count: number
        validated: boolean
    }

    export interface Document {
        document_id: number
        issue: Messages.Issue
        assembly: Messages.Assembly
        date: string //'Y-m-d H:i:s'),
        url: Maybe<string>
        type: string
        proponents?: Array<Payload.CongressmanDocument>
        votes: Array<Payload.Vote>
    }

    export interface Vote {
        vote_id: number,
        issue: Messages.Issue,
        assembly: Messages.Assembly,
        document_id: Maybe<number>,
        date: Maybe<string>,
        type: Maybe<string>,
        outcome: Maybe<string>,
        method: Maybe<string>,
        yes: Maybe<number>,
        no: Maybe<number>,
        inaction: Maybe<number>,
        items: VoteItem[],
        committee: Maybe<Messages.Committee>,
        committee_first_assembly: Maybe<Messages.Assembly>
        committee_last_assembly: Maybe<Messages.Assembly>
    }

    export interface VoteItem {
        vote_item_id: number,
        vote_id: number,
        congressman: Messages.Congressman,
        party: Maybe<Messages.Party>,
        constituency: Maybe<Messages.Constituency>,
        vote: string,
    }

    export interface CongressmanDocument {
        congressman: Messages.Congressman,
        party: Maybe<Messages.Party>,
        constituency: Maybe<Messages.Constituency>,
        minister: Maybe<string>,
        order: number,
    }

    export interface CommitteeDocument {
        document_committee_id: number
        document_id: number
        assembly_id: number
        issue_id: number
        category: string
        committee?: Maybe<Messages.Committee>
        committee_name?: Maybe<string>
        committee_part?: Maybe<string>
        committee_first_assembly: Maybe<Messages.Assembly>
        committee_last_assembly: Maybe<Messages.Assembly>
    }
}
