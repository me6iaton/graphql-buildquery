const strintifyFieldlist = (...inArgs) => {
    let flatFieldList = [];

    inArgs.forEach(fieldList => {

        if (typeof fieldList === 'string') {
            flatFieldList = flatFieldList.concat(fieldList.split(' '));
        }

        else if (Array.isArray(fieldList)) {
            const internalParts = fieldList.map(singleList=> strintifyFieldlist(singleList));
            flatFieldList = flatFieldList.concat(...internalParts);
        }
        else if (typeof fieldList === 'object') {
            for (const fieldName in fieldList) {
                const innerFlat = strintifyFieldlist(fieldList[fieldName]);
                if(fieldName === '$')
                {
                    //The special $ key indicates the following is a list on the main object
                    //its just added with a magic key as a convenience
                    //Simple fields of the main root object
                    flatFieldList = flatFieldList.concat(innerFlat);
                }
                else {
                    flatFieldList = flatFieldList.concat(fieldName + " { " + innerFlat + " }");
                }
            }
        }
    });

    return flatFieldList.join(' ');
}


export default strintifyFieldlist;