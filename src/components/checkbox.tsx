import React from "react";
import { IFormControl } from "../interfaces/i-form-control";

export class Checkbox extends React.Component<IFormControl, {}> {

    constructor(props: IFormControl) {
        super(props);
    }

    public render() {
        return (
            <React.Fragment>
                <input
                    id={this.props.controlName}
                    ref={this.props.elementRef}
                    className="form-control"
                    type="checkbox"
                    checked={Boolean(this.props.value)}
                    name={this.props.controlName}
                    onChange={this.onChangeHandler}
                    readOnly={this.props.readonly}
                />
                <label
                    id={`anc_${this.props.controlName}`}
                    htmlFor={this.props.controlName}
                    className="cursor-pointer">
                    <span />
                    <div><p>{this.props.label}</p></div>
                </label>
            </React.Fragment>

        );
    }

    private onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onControlValueChangeHandler(e, this.props.controlName);
    }
}
