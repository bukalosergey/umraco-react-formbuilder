import React from "react";
import { IFormControl } from "../interfaces/i-form-control";

export class RadioButtons extends React.Component<IFormControl, {}> {

    constructor(props: IFormControl) {
        super(props);
    }

    public render() {

        return (this.props.options as string[]).map((option, i) => {

            const [value, label] = option.split(";").map(el => el.trim());
            return (
                <React.Fragment key={i}>
                    <input
                        type="radio"
                        className="autovalidate suppress"
                        checked={this.props.value === value}
                        value={value}
                        id={`rbn_${this.props.controlName}_${value}`}
                        name={`rbn_${this.props.controlName}_${value}`}
                        data-value={value}
                        onChange={this.onChangeHandler}
                        readOnly={this.props.readonly}
                    />
                    <label
                        htmlFor={`rbn_${this.props.controlName}_${value}`}
                        className="control-label"
                    >
                        <span />
                        <div>{label || value}</div>
                    </label>
                </React.Fragment>
            )
        });
    }

    private onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onControlValueChangeHandler(e, this.props.controlName);
    }
}
