import { FormControlContainer, IFormState } from "../interfaces/i-form-state";
import { IFormControl } from "../interfaces/i-form-control";

export function serializeFormToJSON(formState: IFormState) {

    return { 
        ...controlsToPlainObject(formState.controls),
        formMeta: formState.formSettings.formMeta
    };
}

function controlsToPlainObject(controls: FormControlContainer) {

    return Object.keys(controls).reduce(
        (object, key) => {

            const control = controls[key];
            const [ controlName, ...restName ] = control.controlName.split(".").reverse();
            const objectToMap = getObjectToMap(restName, object);
            if (control.controlArray) {

                objectToMap[controlName] = control.controlArray.map(container =>
                    container.reduce(
                        (nestedObject, c) => Object.assign(
                            nestedObject,
                            {
                                [c.controlName.split(".").pop()]: c.value
                            }
                        ),
                        {} as any
                    )
                );

            } else {

 
                objectToMap[controlName] = control.value;
            }

            return object;
        },
        {} as any
    );
}

function getObjectToMap(parentNames: string[], object: any) {

    if (parentNames && parentNames.length) {

        return parentNames.reduce(
            (nestedObject, key) => { 

                if (!nestedObject[key]) {
                    nestedObject[key] = {};
                }

                return nestedObject[key];
            },
            object
        )
    }

    return object;
}