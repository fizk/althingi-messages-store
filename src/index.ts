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
import type {
    Assembly,
    Committee,
    CommitteeSitting,
    Congressman,
    CongressmanSitting,
    Constituency,
    Ministry,
    MinisterSitting,
    Inflation,
    Party,
    PresidentSitting,
} from './index.d.ts';

runner<Assembly>('assembly.add', 'AssemblyHandler.add', AssemblyHandler.handle);
runner<Assembly>('assembly.update', 'AssemblyHandler.update', AssemblyHandler.handle);

runner<Ministry>('ministry.add', 'MinistryHandler.add', MinistryHandler.handle);
runner<Ministry>('ministry.update', 'MinistryHandler.update', MinistryHandler.handle);

runner<Party>('party.add', 'PartyHandler.add', PartyHandler.handle);
runner<Party>('party.update', 'PartyHandler.update', PartyHandler.handle);

runner<Constituency>('constituency.add', 'ConstituencyHandler.add', ConstituencyHandler.handle);
runner<Constituency>('constituency.update', 'ConstituencyHandler.update', ConstituencyHandler.handle);

runner<Committee>('committee.add', 'CommitteeHandler.add', CommitteeHandler.handle);
runner<Committee>('committee.update', 'CommitteeHandler.update', CommitteeHandler.handle);

runner<Inflation>('inflation.add', 'InflationHandler.add', InflationHandler.handle);
runner<Inflation>('inflation.update', 'InflationHandler.update', InflationHandler.handle);

runner<Congressman>('congressman.add', 'CongressmanHandler.add', CongressmanHandler.handle);
runner<Congressman>('congressman.update', 'CongressmanHandler.update', CongressmanHandler.handle);

runner<CongressmanSitting>('session.add', 'CongressmanSittingHandler.add', CongressmanSittingHandler.handle);
runner<CongressmanSitting>('session.update', 'CongressmanSittingHandler.update', CongressmanSittingHandler.handle);

runner<CommitteeSitting>('committee-sitting.add', 'CommitteeSittingHandler.add', CommitteeSittingHandler.handle);
runner<CommitteeSitting>('committee-sitting.update', 'CommitteeSittingHandler.update', CommitteeSittingHandler.handle);

runner<MinisterSitting>('minister-sitting.add', 'MinisterSittingHandler.add', MinisterSittingHandler.handle);
runner<MinisterSitting>('minister-sitting.update', 'MinisterSittingHandler.update', MinisterSittingHandler.handle);

runner<PresidentSitting>('president.add', 'PresidentSittingHandler.add', PresidentSittingHandler.handle);
runner<PresidentSitting>('president.update', 'PresidentSittingHandler.update', PresidentSittingHandler.handle);
