import React from "react";
import { FormControl } from "./form-control";
import { FormControlFactory } from "./form-control-factory";
import { FormSettingsControls } from "../interfaces/i-form-settings";
import { FieldSetBuilder } from "./field-set-builder";
import { IFormState, FormControlContainer } from "../interfaces/i-form-state";
import { IFormBuilderProps } from "../interfaces/i-form-builder-props";
import { ControlConditionService } from "../services/control-condition.service";
import { ErrorForm } from "./error-form";
import { IFormError } from "../interfaces/i-error-props";
import { IFormControl } from "../interfaces/i-form-control";

export class FormBuilder extends React.Component<IFormBuilderProps, IFormState> {

    constructor(params: IFormBuilderProps) {
        super(params);

        this.initFormState();
    }

    public componentDidMount() {
        this.props.handlers.onFormInit && this.props.handlers.onFormInit.call(this);
    }

    public onClickHandler = () => {

    }

    public onChangeHandler = () => {

    }

    public onControlValueChangeHandler = (e: React.SyntheticEvent, controlName: string, objectValue?: any, otherValues?: any) => {

        let value;

        if (objectValue || !e) {

            value = objectValue;

        } else {

            const target = e.target as HTMLInputElement;
            value = target.type === "checkbox" ? target.checked : target.dataset.value;
        }

        const control = this.getControlByName(controlName);
        control.setValue(value, true);

        const impacted = ControlConditionService.getImpactedControls(control.controlContainer);

        this.setOther(otherValues, control);

        this.setState({
            controls: Object.assign(
                control.controlContainer,
                impacted,
            )
        });
    }

    private getControlByName = (controlName: string) => {

        if (controlName.indexOf(".") > -1) {

            const [parent, index] = controlName.split(".");

            if (this.state.controls[parent] && Array.isArray(this.state.controls[parent].controlArray)) {

                return this.state.controls[parent].controlArray[Number(index)]
                    .find(c => c.controlName === controlName);
            }
        }

        return this.state.controls[controlName];
    }

    private setOther = (otherValues: any, control: IFormControl) => {

        otherValues && Object.keys(otherValues).forEach((key) => {

            const fieldControl = control.controlContainer[key];
            const fieldValue = otherValues[key];
            if (fieldControl) {

                fieldControl.value = fieldValue;
                if (fieldControl.elementRef.current && fieldControl.elementRef.current.updateValue) {
                    fieldControl.elementRef.current.updateValue(fieldValue);
                }
            }
        });
    }

    public onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        await this.validateForm()
        this.state.isValid && await this.props.handlers.onFormSubmit.call(this, this.state);
    }

    public render() {

        const renderEl = this.state.formSettings.controls.map((el, i) => "fieldSetName" in el
            ? <FieldSetBuilder key={el.fieldSetName} {...el} />
            : <FormControlFactory key={el.controlName} {...el.formControl} />
        );

        return (
            <form action="" id="main-form" onSubmit={this.onSubmit}>
                {renderEl}
                {Boolean(this.state.errors && this.state.errors.length) && <ErrorForm
                    validationSectionTitle={this.props.validationSectionTitle}
                    errors={this.state.errors}
                />}
                <input type="submit" className="btn btn-default" value="Submit button" />
            </form >
        );
    }

    private initFormState() {

        const formSettings: IFormBuilderProps = this.props;
        const getFormState = (controls: FormSettingsControls, stateObjTemp: FormControlContainer): FormControlContainer => {

            controls.forEach((el) => {

                if ("fieldSetName" in el) {

                    getFormState(el.controls, stateObjTemp);

                } else {

                    el.formControl = stateObjTemp[el.controlName] = Object.assign(new FormControl(el), {
                        onControlValueChangeHandler: this.onControlValueChangeHandler,
                        controlContainer: stateObjTemp,
                        formSettings
                    });

                    if (!el.onChangeHandler) {
                        el.formControl.onChangeHandler = this.onChangeHandler;
                    } else {
                        el.onChangeHandler = el.onChangeHandler.bind(this)
                    }

                    if (!el.onClickHandler) {
                        el.formControl.onClickHandler = this.onClickHandler;
                    } else {
                        el.formControl.onClickHandler = el.formControl.onClickHandler.bind(this);
                    }

                }
            });

            return stateObjTemp;
        };

        const stateObj: FormControlContainer = getFormState(formSettings.controls, {});

        this.state = {
            controls: stateObj,
            formSettings,
            isValid: false,
        };
    }

    private validateForm(): Promise<never> {

        let formValid = true;
        const errors = [] as IFormError[];
        Object.keys(this.state.controls).forEach((key) => {
            const controller = this.state.controls[key];
            const valid = controller.validate();

            if (!valid) {
                errors.push({
                    controlName: controller.controlName,
                    message: `${controller.label} - ${controller.validationMessage}`
                });
            }

            formValid = formValid && valid;
        });

        return new Promise((resolve) => {

            this.setState(
                (state) => ({
                    controls: state.controls,
                    isValid: formValid,
                    errors
                }),
                resolve
            );
        });
    }
}
