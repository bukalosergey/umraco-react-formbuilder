import { validateEstoniaSsn } from "./esonian-ssn";
import { validateEstonianIdCard, validateEstonianPassport, validateEstonianLivingPermit, validateEstonianIdNumber } from "./estomian-id-number";

test("validation of estonian ssn", () => {

    const result = validateEstoniaSsn("47101010033");

    expect(result).toBeTruthy();

    const badResult = validateEstoniaSsn("47101018044");

    expect(badResult).toBeFalsy();
})

describe("validation of estonian idnumber", () => {

    test.each([
        ["aa1234567"],
        ["aA1234567"],
        ["N1234567"]
    ])("estonian id number should be valid idcard %s", (idnumber) => {

        const result = validateEstonianIdCard(idnumber);
        expect(result).toBeTruthy();  
    })

    test.each([
        ["aa12345679"],
        ["aA123456"],
        ["NN1234567"]
    ])("estonian id number should be invalid idcard %s", (idnumber) => {

        const result = validateEstonianIdCard(idnumber);
        expect(result).toBeFalsy();  
    })

    test.each([
        ["Kv1234567"],
        ["Vk1234567"]
    ])("estonian id number should be valid passport %s", (idnumber) => {

        const result = validateEstonianPassport(idnumber);
        expect(result).toBeTruthy();  
    })

    test.each([
        ["aa12345679"],
        ["aA123456"],
        ["NN1234567"]
    ])("estonian id number should be invalid passport %s", (idnumber) => {

        const result = validateEstonianPassport(idnumber);
        expect(result).toBeFalsy();  
    })

    test.each([
        ["PB1234567"],
        ["EE1234567"],
        ["Fe1234567"]
    ])("estonian id number should be valid living permit %s", (idnumber) => {

        const result = validateEstonianLivingPermit(idnumber);
        expect(result).toBeTruthy();  
    })

    test.each([
        ["PBE12345679"],
        ["aA123456"],
        ["NN1234567"]
    ])("estonian id number should be invalid living permit %s", (idnumber) => {

        const result = validateEstonianLivingPermit(idnumber);
        expect(result).toBeFalsy();  
    })

    test.each([
        ["aa1234567", "IdCard"],
        ["Kv1234567", "Passport"],
        ["Fe1234567", "LivingPermit"]
    ])("estonian id number should be valid id number %s of type %s", (idnumber, type) => {

        const result = validateEstonianIdNumber(idnumber);
        expect(result).toEqual(type);  
    })

    test.each([
        ["aa1234567789"],
        ["RK1234567"],
        ["Fe123456765"]
    ])("estonian id number should be valid id number %s", (idnumber) => {

        const result = validateEstonianIdNumber(idnumber);
        expect(result).toBeFalsy();  
    })
})
