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
import { Messages } from './index.d.ts';

runner<Messages.Assembly>('assembly.add', 'AssemblyHandler.add', AssemblyHandler.handle);
runner<Messages.Assembly>('assembly.update', 'AssemblyHandler.update', AssemblyHandler.handle);

runner<Messages.Ministry>('ministry.add', 'MinistryHandler.add', MinistryHandler.handle);
runner<Messages.Ministry>('ministry.update', 'MinistryHandler.update', MinistryHandler.handle);

runner<Messages.Party>('party.add', 'PartyHandler.add', PartyHandler.handle);
runner<Messages.Party>('party.update', 'PartyHandler.update', PartyHandler.handle);

runner<Messages.Constituency>('constituency.add', 'ConstituencyHandler.add', ConstituencyHandler.handle);
runner<Messages.Constituency>('constituency.update', 'ConstituencyHandler.update', ConstituencyHandler.handle);

runner<Messages.Committee>('committee.add', 'CommitteeHandler.add', CommitteeHandler.handle);
runner<Messages.Committee>('committee.update', 'CommitteeHandler.update', CommitteeHandler.handle);

runner<Messages.Inflation>('inflation.add', 'InflationHandler.add', InflationHandler.handle);
runner<Messages.Inflation>('inflation.update', 'InflationHandler.update', InflationHandler.handle);

runner<Messages.Congressman>('congressman.add', 'CongressmanHandler.add', CongressmanHandler.handle);
runner<Messages.Congressman>('congressman.update', 'CongressmanHandler.update', CongressmanHandler.handle);

runner<Messages.CongressmanSitting>('session.add', 'CongressmanSittingHandler.add', CongressmanSittingHandler.handle);
runner<Messages.CongressmanSitting>('session.update', 'CongressmanSittingHandler.update', CongressmanSittingHandler.handle);

runner<Messages.CommitteeSitting>('committee-sitting.add', 'CommitteeSittingHandler.add', CommitteeSittingHandler.handle);
runner<Messages.CommitteeSitting>('committee-sitting.update', 'CommitteeSittingHandler.update', CommitteeSittingHandler.handle);

runner<Messages.MinisterSitting>('minister-sitting.add', 'MinisterSittingHandler.add', MinisterSittingHandler.handle);
runner<Messages.MinisterSitting>('minister-sitting.update', 'MinisterSittingHandler.update', MinisterSittingHandler.handle);

runner<Messages.PresidentSitting>('president.add', 'PresidentSittingHandler.add', PresidentSittingHandler.handle);
runner<Messages.PresidentSitting>('president.update', 'PresidentSittingHandler.update', PresidentSittingHandler.handle);

runner<Messages.Issue>('issue.add', 'IssueHandler.add', IssueHandler.handle);
runner<Messages.Issue>('issue.update', 'IssueHandler.update', IssueHandler.handle);

runner<Messages.PlenaryAgenda>('plenary-agenda.add', 'PlenaryAgendaHandler.add', PlenaryAgendaHandler.handle);
runner<Messages.PlenaryAgenda>('plenary-agenda.update', 'PlenaryAgendaHandler.update', PlenaryAgendaHandler.handle);

runner<Messages.Plenary>('plenary.add', 'PlenaryHandler.add', PlenaryHandler.handle);
runner<Messages.Plenary>('plenary.update', 'PlenaryHandler.update', PlenaryHandler.handle);
