import { validateNorwegianIdNumber } from "./norway-ssn";

test("validation of norway ssn", () => {

    const result = validateNorwegianIdNumber("29029600013");
    expect(result).toBeTruthy();

    const badResult = validateNorwegianIdNumber("29029600014");
    expect(badResult).toBeFalsy();
})