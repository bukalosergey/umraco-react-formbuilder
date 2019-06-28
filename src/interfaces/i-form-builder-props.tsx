import { FormSettingsControls, IFormMeta } from "./i-form-settings";
import { IFormState } from "./i-form-state";

export interface IFormBuilderProps {
    controls: FormSettingsControls;
    formName: string;
    formMeta: IFormMeta;
    requiredMessage: string;
    handlers: {
        onFormSubmit(formState: IFormState): void;
        onFormInit?(): void;
    };
    validationSectionTitle?: string;
}
