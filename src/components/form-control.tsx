import { IFormControl } from "../interfaces/i-form-control";
import { InputTypes } from "../types/input-types";
import { IFormControlSettings } from "../interfaces/i-form-control-settings";
import { FormControlContainer } from "../interfaces/i-form-state";
import { IControlConditionRule } from "../interfaces/i-form-control-condition";
import { ControlCustomValidation } from "../interfaces/i-control-validation-rule";
import { RefObject, createRef } from "react";
import { IValidationCode } from "../interfaces/i-validation-code";
import { IFormSettings } from "../interfaces/i-form-settings";
import { validationCodes } from "../common/constants";
import { executeUiValidation } from "../validation/ui-validation-factory";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export class FormControl implements IFormControl {
    placeholder?: string;
    dictionary?: string;

    public controlName: string;
    public type: InputTypes = "text";
    public required: boolean = false;
    public value: any = "";
    public isValid: boolean = true;
    public validationMessage?: string = null;
    public label: string = "";
    public controlContainer: FormControlContainer;
    public formSettings: IFormSettings;

    public elementRef: RefObject<any> = createRef();
    public dropdown?: string;
    public options?: string[] | Array<Record<string, any>>;
    public customValidation?: ControlCustomValidation;
    public condition?: IControlConditionRule[];
    public visible?: boolean;
    public disabled?: boolean;
    public controls?: IFormControlSettings<any>[];
    public controlArray?: Array<IFormControl[]>;
    public validations?: IValidationCode[];

    constructor(obj: IFormControlSettings<any>) {
        Object.assign(this, obj);
        this.value = obj.defaultValue || "";

        if (obj.controls) {
            this.addControls = this.addControls.bind(this);
            this.removeControl = this.removeControl.bind(this);
        }
    }

    public onClickHandler?<T>(e: React.MouseEvent<T>, controlName: string, objectValue?: any): void;

    public onChangeHandler?(e: React.ChangeEvent<HTMLInputElement>, controlName: string, objectValue?: any): void;

    public onControlValueChangeHandler?(e: React.SyntheticEvent<Element>, controlName: string, objectValue?: any): void;

    public addControls(count = 1) {

        let array = this.controlArray || [];

        for (let i = 0; i < count; i++) {

            array.push(this.controls.map((settings) => {

                const control = new FormControl(settings);

                Object.assign(control, {
                    onControlValueChangeHandler: this.onControlValueChangeHandler,
                    controlContainer: this.controlContainer,
                    onChangeHandler: this.onChangeHandler,
                    onClickHandler: this.onClickHandler
                });

                control.controlName = `${this.controlName}.${array.length}.${control.controlName}`;
                return control;
            }));
        }

        this.controlArray = array;

        this.onControlValueChangeHandler(null, this.controlName, []);
    }

    public removeControl(index: number) {

        this.controlArray = this.controlArray.filter((_, i) => index !== i);
        this.onControlValueChangeHandler(null, this.controlName, []);
    }

    public validate(): boolean {

        this.isValid = true;
        this.validationMessage = "";

        if (this.required && !this.value) {

            this.isValid = false;
            const code = Array.isArray(this.validations) && 
                this.validations.find(c => c.code === validationCodes.required);
            
            this.validationMessage = code 
                ? code.message
                : this.formSettings.requiredMessage || validationCodes.required;

        }

        if (this.isValid && this.type === "phoneNumber") {
            this.validatePhoneNumber(this.value);
        }
        
        if (this.isValid && this.customValidation) {

            this.customValidation(this);

        }

        executeUiValidation(this);

        return this.isValid;
    }

    public setValue(value: any, validate: boolean = true) {
        this.value = value;

        if (validate) {
            this.validate();
        }
    }

    public validatePhoneNumber(value: string) {

        const phone = parsePhoneNumberFromString(value);

        this.isValid = phone && phone.isValid();

        if (this.isValid && phone.country !== this.elementRef.current.state.selectedCountry) {
            
            this.isValid = false;
            const validator = this.validations && this.validations.find(v => v.code === validationCodes.mustMatch);
            this.validationMessage = validator ? validator.message : validationCodes.mustMatch;

        } else if (!this.isValid) {

            const validator = this.validations && this.validations.find(v => v.code === validationCodes.invalid);
            this.validationMessage = validator ? validator.message : validationCodes.invalid;
        }   
    }
}
