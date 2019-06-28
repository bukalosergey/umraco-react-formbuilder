import { validateLatviaSsn } from "./latvia-ssn";

test("validation of latvia ssn", () => {

    const result = validateLatviaSsn("161175-19997");

    expect(result).toBeTruthy();

    const badResult = validateLatviaSsn("161175-19998");

    expect(badResult).toBeFalsy();
})