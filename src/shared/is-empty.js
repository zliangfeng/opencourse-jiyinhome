
const stringEmptyReg = /^\s*$/;
const emptyObjects = ["", undefined, null];

export const isEmpty = (obj) => {

    if (emptyObjects.includes(obj)) return true;

    let result = false;

    switch (typeof obj) {
        case "string":
            // statements_1
            result = stringEmptyReg.exec(obj) !== null
            break;
        default:
            break;
    }

    return result;
}