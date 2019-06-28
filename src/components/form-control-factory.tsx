import React from "react";
import { Checkbox } from "./checkbox";
import { DropDown } from "./dropdown";
import { FormControlWrapper } from "./form-control-wrapper";
import { IFormControl } from "../interfaces/i-form-control";
import { InputTypes } from "../types/input-types";
import { InputForm } from "./form-input";
import { RadioButtons } from "./radio-buttons";
import { DocumentUpload } from "./document-upload";
import { InputWithOptions } from "./input-with-options";
import { IterableComponent } from "./iterable-component";
import { DatePicker } from "./form-datepicker";
import { Textarea } from "./textarea";
import { CheckboxList } from "./checkbox-list";
import { PhoneNumber } from "./phone-number";
import { Switch } from "./switch";

export class FormControlFactory extends React.Component<IFormControl, any> {

    public render() {

        const Fn = this.getFormControl(this.props);
        // prevent wrapping for iterableComponent
        if (this.props.type === "iterableComponent") {
            return <IterableComponent {...this.props} />
        }

        return (
            <FormControlWrapper {...this.props}>
                {Fn}
            </FormControlWrapper>
        );
    }

    private getFormControl(props: IFormControl): JSX.Element {
        const obj: { [key in InputTypes]: (controlProps: IFormControl) => JSX.Element } = {

            dropdown(controlProps: IFormControl) {
                return <DropDown {...controlProps} ref={controlProps.elementRef} />;
            },

            radio(controlProps: IFormControl) {
                return <RadioButtons {...controlProps} ref={controlProps.elementRef} />;
            },

            checkbox(controlProps: IFormControl) {
                return <Checkbox {...controlProps} ref={controlProps.elementRef} />;
            },

            text(controlProps: IFormControl) {
                return <InputForm {...controlProps} ref={controlProps.elementRef} />;
            },

            tel(controlProps: IFormControl) {
                return <InputForm {...controlProps} ref={controlProps.elementRef} />;
            },

            email(controlProps: IFormControl) {
                return <InputForm {...controlProps} ref={controlProps.elementRef} />;
            },

            number(controlProps: IFormControl) {
                return <InputForm {...controlProps} ref={controlProps.elementRef} />;
            },

            datePicker(controlProps: IFormControl) {
                return <DatePicker {...controlProps} ref={controlProps.elementRef} />;
            },

            hidden(controlProps: IFormControl) {
                return <InputForm {...controlProps} ref={controlProps.elementRef} />;
            },

            inputWithOptions(controlProps: IFormControl) {
                return <InputWithOptions {...controlProps} ref={controlProps.elementRef} />
            },

            documentUpload(controlProps: IFormControl) {
                return <DocumentUpload {...controlProps} ref={controlProps.elementRef} />;
            },

            iterableComponent(controlProps: IFormControl) {
                return <IterableComponent {...controlProps} ref={controlProps.elementRef} />;
            },

            textarea(controlProps: IFormControl) {
                return <Textarea {...controlProps} ref={controlProps.elementRef} />;
            },

            checkboxList(controlProps: IFormControl) {
                return <CheckboxList {...controlProps} ref={controlProps.elementRef} />;
            },

            phoneNumber(controlProps: IFormControl) {
                return <PhoneNumber {...controlProps} ref={controlProps.elementRef} />;
            },

            switch(controlProps: IFormControl) {
                return <Switch {...controlProps} ref={controlProps.elementRef} />;
            }
        };

        return obj[props.type](props);
    }
}
