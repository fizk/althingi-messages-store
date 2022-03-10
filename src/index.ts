import { runner } from './runner.ts';
import * as AssemblyHandler from './handlers/Assembly.ts';
import * as MinistryHandler from './handlers/Ministry.ts';
import * as PartyHandler from './handlers/Party.ts';
import * as ConstituencyHandler from './handlers/Constituency.ts';
import * as CommitteeHandler from './handlers/Committee.ts';
import * as InflationHandler from './handlers/Inflation.ts';
import * as CongressmanHandler from './handlers/Congressman.ts';
import type {
    Assembly,
    Ministry,
    Party,
    Committee,
    Congressman,
    Constituency,
    Inflation
} from './index.d.ts';

runner<Assembly>('assembly.add', 'AssemblyHandler.add', AssemblyHandler.add);
runner<Assembly>('assembly.update', 'AssemblyHandler.update', AssemblyHandler.update);

runner<Ministry>('ministry.add', 'MinistryHandler.add', MinistryHandler.add);
runner<Ministry>('ministry.update', 'MinistryHandler.update', MinistryHandler.update);

runner<Party>('party.add', 'PartyHandler.add', PartyHandler.add);
runner<Party>('party.update', 'PartyHandler.update', PartyHandler.update);

runner<Constituency>('constituency.add', 'ConstituencyHandler.add', ConstituencyHandler.add);
runner<Constituency>('constituency.update', 'ConstituencyHandler.update', ConstituencyHandler.update);

runner<Committee>('committee.add', 'CommitteeHandler.add', CommitteeHandler.add);
runner<Committee>('committee.update', 'CommitteeHandler.update', CommitteeHandler.update);

runner<Inflation>('inflation.add', 'InflationHandler.add', InflationHandler.add);
runner<Inflation>('inflation.update', 'InflationHandler.update', InflationHandler.update);

runner<Congressman>('congressman.add', 'CongressmanHandler.add', CongressmanHandler.add);
runner<Congressman>('congressman.update', 'CongressmanHandler.update', CongressmanHandler.update);
