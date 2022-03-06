import { runner } from './runner.ts';
import * as AssemblyHandler from './handlers/Assembly.ts';
import type { Assembly } from './index.d.ts';


runner<Assembly>('assembly.add', 'AssemblyHandler.add', AssemblyHandler.add);
runner<Assembly>('assembly.update', 'AssemblyHandler.update', AssemblyHandler.update);