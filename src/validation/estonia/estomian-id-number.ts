const idCardPrefixRegexPattern = /^[Aa][A-Za-z]/;
const passportPrefixRegexPattern = /^[KVkv][A-Za-z]/;
const livingPermitPrefixRegexPattern = /^[PBEFpbef][A-Za-z]/;

function validateIdStructure(value: string) {

    if (!value) {
        return false;
    }

    const parts = getDocParts(value);
    if (!parts.charPart || !parts.numPart) {
        return false;
    }

    //the numeric part must contain 7 digit number
    const isNumeric = /^[0-9]{7}/.test(parts.numPart);
    const documentPrefix = parts.charPart.toUpperCase();

    return {
        documentPrefix,
        isValid: isNumeric && parts.numPart.length === 7
    };
}

function getDocParts(value: string) {

    let charPart = "";
    let numPart = "";

    if (value.length == 8) {

        charPart = value.substr(0, 1);
        numPart = value.substr(1);

    } else if (value.length == 9) {
        charPart = value.substr(0, 2);
        numPart = value.substr(2);
    }

    return { charPart, numPart };
}

export function validateEstonianIdCard(value: string) {


    var numericPartValidation = validateIdStructure(value);

    if (!numericPartValidation || !numericPartValidation.isValid) {
        return false
    }

    return idCardPrefixRegexPattern.test(numericPartValidation.documentPrefix) || numericPartValidation.documentPrefix === "N";
}

export function validateEstonianPassport(value: string) {

    var numericPartValidation = validateIdStructure(value);

    if (!numericPartValidation || !numericPartValidation.isValid) {
        return false
    }

    return passportPrefixRegexPattern.test(numericPartValidation.documentPrefix);
}

export function validateEstonianLivingPermit(value: string) {

    var numericPartValidation = validateIdStructure(value);

    if (!numericPartValidation || !numericPartValidation.isValid) {
        return false
    }

    return livingPermitPrefixRegexPattern.test(numericPartValidation.documentPrefix);
}

export function validateEstonianIdNumber(value: string) {

    const validations: { [key: string]: (value: string) => boolean } = {
        IdCard: validateEstonianIdCard,
        Passport: validateEstonianPassport,
        LivingPermit: validateEstonianLivingPermit
    };

    for (const key in validations) {

        const isValid = validations[key](value);

        if (isValid) {
            return key;
        };
    }
}