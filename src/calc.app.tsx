import React from "react";
import { render } from "react-dom";
import { ICalculatorProps } from "./interfaces/i-calculator-props";
import { TfBankObservable } from "./types/observer-types";
import "./common/tfbank-observer";

import(/* webpackChunkName: "calс.app" */ "./components/calculator").then(({ Calculator }) => {

    const el = document.getElementById("calculator");
    let json;

    if (process.env.NODE_ENV === "production") {

        json = JSON.parse(el.dataset.json) as ICalculatorProps;

    } else {

        json = require('../test-data/test-calculator.json') as ICalculatorProps;
    }

    const context = window as Window & TfBankObservable;
    // the global proxy object to communicate between components
    // context.TF_BANK_OBSERVE_OBJECT.subscribe((obj: any, prop: string, value: any) => {
    //     console.warn(obj, prop, value, "Calculator");
    // });
    json.onCalculatorChanged = function onCalculatorChanged() {

        context.TF_BANK_OBSERVE_OBJECT.setValue(this, "calculator", {
            repaymentPeriod: this.state.repaymentTime,
            amount: this.state.loanAmount
        });
    };

    el && render(
        <Calculator {...json} />,
        el
    );
});
