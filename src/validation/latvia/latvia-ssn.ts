// example 161175-19997

export function validateLatviaSsn(idNumber: string) {

    // take dash into account (cause latvian SSN can have ######-##### format)
    if (idNumber.length < 7) {
        return false;
    }

    if (idNumber[6] == '-') {
        idNumber = idNumber.substr(0, 6) + idNumber.substr(7);
    }

    if (idNumber.length != 11) {
        return false;
    }

    const centuryDigit = parseInt(idNumber.substr(6, 1));

    if (isNaN(centuryDigit)) {
        return false;
    }

    let birthDateString = idNumber.substr(0, 4);

    switch (centuryDigit) {
        case 0:
            birthDateString += "18";
            break;
        case 1:
            birthDateString += "19";
            break;
        case 2:
            birthDateString += "20";
            break;
        default:
            return false;
    }

    birthDateString += idNumber.substr(4, 2);

    const dateOfBirth = new Date(Number(birthDateString.substr(4)), Number(birthDateString.substr(2, 2)) - 1, Number(birthDateString.substr(0, 2)))

    if (isNaN(dateOfBirth.valueOf())) {
        return false;
    }

    const weights = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let checksum = 1101;

    let digit;
    for (let i = 0; i < weights.length; i++) {

        digit = parseInt(String(idNumber[i]));

        if (isNaN(digit)) {
            return false;
        }

        checksum -= digit * weights[i];
    }

    digit = parseInt(String(idNumber[10]));
    const isValid = digit === (checksum % 11);

    if (!isValid) {
        return false;
    }

    return {
        isValid,
        dateOfBirth,
        gender: Math.floor(dateOfBirth.getFullYear() / 100) * 2 - 34
    };
}