import React from "react";
import { IFieldSetProps } from "../interfaces/i-fieldset-props";

export class FieldSet extends React.Component<IFieldSetProps, {}> {

    public render() {
        return (
            <div className="col-md-12" style={{ display: this.props.hidden ? "none" : "block" }} >
                <div className="row applicant-content">
                    <div className="sectionname">
                        <h5>
                            <span className="numberCircle"/>
                            <span className="text-uppercase">{this.props.legend}</span>
                        </h5>
                    </div>
                    <div className="col-md-12" dangerouslySetInnerHTML={{ __html: this.props.decription }}  />
                    {this.props.children}
                </div>
            </div>
        );
    }
}
