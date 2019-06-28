import { IFormControlSettings } from "./i-form-control-settings";


export interface IFormMeta {
    pageId: number;
    product: string;
    market: string;
    [key: string]: any;
}

export interface IFieldSetSettings {
    controls: Array<IFormControlSettings<any>>;
    fieldSetName: string;
    description?: string;
    hidden?: boolean;
}

export interface IFormSettings {
    formName: string;
    controls: FormSettingsControls;
    formMeta: IFormMeta;  
    requiredMessage: string;
}

export type FormSettingsControls = Array<IFormControlSettings<any> | IFieldSetSettings>;
