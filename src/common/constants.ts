export const components = {
    calculator: "calculator",
    form: "form"
}

export const errorType = {
    validation: "ValidationError",
    internalServerError: "internal_server_error"
}

export const responseMessageType = {
    approvedToExistingCustomer: "approvedToExistingCustomer",
    approvedToNewCustomer: "ApprovedToNewCustomer",
    internalServerError: "InternalServerError"
}

export const signatureSigneeType = {
    mainApplicant: "MainApplicant",
    coApplicant: "CoApplicant",
    all: "All"
}

export const selectors = {
    calculator: "#calculator",
    signingContainer: "#signing-container",
    loanForm: "[umbraco-form='loan-form']",
    contactFrom: "[umbraco-form='contact-form']",
    depositForm: "[umbraco-form='deposit-form']",
    creditCardForm: "[umbraco-form='creditcard-form']",
    emerchantForm: "[umbraco-form='emerchant-form']",
    refinancingForm: "[umbraco-form='refinancing-form']",
    agreementForm: "[umbraco-form='agreement-form']",
    responseContainer: "#response-container",
    allSigninigTargets: "#signing-container > div > span",
    mainApplicant: "#signing-container > div.MainApplicant > span",
    coApplicant: "#signing-container > div.CoApplicant > span",
    signingResponse: ".signing-response-container"
}

export const metaDataFormFields = ["pageId", "channel", "externalPartner", "product", "market"];

export const validationCodes = {
    invalid: "Invalid",
    required: "Required",
    mustMatch: "MustMatch",
    mustNotMatch: "MustNotMatch",
    mustMatchPattern: "MustMatchPattern",
    mustBeGreater: "MustBeGreater",
    mustBeLess: "MustBeLess"
};

export const markets = {
    global: "Global",
    sweden: "Sweden",
    norway: "Norway",
    finland: "Finland",
    poland: "Poland",
    estonia: "Estonia",
    latvia: "Latvia",
    germany: "Germany",
    austria: "Austria",
    lithuania: "Lithuania"
}