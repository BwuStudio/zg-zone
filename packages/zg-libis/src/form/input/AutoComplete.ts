import Input, { Conf } from "./Input";

declare const mini: any

type Config = {
    readonly: boolean,
    url: string,
    onchange: ((...arg: any) => any) | null
}

type Value = string
type Text = string

export default class AutoComplete extends Input<[Value,Text], Config>{


    static gen(s: string, config: Conf<Config>) {
        return new this(s, config)
    }

    static config = {
        readonly: false,
        url: '',
        onchange: null
    }

    constructor(id: string, config: Conf<Config>) {

        super(
            id,
            Object.assign(
                {},
                AutoComplete.config,
                config))

        this.uid = Math.floor(Math.random() * 10000).toString()
        this.reflashView()
    }

    private target: any = null

    private uid: string

    protected reflashView() {
        const id = 'mymini-' + this.id + this.uid
        console.log(id)

        const temp = document.createElement('input')
        temp.id = id
        temp.className = "mini-autocomplete gb_form"

        document.body.appendChild(temp)

        mini.parse(id)

        const c = document.getElementById(id)

        if (c) this.container.appendChild(c)

        this.target = mini.get(id)

        this.target.setUrl(this.config.url) 
        this.target.setDataField('Data')

        if (this.config.readonly) {
            this.target.disable()
        }

        this.target.onValueChanged(this.config.onchange || ((c:any) => {
            if (c.selected) {
                this.setValue([
                    c.selected['id'],
                    c.selected['text'],
                ])
            } else {
                this.setValue(null)
            }
        }))
    }

    getValue() {
        return this.value || ['', '']
    }

    setValue(v: [Value, Text] | null) {
        const c = v || ['', '']
        this.value = c
        this.target.setText(c[1])
        this.target.setValue(c[0])
    }
}