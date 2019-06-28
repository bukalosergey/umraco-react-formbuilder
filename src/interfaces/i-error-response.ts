export interface IErrorResponse {
    errorType: string;
    invalidFields: { controlName: string, code: string }[];
}