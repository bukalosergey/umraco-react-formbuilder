import React, { RefObject } from "react";
import { IFormControl } from "../interfaces/i-form-control";
import { IDropDownState } from "../interfaces/i-dropdown-state";

export class DropDown extends React.Component<IFormControl, IDropDownState> {

    constructor(params: IFormControl) {
        super(params);

        this.state = {
            selected: [],
            options: [],
            buttonText: ""
        };
    }

    public _buttonRef = React.createRef<HTMLButtonElement>();

    public render() {

        const optionMap = (this.state.options as any || []).map((option: any) => (
            <li key={option.value} role="presentation">
                <a
                    onClick={this.onClickHandler}
                    className={this.getOptionClass(option)}
                    href="#"
                    data-value={option.value}
                    data-label={option.label}>
                    {option.label}
                </a>
            </li>
        ));

        return (
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
        );
    }

    private getOptionClass = (option: Record<string, any>) =>
        this.props.multiple && this.state.selected.indexOf(option.value) > -1
            ? "dropdown-item ticked"
            : "dropdown-item";

    private setRangeOptions = (numberRangeSettings: string) => {

        const [range, step = 1] = numberRangeSettings.split(",").map(s => s.trim());
        const [from = 0, to = 0] = range && range.split("-").map(s => Number(s.trim()));

        const options = []
        for (let index = from; index <= to; index += Number(step)) {
            options.push({ value: index, label: index });
        }

        this.setState({ options });
    }

    public componentDidMount() {

        if (this.props.dictionary) {

            if (this.props.dictionary === "Range" && this.props.numberRangeSettings) {
                return this.setRangeOptions(this.props.numberRangeSettings);
            }

            this.fetchData();
        }
    }

    private fetchData = async () => {

        const host = process.env.NODE_ENV === "development" && process.env.HOST || '';

        window.console.info(`loading dictionary ${this.props.dictionary} from remote host ${host}`);

        try {

            const url = `${host}/Umbraco/Api/Dictionaries/Get?key=${this.props.dictionary}` +
              (this.props.keys ? `&optionKeys=${this.props.keys}` : "");

            const response = await fetch(url, { method: "GET", mode: "cors"});
            const data = await response.json();

            const options: Array<Record<string, any>> = Object
                .keys(data && data.values || {})
                .map((key) => ({
                    value: key,
                    label: data.values[key]
                }));

            let buttonText: string = "";

            if (this.props.value && options) {
                const defaultValue = options.find((option) => option.value === this.props.value);
                buttonText = defaultValue && defaultValue.value || "";
            }

            this.setState({ options, buttonText });

        } catch (error) {

            console.error(error);
        }
    }

    private onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {

        e.preventDefault();

        if (this.props.multiple) {

            e.stopPropagation();
            return this.doMultipleSelect(e);
        }

        const { label, value } = (e.target as HTMLElement).dataset;
        this.setState(
            { buttonText: label },
            () => this.props.onControlValueChangeHandler(e, this.props.controlName, value)
        );

    }

    private doMultipleSelect = (e: React.MouseEvent) => {

        const { value, label } = (e.target as HTMLElement).dataset;
        let selected: string[];
        let buttonText: string;

        if (this.state.selected.indexOf(value) > -1) {

            selected = this.state.selected.filter(item => item !== value);
            buttonText = this.state.buttonText.split(", ")
                .filter((item: string) => item !== label)
                .join(", ");

        } else {

            selected = this.state.selected.concat([value]);
            buttonText += (selected.length > 1 ? ", " : "") + label;
        }

        this.setState(
            { selected, buttonText },
            () => {
                this._buttonRef.current.click();
                this.props.onControlValueChangeHandler(e, this.props.controlName, this.state.selected.join("|"));
            }
        );
    }

}
