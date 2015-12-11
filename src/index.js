//TODO: support aliases for fields and queries
import defineField from './define-field.js';
import {literalQueryValue as litValue} from './utils/stringify-params.js';

export const literalQueryValue = litValue;
export default defineField;