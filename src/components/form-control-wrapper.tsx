import React from "react";
import { IFormControl } from "../interfaces/i-form-control";

export class FormControlWrapper extends React.Component<IFormControl, {}> {

    state = {
        classNames: [
            "field",
            "has-feedback",
            "form-group",
            this.props.isValid ? "valid" : "has-error"
        ]
    };

    private checkEmptyClass(value: string, classNames: string[]) {

        let isEmptyClassExits = false;

        if (value === "") {

            classNames.forEach(className => {
                if (className === "is-empty") {
                    isEmptyClassExits = true;
                }
            });

            if (!isEmptyClassExits) {
                classNames.push("is-empty");
            }

        } else {

            classNames = classNames.filter(className => className !== "is-empty");
        }

        return classNames;
    }

    componentWillMount() {

        let classNames = this.state.classNames;

        if (this.props.type === "radio") {

            classNames.push("radio-label");
            return;
        } 
        
        if (["dropdown", "switch", "checkboxList", "datePicker", "phoneNumber"].indexOf(this.props.type) > -1) {

            classNames.push("label-fixed");

        } else {

            classNames.push("label-floating");
            classNames = this.checkEmptyClass(this.props.value, classNames);
        }

        this.setState({ classNames });
    }

    private onClick = () => {

        if (this.props.type != "radio") {

            const classNames = this.state.classNames;
            let isFocusedClassExist = false;
            classNames.forEach(className => {

                if (className === "is-focused") {
                    isFocusedClassExist = true;
                }
            });

            if (!isFocusedClassExist) {
                classNames.push("is-focused");
                this.setState({ classNames });
            }
        }
    };

    private onBlur = (e: React.FocusEvent<HTMLInputElement>) => {

        if (this.props.type != "radio") {

            const classNames = this.state.classNames;

            let newClasses: string[] = classNames.filter(className => className !== "is-focused");

            if (this.props.type != "dropdown") {
                newClasses = this.checkEmptyClass(e.target.value, newClasses);
            }

            this.setState({ classNames: newClasses });
        }
    };

    public render() {

        const classNamesArr = [...this.state.classNames];

        if (!this.props.isValid) {
            classNamesArr.push("has-error");
        }

        const classNames = classNamesArr.join(" ");

        const validSpan = !this.props.isValid &&
            <span error-for="firstname" className="error">
                {this.props.validationMessage}
            </span>;

        const label = ["checkbox", "documentUpload"].indexOf(this.props.type) === -1 &&
            <label
                className="control-label"
                id={"anc_" + this.props.controlName}
                htmlFor={this.props.controlName} >
                {this.props.label}
                {this.props.required && <span className="required"> *</span>}
            </label>;

        const description = this.props.description &&
            <span className="help-block">
                {this.props.description}
            </span>;

        return (
            (!("visible" in this.props) || this.props.visible) &&
            <div className={this.props.fullSize ? "form-box-wide" : "form-box"}>
                <div
                    className={classNames} >
                    {(this.props.type === "radio" || this.props.type === "switch") && label}
                    <div className="value">
                        <div
                            className="inputbox"
                            onClick={this.onClick}
                            onBlur={this.onBlur} >
                            {this.props.children}
                            {validSpan}
                        </div>
                        {description}
                    </div>
                    {(this.props.type !== "radio" && this.props.type !== "switch") && label}
                </div>
            </div>
        );
    }
}
