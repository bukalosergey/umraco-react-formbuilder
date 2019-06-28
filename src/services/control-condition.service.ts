import { IFormControl } from "../interfaces/i-form-control";
import { IConditionItem, IControlConditionRule } from "../interfaces/i-form-control-condition";
import { FormControlContainer } from "../interfaces/i-form-state";

export const ControlConditionService = {

    applyConditions(control: IFormControl): boolean {

        let notChanged = true;
        control.condition.forEach((conditionItem) => {

            const fn = conditionItem.when === "all" ? Array.prototype.every : Array.prototype.some;

            const predicate = fn.call(
                conditionItem.items,
                (rule: IConditionItem) => _processPredicate(control, rule)
            );

            const changed = _processAction(control, conditionItem, predicate);
            notChanged = notChanged && changed;
        });

        return !notChanged;

    },

    getImpactedControls(controls: FormControlContainer): FormControlContainer {

        return Object.keys(controls).reduce(
            (impactedControls, key) => {

                const control = controls[key];

                if (
                    control.condition && control.condition.length && 
                    ControlConditionService.applyConditions(control)
                ) {

                    impactedControls[key] = control;
                }

                return impactedControls;
            },
            {} as FormControlContainer
        );
    }

}

function _processPredicate(control: IFormControl, ruleItem: IConditionItem): boolean {

    if (ruleItem.rule === "equal") {

        return control.controlContainer[ruleItem.field].value === ruleItem.value;

    } else if (ruleItem.rule === "notEqual") {

        return control.controlContainer[ruleItem.field].value !== ruleItem.value;
    }

    return true;
}

function _processAction(control: IFormControl, conditionItem: IControlConditionRule, result: boolean): boolean {

    let changed = false;
    switch (conditionItem.action) {
        case "hide":
            changed = control.visible === result;
            control.visible = !result;
            break;

        case "show":
            changed = control.visible !== result;
            control.visible = result;
            break;

        case "enable":
            changed = control.disabled === result;
            control.disabled = !result;
            break;

        case "disable":
            changed = control.disabled !== result;
            control.disabled = result;
            break;
    }

    return changed;

}