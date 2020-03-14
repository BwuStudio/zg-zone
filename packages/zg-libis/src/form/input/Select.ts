import Input, { Conf } from "./Input";

type Value = string
type Text = string

type Config = {
    readonly: true
}

export default class Select extends Input<[Value, Text], Config>{

    static gen(s: string, config: Conf<Config>) {
        return new this(s, config)
    }

    static config = {
        readonly: false
    }

    list: { value: string, text: string }[] = []

    constructor(id: string, config: Conf<Config>) {
        super(id, Object.assign({},
            Select.config,
            config))
        this.reflashView()
    }

    private target: HTMLSelectElement = document.createElement('select')

    protected reflashView() {
        if (this.target) try { this.target.remove() } catch (e) { }

        this.target = document.createElement('select')
        this.target.className = 'gb_form'
        this.target.disabled = this.config.readonly
        this.target.onchange = e => {
            const c = this.list.find(v => v.value === this.target.value)
            this.setValue(c ? [c.value, c.text] : null)
        }
        this.container.appendChild(this.target)
    }

    getValue() {
        return this.value || ['', '']
    }

    setOpions(c: { [value: string]: string }) {
        this.list = Object.keys(c).map(value => {
            const text = c[value] || ''
            return { value, text }
        })

        this.target.innerHTML = ''
        this.target.innerHTML = this.list.map(v => `<option value="${v.value}">${v.text}</option>`).join('')

        this.value = this.value
            || (this.list[0]
                ? [this.list[0].value, this.list[0].text]
                : null)

        this.target.value = this.value?.[0] || ''
    }

    setValue(v: [Value, Text] | null) {
        const c = v || ['', '']
        this.value = c
        this.target.value = this.value[0]
    }
}