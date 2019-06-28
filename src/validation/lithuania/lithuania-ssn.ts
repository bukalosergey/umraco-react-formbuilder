// 46411231034 example

export function validateLithuaniaSsn(idNumber: string) {

    if (idNumber == null) {
        return false;
    }

    idNumber = idNumber.trim();
    if (idNumber.length !== 11) {
        return false;
    }

    let century;
    let gender = idNumber[0];

    switch (gender) {
        case "1":
            gender = "Male";
            century = 18;
            break;
        case "2":
            gender = "Female";
            century = 18;
            break;
        case "3":
            gender = "Male";
            century = 19;
            break;
        case "4":
            gender = "Female";
            century = 19;
            break;
        case "5":
            gender = "Male";
            century = 20;
            break;
        case "6":
            gender = "Female";
            century = 20;
            break;
        default:
            return false;
    }

    const dateOfBirth = new Date(Number(century + idNumber.substr(1, 2)), Number(idNumber.substr(3, 2)) - 1, Number(idNumber.substr(5, 2)));

    let b = 1;
    let c = 3;
    let d = 0;
    let e = 0;

    for (let i = 0; i < 10; i++) {
        let digit = parseInt(idNumber[i]);
        d += digit * b;
        e += digit * c;
        b++; if (b == 10) b = 1;
        c++; if (c == 10) c = 1;
    }

    d = d % 11;
    e = e % 11;

    let checksum;
    if (d < 10) {

        checksum = d;

    } else if (e < 10) {

        checksum = e;

    } else {

        checksum = 0;
    }

    const isValid = idNumber[10] === String(checksum);

    if (!isValid) {
        return false;
    }

    return {
        gender,
        dateOfBirth,
        isValid
    }
}