export type ProxySubscriber = (obj: any, prop: string | number | symbol, value: any) => void;

export interface TfBankObservable {
    TF_BANK_OBSERVE_OBJECT: {
        [key: string]: any;
        subscribers: ProxySubscriber[];
        subscribe(fn: ProxySubscriber): void;
        setValue(obj: any, prop: string | number, value: any): void;
    }
}