import * as Input from './input'

class FormVM<T>{
    private c: { [P in keyof T]: Input.Input<T[P]> }

    constructor(c: { [P in keyof T]: Input.Input<T[P]> }) {
        this.c = c
    }



    getData() {
        return (
            Object.keys(this.c)
                .map(key => ({
                    key,
                    value: (this.c as any)[key].getValue()
                }))
                .reduce<any>((res, { key, value }) => {
                    res[key] = value
                    return res
                }, {})
        )
    }

    setData(v: { [P in keyof T]: T[P] }) {
        Object.keys(this.c).map((key: string) => {
            const k = key as keyof T
            this.c[k].setValue(v[k])
        })
    }
}

function Form<T>(
    v: { [P in keyof T]: (id: string, container: HTMLElement) => Input.Input<T[P]> },
    ele: HTMLElement = document.body) {

    const c = Object.keys(v).reduce<any>((res, key) => {
        
        res[key] = (v as any)[key](
            key,
            ele.querySelector(`[data-name-${key}]`)
        )

        return res
    }, {}) as { [P in keyof T]: Input.Input<T[P]> }

    return Object.assign(new FormVM(c), c)
}

export default Object.assign(Form,
    Object.keys(Input).reduce((res: { [key: string]: (config?: {}) => (id: string, container: HTMLElement) => any }, key) => {

        res[key] = (config?: {}) =>
            (id: string, container: HTMLElement) =>
                (Input as any)[key].gen(
                    id,
                    Object.assign({ container }, config || {})
                )

        return res

    }, {})
)