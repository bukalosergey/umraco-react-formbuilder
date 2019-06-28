import React from "react";
import { IFormControl } from "../interfaces/i-form-control";

interface IInputFormState {
    value: any;
    buttonText: string;
    selectedCountry: string;
    countries: Array<Record<string, string>>;
}

export class PhoneNumber extends React.PureComponent<IFormControl, IInputFormState> {

    private _buttonRef = React.createRef<HTMLButtonElement>();

    constructor(props: IFormControl) {
        super(props);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);

        this.state = {
            value: this.props.value,
            selectedCountry: null,
            countries: [],
            buttonText: ""
        };
    }

    public componentDidMount() {

        this.fetchData();
    }

    public updateValue = (value: any) => this.setState({ value });

    public render() {

        const optionMap = (this.state.countries as any || []).map((option: any) => (
            <li key={option.value} role="presentation">
                <a
                    onClick={this.onClickHandler}
                    className="dropdown-item"
                    href="#"
                    data-value={option.value}
                    data-label={option.label}>
                    {option.label}
                </a>
            </li>
        ));

        return (
            <div className="row">
                <div className="col-md-4">
                <div className="dropdown dropdown-extension">
                <button
                    className="dropdown-toggle btn btn-default form-control"
                    type="button"
                    disabled={this.props.readonly}
                    id={this.props.controlName}
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    ref={this._buttonRef} >
                    {this.state.buttonText}
                </button>

                <ul
                    className="dropdown-menu"
                    aria-labelledby={this.props.controlName}>
                    {optionMap}
                </ul>
            </div>
                </div>
                <div className="col-md-8">
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
                </div>
            </div>

        );
    }

    private onBlurHandler(e: React.ChangeEvent<HTMLInputElement>) {

        this.props.onControlValueChangeHandler(e, this.props.controlName);
    }

    private onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        this.setState({ value: e.target.value });
        this.props.onChangeHandler(e, this.props.controlName);
    }

    private onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {

        e.preventDefault();

        const { label, value } = (e.target as HTMLElement).dataset;
        this.setState(
            { buttonText: label, selectedCountry: value },
            () => this.props.onControlValueChangeHandler(null, this.props.controlName, this.state.value)
        );

    }

    private fetchData = async () => {

        const host = process.env.NODE_ENV === "development" && process.env.HOST || '';

        window.console.info(`loading dictionary Countries from remote host ${host}`);

        try {

            const url = `${host}/Umbraco/Api/Dictionaries/Get?key=Countries` +
              (this.props.keys ? `&optionKeys=${this.props.keys}` : "");

            const response = await fetch(url, { method: "GET", mode: "cors"});
            const data = await response.json();

            const countries: Array<Record<string, any>> = Object
                .keys(data && data.values || {})
                .map((key) => ({
                    value: key,
                    label: data.values[key]
                }));

            this.setState({ 
                countries, 
                selectedCountry: countries.length === 1 ? countries[0].value : "",
                buttonText: countries.length === 1 ? countries[0].label : "",
            });

        } catch (error) {

            console.error(error);
        }
    }
}
