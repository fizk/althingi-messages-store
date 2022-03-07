import { runner } from './runner.ts';
import * as AssemblyHandler from './handlers/Assembly.ts';
import * as MinistryHandler from './handlers/Ministry.ts';
import * as PartyHandler from './handlers/Party.ts';
import type { Assembly, Ministry, Party } from './index.d.ts';


runner<Assembly>('assembly.add', 'AssemblyHandler.add', AssemblyHandler.add);
runner<Assembly>('assembly.update', 'AssemblyHandler.update', AssemblyHandler.update);

runner<Ministry>('ministry.add', 'MinistryHandler.add', MinistryHandler.add);
runner<Ministry>('ministry.update', 'MinistryHandler.update', MinistryHandler.update);

runner<Party>('party.add', 'PartyHandler.add', PartyHandler.add);
runner<Party>('party.update', 'PartyHandler.update', PartyHandler.update);
