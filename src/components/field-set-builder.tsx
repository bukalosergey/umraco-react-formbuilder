import React from "react";
import { IFieldSetSettings } from "../interfaces/i-form-settings";
import { FieldSet } from "./fieldset";
import { FormControlFactory } from "./form-control-factory";

export class FieldSetBuilder extends React.Component<IFieldSetSettings, any> {

    public render() {

        const renderFormControl = this.props.controls.map((control) => (
            <FormControlFactory
                key={control.controlName}
                {...control.formControl}
            />
        ));

        return <FieldSet
            legend={this.props.fieldSetName}
            decription={this.props.description}
            hidden={this.props.hidden}>
            {renderFormControl}
        </FieldSet>;
    }
}
