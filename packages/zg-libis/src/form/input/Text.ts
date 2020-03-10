import Input, { Conf } from "./Input";

type Config = {
    readonly: boolean
}

export default class Text extends Input<string, Config>{

    static config = {
        readonly: false
    }

    static gen(s: string, config: Conf<Config>) {
        return new this(s, config)
    }

    constructor(id: string, config: Conf<Config>) {
        super(id, Object.assign({},
            Text.config,
            config))
        this.reflashView()
    }

    private target: HTMLInputElement = document.createElement('input')

    protected reflashView() {
        if (this.target) this.target.remove()
        this.target = document.createElement('input')
        this.target.disabled = this.config.readonly
        this.target.className = "gb_form"
        this.target.onchange = e => { this.setValue(this.target.value) }
        this.container.appendChild(this.target)
    }

    getValue() {
        return this.value || ''
    }

    setValue(v: string | null) {
        const c = v || ''
        this.value = c
        this.target.value = c
    }
}