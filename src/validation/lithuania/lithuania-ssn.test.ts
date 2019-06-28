import { validateLithuaniaSsn } from "./lithuania-ssn";

test("validation of lithuania ssn", () => {

    const result = validateLithuaniaSsn("46411231034");
    expect(result).toBeTruthy();
    result && expect(result.isValid).toBeTruthy();
})