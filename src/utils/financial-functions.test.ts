import { PMT } from "./financial-functions";

test("PMT 3000 loan for 12 years with interest of 0.1", () => {
    expect(PMT(0.1 / 12, 12, 3000)).toBe(-263.75);
});
