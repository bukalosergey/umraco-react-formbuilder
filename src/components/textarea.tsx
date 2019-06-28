import React, { RefObject } from "react";
import { IFormControl } from "../interfaces/i-form-control";

interface IInputFormState {
    value: any
}

export class Textarea extends React.PureComponent<IFormControl, IInputFormState> {

    constructor(props: IFormControl) {
        super(props);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);

        this.state = { 
            value: this.props.value
        };
    }

    public updateValue = (value: any) => this.setState({ value });

    public render() {
        return (
            <textarea
                className="form-control"
                id={this.props.controlName}
                onBlur={this.onBlurHandler}
                onChange={this.onChangeHandler}
                value={this.state.value}
                data-value={this.state.value}
                name={this.props.controlName}
                readOnly={this.props.readonly}
                disabled={this.props.disabled} />
        );
    }

    private onBlurHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {

        this.props.onControlValueChangeHandler(e, this.props.controlName);
    }

    private onChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {

        this.setState({ value: e.target.value });
        this.props.onChangeHandler(e, this.props.controlName);
    }
}
