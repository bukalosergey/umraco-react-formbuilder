import React from "react";
import { render } from "react-dom";
import { IFormSettings } from "./interfaces/i-form-settings";
import { IFormBuilderProps } from "./interfaces/i-form-builder-props";
import { addEmerchantFormProps, addDevEmerchantFormProps } from "./logic/emerchant-form-logic";
import "./common/tfbank-observer";
import { selectors } from "./common/constants";

import(/* webpackChunkName: "form-builder" */ "./components/form-builder").then(({ FormBuilder }) => {

    const el = document.querySelector(selectors.emerchantForm).children[0] as HTMLElement;
    let json: IFormSettings;

    if (process.env.NODE_ENV === "production") {

        json = JSON.parse(el.dataset.json) as IFormSettings;

    } else {
        // to see all styles in dev mode
        require("bootstrap");
        json = require('../test-data/test-form.json') as IFormSettings;
        json = addDevEmerchantFormProps(json);
    }

    const props: IFormBuilderProps = addEmerchantFormProps(json);

    el && render(
        <FormBuilder {...props} />,
        el,
    );
});
