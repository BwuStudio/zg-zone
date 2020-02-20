import Input from "./Input";

declare const mini: any

export default class Text extends Input<string>{


    static gen(s: string, config: {
        container: HTMLElement
    }) {
        return new this(s, config.container)
    }

    constructor(id: string, container: HTMLElement) {
        super(id, container)
        this.uid = Math.floor(Math.random()*10000).toString()
        this.reflashView()
    }

    private target: any = null

    private uid:string

    protected reflashView() {
        // const id = 'mymini-' + this.id
        // this.container.innerHTML = `<input class="mini-datepicker" id="${id}">`
        // mini.parse(id)
        // this.target = mini.get(id)


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