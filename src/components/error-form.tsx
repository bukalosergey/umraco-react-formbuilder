import React from "react";
import { IErrorProps } from "../interfaces/i-error-props";

export function ErrorForm(params: IErrorProps) {

    return <div className="row">
        <div className="col-md-8">
            <div className="section error-section line-seperated" style={{ display: "block" }}>
                <div className="row">
                    <div className="col-md-10">
                        <div className="sectionname">
                            <h5><strong>{params.validationSectionTitle}</strong></h5>
                        </div>
                        <div className="field error-fields-list-container">
                            <ul className="error-fields-list">
                                {params.errors.map((error) =>
                                    <li>
                                        <a href={`#${error.controlName}`}>
                                            {error.message}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}