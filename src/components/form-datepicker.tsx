import React from "react";
import { IFormControl } from "../interfaces/i-form-control";
import DatePickerDefault from "react-date-picker";

interface IDatePickerState {
    date: Date;
}

export class DatePicker extends React.Component<IFormControl, IDatePickerState> {

    state = {
        date: new Date()
    }

    minDate = getDateFromProps(this.props.minDate);
    maxDate = getDateFromProps(this.props.maxDate);

    private onChange = (date: Date) => this.setState(
        { date }, 
        () => this.props.onControlValueChangeHandler(null, this.props.controlName, this.state.date)
    )

     

    render() {
        
        return (
            <div>
                <DatePickerDefault
                    disabled={this.props.readonly}
                    maxDate={this.maxDate}
                    minDate={this.minDate}
                    onChange={this.onChange}
                    value={this.state.date} />
            </div>
        );
    }
}

function getDateFromProps(date: string) {

    if (!date) {

        return undefined;
    }

    if (date === "today") {

        return new Date();
    }

    return new Date(date);
}