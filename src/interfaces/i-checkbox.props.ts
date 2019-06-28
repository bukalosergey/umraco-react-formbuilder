import { IFormControllerProps } from "./I-form-controller-props";

export interface ICheckboxProps extends IFormControllerProps {
    onClickHandler(e: React.ChangeEvent<HTMLInputElement>, controlName: string): void;
}
