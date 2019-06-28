import React, { RefObject } from "react";
import { IFormControl } from "../interfaces/i-form-control";

interface IMapItem {
    key: string;
    toKey: string;
}

interface IInputFormState {
    value: any;
    pendingPromise: Promise<any>;
    options: Record<string, any>,
    ref: RefObject<HTMLButtonElement>,
    inputRef: RefObject<HTMLInputElement>,
    mapper: IMapItem[],
    keyToDisplay: string;
}
export class InputWithOptions extends React.PureComponent<IFormControl, IInputFormState> {

    constructor(props: IFormControl) {
        super(props);

        let keyToDisplay = "";
        const mapper = (this.props.mapper || []).map(str => {
            const values = str.split("=>");

            const item = {
                key: String(values[0]).trim(),
                toKey: String(values[1]).trim()
            };

            if (item.toKey === this.props.controlName) {
                keyToDisplay = item.key;
            }

            return item;
        });

        this.state = {
            value: this.props.value,
            pendingPromise: null,
            options: [],
            ref: React.createRef(),
            inputRef: React.createRef(),
            mapper,
            keyToDisplay
        }
    }

    public onClickHandler = (option: any) => (e: React.MouseEvent) => {

        e.preventDefault();

        const valueObject = this.state.mapper.reduce(

            (obj, mapItem: IMapItem) => {

                if (option[mapItem.key]) {
                    obj[mapItem.toKey] = option[mapItem.key];
                }

                return obj;
            },
            {} as any
        );

        const displayValue = valueObject[this.props.controlName];
        if (displayValue) {

            this.setState(
                { value: displayValue },
                () => this.props.onControlValueChangeHandler(
                    e, 
                    this.props.controlName, 
                    displayValue,
                    valueObject
                )
            );    
        }
        
        console.warn(valueObject, "onClickHandler");
    }

    public render() {

        const options = <ul className="dropdown-menu" aria-labelledby={this.props.controlName}>
            {(this.state.options as Record<string, any>[]).map((option, i) =>
                <li key={i} role="presentation">
                    <a
                        href="#"
                        className="dropdown-item"
                        onClick={this.onClickHandler(option)}>
                        {option[this.state.keyToDisplay]}
                    </a>
                </li>
            )}
        </ul>;

        return (
            <>

                <div className="dropdown dropdown-extension">
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
                        ref={this.state.inputRef}
                    />
                    <button
                        className="dropdown-toggle btn btn-default form-control"
                        type="button"
                        style={{ height: 0, border: 0, padding: 0 }}
                        ref={this.state.ref}
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-toggle="dropdown">

                    </button>
                    {options}
                </div>

            </>
        );
    }

    private onBlurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        console.warn(this.state.value)
        this.props.onControlValueChangeHandler(e, this.props.controlName);
    }

    private onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        this.setState({ value });

        if (!value || value.length < 4) {
            return;
        }

        const pendingPromise = fetch(`/Umbraco/Api/AutoCompleteService/Get?search=${value}`)
            .then(response => response.json())
            .then(options => {

                if (pendingPromise !== this.state.pendingPromise) {
                    return;
                }

                this.setState(
                    { options },
                    () => {
                        const selectionStart = this.state.inputRef.current.selectionStart;
                        this.state.ref.current.click();
                        this.state.inputRef.current.focus();
                        this.state.inputRef.current.selectionStart = selectionStart;
                    }
                );
            })
            .catch(() => {
                this.setState({ options: [] })
            });

        this.setState({ pendingPromise });
    }
}
