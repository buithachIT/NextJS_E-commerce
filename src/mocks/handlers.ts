import { EXTERNAL_HANDLERS } from './handlers/external';
import { INTERNAL_HANDLERS } from './handlers/internal';

export const handlers = [...EXTERNAL_HANDLERS, ...INTERNAL_HANDLERS];
