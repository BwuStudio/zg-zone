import Input, { Conf } from "./Input";

type Value = string
type Text = string

declare const Shelf: any

type Config = {
    readonly: boolean
}

export default class DetailSelect extends Input<[Value, Text], Config>{

    static gen(s: string, config: {
        container: HTMLElement
        table: string
    } & Conf<Config>) {
        return new this(s, config.table, config)
    }

    static config = {
        readonly: false
    }

    list: { value: string, text: string }[] = []

    tableName: string

    private target: any = null

    constructor(id: string, tableName: string, config: Conf<Config>) {

        super(
            id,
            Object.assign(
                {},
                DetailSelect.config,
                config)
        )

        this.tableName = tableName
        this.reflashView()
    }

    protected reflashView() {
        if (this.target) this.container.innerHTML = ''
        const c = document.createElement('input')
        c.style.width = "100%"
        this.container.appendChild(c)
        this.target = Shelf.get('detailSelect').input(c, this.tableName)
        if(this.config.readonly){
            this.target.disable()
        }
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
    }

    setValue(v: [Value, Text] | null) {
        const c = v || ['', '']
        this.value = c
        this.target.value = this.value[0]
    }
}