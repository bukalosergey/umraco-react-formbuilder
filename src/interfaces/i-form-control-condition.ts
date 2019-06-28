export interface IControlConditionRule {
    when: "all" | "any";
    action:  "hide" | "show" | "enable" | "disable";
    items: IConditionItem[];
}

export interface IConditionItem {
    field: string,
    rule: "equal" | "notEqual",
    value: string
}