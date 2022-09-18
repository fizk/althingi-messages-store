import { runner } from './runner.ts';
import * as AssemblyHandler from './handlers/Assembly.ts';
import * as MinistryHandler from './handlers/Ministry.ts';
import * as PartyHandler from './handlers/Party.ts';
import * as ConstituencyHandler from './handlers/Constituency.ts';
import * as CommitteeHandler from './handlers/Committee.ts';
import * as InflationHandler from './handlers/Inflation.ts';
import * as CongressmanHandler from './handlers/Congressman.ts';
import * as CongressmanSittingHandler from './handlers/CongressmanSitting.ts';
import * as CommitteeSittingHandler from './handlers/CommitteeSitting.ts';
import * as MinisterSittingHandler from './handlers/MinisterSitting.ts';
import * as PresidentSittingHandler from './handlers/PresidentSitting.ts';
import * as IssueHandler from './handlers/Issue.ts';
import * as PlenaryAgendaHandler from './handlers/PlenaryAgenda.ts';
import * as PlenaryHandler from './handlers/Plenary.ts';
import * as IssueCategoryHandler from './handlers/IssueCategory.ts';
import * as SpeechHandler from './handlers/Speech.ts';
import * as DocumentHandler from './handlers/Document.ts';
import * as DocumentVoteHandler from './handlers/DocumentVote.ts';
import * as DocumentVoteItemHandler from './handlers/DocumentVoteItem.ts';
import * as DocumentCommitteeHandler from './handlers/DocumentCommittee.ts';
import * as DocumentCongressmanHandler from './handlers/DocumentCongressman.ts';
import { Messages } from './index.d.ts';

runner<Messages.Assembly>('assembly.add', 'AssemblyHandler.add', AssemblyHandler.add);
runner<Messages.Assembly>('assembly.update', 'AssemblyHandler.update', AssemblyHandler.add);

runner<Messages.Ministry>('ministry.add', 'MinistryHandler.add', MinistryHandler.add);
runner<Messages.Ministry>('ministry.update', 'MinistryHandler.update', MinistryHandler.add);

runner<Messages.Party>('party.add', 'PartyHandler.add', PartyHandler.add);
runner<Messages.Party>('party.update', 'PartyHandler.update', PartyHandler.add);

runner<Messages.Constituency>('constituency.add', 'ConstituencyHandler.add', ConstituencyHandler.add);
runner<Messages.Constituency>('constituency.update', 'ConstituencyHandler.update', ConstituencyHandler.add);

runner<Messages.Committee>('committee.add', 'CommitteeHandler.add', CommitteeHandler.add);
runner<Messages.Committee>('committee.update', 'CommitteeHandler.update', CommitteeHandler.add);

runner<Messages.Inflation>('inflation.add', 'InflationHandler.add', InflationHandler.add);
runner<Messages.Inflation>('inflation.update', 'InflationHandler.update', InflationHandler.add);

runner<Messages.Congressman>('congressman.add', 'CongressmanHandler.add', CongressmanHandler.add);
runner<Messages.Congressman>('congressman.update', 'CongressmanHandler.update', CongressmanHandler.add);

runner<Messages.CongressmanSitting>('session.add', 'CongressmanSittingHandler.add', CongressmanSittingHandler.add);
runner<Messages.CongressmanSitting>('session.update', 'CongressmanSittingHandler.update', CongressmanSittingHandler.add);

runner<Messages.CommitteeSitting>('committee-sitting.add', 'CommitteeSittingHandler.add', CommitteeSittingHandler.add);
runner<Messages.CommitteeSitting>('committee-sitting.update', 'CommitteeSittingHandler.update', CommitteeSittingHandler.add);

runner<Messages.MinisterSitting>('minister-sitting.add', 'MinisterSittingHandler.add', MinisterSittingHandler.add);
runner<Messages.MinisterSitting>('minister-sitting.update', 'MinisterSittingHandler.update', MinisterSittingHandler.add);

runner<Messages.PresidentSitting>('president.add', 'PresidentSittingHandler.add', PresidentSittingHandler.add);
runner<Messages.PresidentSitting>('president.update', 'PresidentSittingHandler.update', PresidentSittingHandler.add);

runner<Messages.Issue>('issue.add', 'IssueHandler.add', IssueHandler.add);
runner<Messages.Issue>('issue.update', 'IssueHandler.update', IssueHandler.update);

runner<Messages.PlenaryAgenda>('plenary-agenda.add', 'PlenaryAgendaHandler.add', PlenaryAgendaHandler.add);
runner<Messages.PlenaryAgenda>('plenary-agenda.update', 'PlenaryAgendaHandler.update', PlenaryAgendaHandler.add);

runner<Messages.Plenary>('plenary.add', 'PlenaryHandler.add', PlenaryHandler.add);
runner<Messages.Plenary>('plenary.update', 'PlenaryHandler.update', PlenaryHandler.add);

runner<Messages.IssueCategory>('issue-category.add', 'IssueCategory.add', IssueCategoryHandler.add);

runner<Messages.Speech>('speech.add', 'Speech.add', SpeechHandler.add);
runner<Messages.Speech>('speech.update', 'Speech.update', SpeechHandler.add);

runner<Messages.Document>('document.add', 'Document.add', DocumentHandler.add);

runner<Messages.Vote>('vote.add', 'DocumentVote.add', DocumentVoteHandler.add);

runner<Messages.VoteItem>('vote-item.add', 'DocumentVoteItem.add', DocumentVoteItemHandler.add);

runner<Messages.CommitteeDocument>('committee-document.add', 'DocumentCommittee.add', DocumentCommitteeHandler.add);

runner<Messages.CongressmanDocument>('congressman-document.add', 'DocumentCongressman.add', DocumentCongressmanHandler.add);

console.log('started');
