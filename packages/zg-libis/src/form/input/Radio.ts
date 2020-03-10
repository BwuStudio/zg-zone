import Input, { Conf } from "./Input";


type Value = string
type Text = string


type Config = {
    readonly: boolean
}


export default class Radio extends Input<[Value, Text], Config>{

    static gen(s: string, config: Conf<Config>) {
        return new this(s, config)
    }

    static config = {
        readonly: false
    }

    list: { value: string, text: string }[] = []

    constructor(
        id: string,
        config: Conf<Config>) {

        super(
            id,
            Object.assign(
                {},
                Radio.config,
                config)
        )

        this.uid = Math.floor(Math.random() * 10000).toString()
        this.reflashView()
    }

    private uid: string

    protected reflashView() {
        this.target.forEach(v => { v[0].remove() })
        this.target = this.list.map(v => {
            const r = document.createElement('input')
            const l = document.createElement('label')
            const s = document.createElement('span')

            r.type = 'radio'
            r.name = this.id + this.uid
            r.disabled = this.config.readonly
            r.value = v.value
            s.innerHTML = v.text

            r.checked = r.value === this.value?.[0] ? true : false

            l.appendChild(r)
            l.appendChild(s)

            return [l, r]
        })

        this.target.forEach(([l, r]) => {
            this.container.appendChild(l)

            r.onchange = e => {

                const c = this.list.find((v, i) => this.target[i]?.[1].checked)

                this.setValue(c ? [c.value, c.text] : null)
            }
        })
    }

    private target: [HTMLLabelElement, HTMLInputElement][] = []

    getValue() {
        return this.value || ['', '']
    }

    setOpions(c: { [value: string]: string }) {
        this.list = Object.keys(c).map(value => {
            const text = c[value] || ''
            return { value, text }
        })
        this.reflashView()
    }

    setValue(v: [Value, Text] | null) {
        const c = v || ['', '']
        this.value = c
        this.target.forEach(v => {
            v[1].checked = v[1].value === this.value?.[0] ? true : false
        })
    }
}