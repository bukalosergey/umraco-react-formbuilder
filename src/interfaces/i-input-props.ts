import { IFormControllerProps } from "./I-form-controller-props";

export interface IInputFormProps extends IFormControllerProps {
    type: string;
    onChangeHandler(e: React.ChangeEvent<HTMLInputElement>, controlName: string): void;
}
