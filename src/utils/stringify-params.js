const hiddenLiteralFlag = '@@@5823__QB_IS_LITERAL';

export const literalQueryValue = value => ({
                         value,
    [hiddenLiteralFlag]: true
})

const encapsulateValue = input => {
    if (typeof input === 'number') {
        return input;
    }
    return '"' + input.replace(/"/g, '\\"') + '"';
}


const stringifyParams = paramConfig => {
    let parts = [];
    for (const paramKey in paramConfig) {
        let paramValue = paramConfig[paramKey];

        //Exclude null and undefined parameters as per GraphQL specs
        if (paramValue === null || typeof paramValue === 'undefined') continue;

        if (['string', 'number'].indexOf(typeof paramValue) > -1) {
            paramValue = encapsulateValue(paramValue);
        }
        else if (Array.isArray(paramValue)) {
            const escapedOrLiteral = paramValue.map(val => {
                if (typeof val === 'object' && val[hiddenLiteralFlag] === true) {
                    return val.value;
                }
                return encapsulateValue(val);
            });
            paramValue = "[" + escapedOrLiteral.join(", ") + "]";
        } else if (typeof paramValue === 'object') {

            if (paramValue[hiddenLiteralFlag] === true) {
                paramValue = paramValue.value;
            }
            else paramValue = "{" + stringifyParams(paramValue) + "}";
        }

        parts = parts.concat(paramKey + ": " + paramValue);
    }

    return parts.join(" ");
};

export default stringifyParams;