type InjRule = { [key: string]: Partial<CSSStyleDeclaration> }
const fieldParse = (input: string) => input.split('')
    .map(v => v.toLocaleLowerCase() === v ? v : ('-' + v.toLocaleLowerCase()))
    .join('')
    .replace('css-', '')
const selectorParse = (input: string) => input.split('')
    .filter(v=>v!=='$')
    .join('')

const renderRule = (cntr: string, a: InjRule) => Object.keys(a).map(selector => `
    .${cntr}${selector[0] === '$' ? '' : ' '}${selectorParse(selector)} {
        ${Object.keys(a[selector]).map(field => `${fieldParse(field)}:${a[selector][field as any]}`).join(';\n        ')}
    }
    
`)
class InjCss {
    static rules: InjCss[] = []
    static node = document.createElement('style')

    static inject = () => {
        InjCss.node.innerHTML = InjCss.rules.flatMap(
            v => renderRule(v.cntr, v.rules)
        ).join('')
        document.head.appendChild(InjCss.node)
    }
    static gen(
        containeCls: string,
        rules: InjRule
    ) {
        const c = new InjCss()
        c.cntr = containeCls
        c.rules = rules

        InjCss.rules.push(c)
        InjCss.inject()
    }

    private cntr: string = ''
    private rules: InjRule = {}
}
export {
    InjCss
}