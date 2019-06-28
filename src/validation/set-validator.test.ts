import { setValidators } from "./set-validators";
import { IFormSettings } from "../interfaces/i-form-settings";
import { IFormControl } from "../interfaces/i-form-control";
import { findControlByName } from "../common/helpers";

const formSettings: IFormSettings = {
    formMeta: {
        pageId: 1,
        product: "string",
        market: "string"
    },
    requiredMessage: "",
    formName: "",
    controls: [{
        "fieldSetName": "section 1",
        "controls": [
            { "required": true, "controlName": "mainApplicant.occupationType", "type": "dropdown" },
            { "required": true, "controlName": "mainApplicant.income", "type": "text", "validationCodes": [{ "code": "MustBeGreater", "value": 1000, "message": "should be greater then 1000" }] }
        ],
        "hidden": false
    },
    {
        "fieldSetName": "section 2",
        "controls": [
            { "required": true, "controlName": "iban", "type": "dropdown" },
            { "required": true, "controlName": "bic", "type": "text", "validationCodes": [{ "code": "MustBeGreater", "value": 1000, "message": "should be greater then 1000" }] }
        ],
        "hidden": false
    },
    {
        "fieldSetName": "section 3",
        "controls": [
            { "required": true, "controlName": "email", "type": "dropdown" },
            { "required": true, "controlName": "zip", "type": "text", "validationCodes": [{ "code": "MustBeGreater", "value": 1000, "message": "should be greater then 1000" }] }
        ],
        "hidden": false
    }]
}

const validators = {
    "mainApplicant.income": (_: IFormControl) => { }
}

describe("setValidator", () => {

    test.each([
        ["mainApplicant.occupationType"],
        ["iban"],
        ["zip"]
    ])("should find control %s", (name) => {
        const control = findControlByName(name, formSettings.controls);
        expect(control).not.toBeUndefined();
    })

    test("should not find control", () => {
        const control = findControlByName("mainApplicant.occupationType789", formSettings.controls);
        expect(control).toBeUndefined();
    })

    test("should map", () => {
        setValidators(formSettings, validators);
    })
})