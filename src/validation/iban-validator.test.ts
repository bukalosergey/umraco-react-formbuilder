import { isValid } from "iban";

describe("validate Iban", () => {

    it('should return false for an unknown country code digit', function () {
        expect(isValid('ZZ68539007547034')).toBeFalsy();
    });

    it('should return true for a valid belgian Iban', function () {
        expect(isValid('BE68539007547034')).toBeTruthy();
    });

    it('should return true for a valid Dutch Iban', function () {
        expect(isValid('NL86INGB0002445588')).toBeTruthy();
    });

    it('should return true for a valid Moldovan Iban', function () {
        expect(isValid('MD75EX0900002374642125EU')).toBeTruthy();
    });

    it('should return true for a valid Saint-Lucia Iban', function () {
        expect(isValid('LC55HEMM000100010012001200023015')).toBeTruthy();
    });

    it('should return false for an incorrect check digit', function () {
        expect(isValid('BE68539007547035')).toBeFalsy();
    });

    it('should return true for a valid Côte d\'Ivoire Iban', function () {
        expect(isValid('CI93CI0080111301134291200589')).toBeTruthy();
    });

    it('should return true for a valid Estonian Iban', function () {
        expect(isValid('EE382200221020145685')).toBeTruthy();
    });

})
