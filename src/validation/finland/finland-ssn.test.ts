import FinnishSSN from "./finland-ssn";

test("validation of finland ssn", () => {

    const result = FinnishSSN.validate("010101-100X");

    expect(result).toBeTruthy();

    const badResult = FinnishSSN.validate("010101-150X");

    expect(badResult).toBeFalsy();
})