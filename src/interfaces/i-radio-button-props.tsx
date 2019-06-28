import { IFormControllerProps } from "./I-form-controller-props";

export interface IRadioButtonProps extends IFormControllerProps {
    options: string[];
    onClickHandler(e: React.MouseEvent<HTMLInputElement>, controlName: string): void;
}
