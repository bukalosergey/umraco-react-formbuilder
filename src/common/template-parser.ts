export function parseTemplate(template: string, data: any): string {

    const dataDeclaration = Object.keys(data).reduce(
        function name(str, key) {
            return str + `var ${key} = data["${key}"]; `;
        },
        ""
    );

    return template.replace(/{{.+?}}/g, function (param: string) {
        
            const noBracesParam = param.replace(/{{|}}/g, "");
            try {

                return eval(dataDeclaration + noBracesParam);

            } catch(e) {

                return data[noBracesParam] || "";
            }   
        }
    )
}