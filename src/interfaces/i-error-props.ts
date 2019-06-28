export interface IFormError {
    controlName: string;
    message: string;
}

export interface IErrorProps {
    validationSectionTitle: string;
    errors: IFormError[];
}