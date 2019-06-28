import { ProxySubscriber, TfBankObservable } from "../types/observer-types";
import { FormControl } from "../components/form-control";

const context = window as Window & TfBankObservable;

if (!context.TF_BANK_OBSERVE_OBJECT) {
    context.TF_BANK_OBSERVE_OBJECT = {
        subscribers: [],
        subscribe(fn: ProxySubscriber) {
            context.TF_BANK_OBSERVE_OBJECT.subscribers.push(fn);
        },
        setValue(obj: any, prop: string | number, value: any) {
            context.TF_BANK_OBSERVE_OBJECT[prop] = value;
            context.TF_BANK_OBSERVE_OBJECT.subscribers.forEach((fn: ProxySubscriber) =>
                fn(obj, prop, value)
            )
        }
    }
}

export function getCalculatorOptions(calculator: any) {

    return Object.keys(calculator).reduce(
        (obj, key) => Object.assign(obj, {
            [key]: new FormControl({
                controlName: key,
                defaultValue: calculator[key],
                type: "hidden"
            })
        }),
        {} as any
    )
}