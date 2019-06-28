import React, { RefObject } from "react";
import { IFormControl } from "../interfaces/i-form-control";

interface IInputFormState {
    value: any
}

export class InputForm extends React.PureComponent<IFormControl, IInputFormState> {

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
            <input
                className="form-control"
                id={this.props.controlName}
                onBlur={this.onBlurHandler}
                onChange={this.onChangeHandler}
                value={this.state.value}
                data-value={this.state.value}
                type={this.props.type}
                name={this.props.controlName}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
                readOnly={this.props.readonly}
            />
        );
    }

    private onBlurHandler(e: React.ChangeEvent<HTMLInputElement>) {

        this.props.onControlValueChangeHandler(e, this.props.controlName);
    }

    private onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        this.setState({ value: e.target.value });
        this.props.onChangeHandler(e, this.props.controlName);
    }

    // static getDerivedStateFromProps(props: IFormControl, state: any) {

    //     if (props.value !== state.value) {
    //         return {
    //             value: props.value
    //         };
    //     }
    //     return null;
    // }

}
