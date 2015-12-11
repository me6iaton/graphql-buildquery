import stringifyParams from './utils/stringify-params.js';
import strintifyFieldlist from './utils/stringify-fieldlist';


export default (rootQueryName, paramConfig, fieldDef) => {

    let listerParams = '';

    if (paramConfig && Object.keys(paramConfig).length > 0) {
        listerParams = " (" + stringifyParams(paramConfig) + ")";
    }

    const content = strintifyFieldlist(fieldDef);
    return rootQueryName + listerParams + " { " + content + " }";
}