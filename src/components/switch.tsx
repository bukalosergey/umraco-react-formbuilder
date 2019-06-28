import React, { SyntheticEvent } from "react";
import ReactSwitch from "react-switch";
import { IFormControl } from "../interfaces/i-form-control";

export class Switch extends React.Component<IFormControl, {}> {

    constructor(props: IFormControl) {
        super(props);
    }

    public render() {
        return <ReactSwitch
            id={this.props.controlName}
            className="form-control switch"
            checked={Boolean(this.props.value)}
            name={this.props.controlName}
            onChange={this.onChangeHandler}
            readOnly={this.props.readonly} />;
    }

    private onChangeHandler = (checked: boolean, event: SyntheticEvent<any, Event>) => {
        (event.target as HTMLInputElement).checked = checked;
        (event.target as HTMLInputElement).type = "checkbox";
        this.props.onControlValueChangeHandler(event, this.props.controlName);
    }
}
