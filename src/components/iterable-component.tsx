import React, { Component } from "react";
import { FormControlFactory } from "./form-control-factory";
import { IIterableComponentState } from "../interfaces/i-repeatable-block-state";
import { IFormControl } from "../interfaces/i-form-control";

export class IterableComponent extends Component<IFormControl, IIterableComponentState> {

    state = {
        count: 1
    }

    componentWillMount() {

        // set minimum amount of itmes. 1 by default
        this.props.addControls(this.props.minItems);
    }

    removeControl = (index: number) => (e: React.MouseEvent<any>) => {

        e.stopPropagation();
        e.preventDefault();
        this.props.removeControl(index);
    }

    onAddBlock = () => this.props.controlArray.length < this.props.maxItems && this.props.addControls();

    render() {

        return (
            <>
                {(this.props.controlArray || []).map((controls, i) =>
                    <React.Fragment key={`${i}_of_${controls.length}`}>
                        {controls.map((control) => (
                            <FormControlFactory
                                key={control.controlName}
                                {...control} />
                        ))}

                        <div style={{ width: "100%", display: "block" }}>
                            <hr style={{ width: "90%", float: "right" }} />
                        </div>

                        {i >= this.props.minItems &&
                            <div style={{ position: "relative" }}>
                                <a href="/">
                                    <i
                                        onClick={this.removeControl(i)}
                                        className="glyphicon glyphicon-trash"
                                        style={{ position: "absolute", right: 0 }}>
                                    </i>
                                </a>
                            </div>
                        }
                    </React.Fragment>
                )}
                <button
                    disabled={this.props.controlArray && this.props.controlArray.length >= this.props.maxItems}
                    type="button"
                    onClick={this.onAddBlock}
                    className="repeat-block">
                    Add
                </button>
            </>
        )
    }
}