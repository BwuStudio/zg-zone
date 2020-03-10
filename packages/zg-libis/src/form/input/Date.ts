import Input, { Conf } from "./Input";

declare const mini: any

type Config = {
    readonly: boolean
}

export default class Date extends Input<string, Config>{


    static gen(s: string, config: Conf<Config>) {
        return new this(s, config)
    }

    static config = {
        readonly: false
    }

    constructor(id: string, config: Conf<Config>) {

        super(
            id,
            Object.assign(
                {},
                Date.config,
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
        temp.className = "mini-datepicker gb_form"

        document.body.appendChild(temp)

        mini.parse(id)

        const c = document.getElementById(id)

        if (c) this.container.appendChild(c)

        this.target = mini.get(id)

        if (this.config.readonly) {
            this.target.disable()
        }

        this.target.setDataField('Data')
        this.target.onValueChanged(() => {
            this.setValue(this.target.getFormValue())
        })
    }

    getValue() {
        return this.value || ''
    }

    setValue(v: string | null) {
        const c = v || ''
        this.value = c
        this.target.setValue(c)
    }
}