import { IFormControl } from "./i-form-control";

export type ControlCustomValidation = (control: IFormControl) => void;


// interface IEqualRule {
//     equal: IValidateValue;
// }

// interface INotEqualRule {
//     notEqual: IValidateValue;
// }

// interface IValidateValue {
//     value: string;
// }