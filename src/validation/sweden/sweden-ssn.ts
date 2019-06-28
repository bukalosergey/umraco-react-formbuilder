/**
 * The luhn validator will encapsulate all the details about validating a swedish
 * social security number, by using a checksum.
 *
 * @param String val - the proposed ssn
 *
 * @returns Bool
 */
function luhnAlgorithm(val: string) {
    const ssn = val
        .replace(/\D/g, "")
        .split("")
        .reverse()
        .slice(0, 10);

    if (ssn.length !== 10) {
        return false;
    }

    const sum = ssn
        .map(Number)
        .reduce(function (previous, current, index) {
            // multiply every other number with two
            if (index % 2) current *= 2;
            // if larger than 10 get sum of individual digits (also n-9)
            if (current > 9) current -= 9;
            // sum it up
            return previous + current;
        });

    // sum must be divisible by 10
    return 0 === sum % 10;
};

/**
 *
 * Check if value is string and removes non numbers, if valuelength is 10 or 12 returns last 10 characters
 *
 * @param String value
 *
 * @returns String
 */
function clean(value: string | number) {

    if (typeof (value) === "number" && value != undefined) {

        value = value.toString();

    } else if (typeof (value) != "string" || value == undefined) {
        return "";
    }

    value = value.replace(/\D/g, "");

    switch (value.length) {
        case 10:
            return value;
        case 12:
            return value.substring(2);
        default:
            return "";
    }
};

/**
 *
 * Split value and return as array in groups of 2
 *
 * @param String value
 *
 * @returns Array - value in groups of 2 characters
 */
const splitNumber = function splitNumber(value: string) {
    return value.match(/.{1,2}/g);
};

export default class SwedishSSN {
    /**
     *
     * Validate Corporate identity number
     *
     * @param {string} value - cin
     * @returns {string} - cin
     */
    static isCin(cin: string) {

        cin = clean(cin);
        if (!cin) {
            return null;
        }

        //Corperate identity: If month is 20 or larger
        if (Number(splitNumber(cin)[1]) < 20) {
            return null;
        }

        //Validate number with luhn algorithm
        if (!luhnAlgorithm(cin)) {
            return null;
        }
        return cin;

    }

    /**
     *
     * Validate Swedish social security numbers
     *
     * @param String value - ssn
     *
     * @returns String - ssn
     */
    static isSSn(ssn: string) {

        ssn = clean(ssn);
        if (!ssn) {
            return false;
        }

        const splitNubmer = splitNumber(ssn);
        if ((Number(splitNubmer[2]) > 31 && Number(splitNubmer[2]) < 60) && Number(splitNubmer[1]) > 12) {
            return false;
        }

        //Validate number with luhn algorithm
        if (!luhnAlgorithm(ssn)) {
            return false;
        }

        return true;
    }

    static getDateOfBirth(ssn: string): Date {

        ssn = clean(ssn);
        if (!ssn) {
            return null;
        }

        const dateOfBirth = new Date(Number(ssn.substr(0, 4)), Number(ssn.substr(4, 2)) - 1, Number(ssn.substr(6, 2)));

        return isNaN(dateOfBirth.valueOf()) ? null : dateOfBirth;
        
    }
};