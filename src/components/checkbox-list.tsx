import React from "react";
import { IFormControl } from "../interfaces/i-form-control";

interface ICheckboxListState {
    values: string[];
}

export class CheckboxList extends React.Component<IFormControl, ICheckboxListState> {

    state = {
        values: [] as string[]
    }

    constructor(props: IFormControl) {
        super(props);
    }

    public render() {
        return (this.props.options as string[] || []).map((option) => {

            const [key, label] = option.split(";").map(o => o.trim());

            return <React.Fragment key={option}>
                <input
                    id={`${this.props.controlName}_${option}`}
                    className="form-control"
                    type="checkbox"
                    checked={this.state.values.indexOf(key) > -1}
                    name={`${this.props.controlName}_${option}`}
                    onChange={this.onChangeHandler(key)}
                    readOnly={this.props.readonly}
                />
                <label
                    id={`anc_${this.props.controlName}}_${option}`}
                    htmlFor={`${this.props.controlName}_${option}`}
                    className="cursor-pointer">
                    <span />
                    <div><p>{label || key}</p></div>
                </label>
            </React.Fragment>
        });
    }

    private onChangeHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {

        let values: string[] = this.state.values.indexOf(key) > -1
            ? this.state.values.filter(v => v !== key)
            : this.state.values.concat([key]);

        this.setState(
            { values },
            () => this.props.onControlValueChangeHandler(e, this.props.controlName, values)
        );  
    }
}
