import { IFormControllerProps } from "./I-form-controller-props";

export interface IDropDownProps extends IFormControllerProps {
    buttonName?: string;
    controlName: string;
    options: Array<{ key: number, value: string }>;
    onClickHandler(e: React.MouseEvent<HTMLAnchorElement>, controlName: string): void;
}
