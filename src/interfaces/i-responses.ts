export interface IValidationError {
    errorType: "ValidationError";
    invalidFields: { controlName: string, code: string }[];
}