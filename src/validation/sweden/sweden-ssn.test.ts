import SwedishSSN from "./sweden-ssn";

test("validation of sweden ssn", () => {

    const result = SwedishSSN.isSSn("9105041835");

    expect(result).toBeTruthy();

    const badResult = SwedishSSN.isSSn("9105041839");

    expect(badResult).toBeFalsy();
})