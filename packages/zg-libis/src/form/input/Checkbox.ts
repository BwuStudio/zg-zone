import Input from "./Input";


type Value = string
type Text = string

export default class checkbox extends Input<[Value, Text][]>{


    static gen(s: string, config: {
        container: HTMLElement
    }) {
        return new this(s, config.container)
    }

    list: { value: string, text: string }[] = []

    constructor(id: string, container: HTMLElement) {
        super(id, container)
        this.uid = Math.floor(Math.random()*10000).toString()
        this.reflashView()
    }

    private uid :string

    protected reflashView() {
        this.target.forEach(v => { v[0].remove() })
        this.target = this.list.map(v => {
            const r = document.createElement('input')
            const l = document.createElement('label')
            const s = document.createElement('span')

            r.type = 'checkbox'
            r.name = this.id + this.uid
            r.value = v.value
            s.innerHTML = v.text

            r.checked = this.value?.find(c => c[0] === r.value) ? true : false

            l.appendChild(r)
            l.appendChild(s)

            return [l, r]
        })

        this.target.forEach(([l, r]) => {
            
            this.container.appendChild(l)

            r.onchange = e => this.setValue(
                this.list.filter((v, i) =>
                    this.target[i]?.[1].checked).map(v =>
                        [v.value, v.text]))
        })
    }

    private target: [HTMLLabelElement, HTMLInputElement][] = []

    getValue() {
        return this.value || []
    }

    setOpions(c: { [value: string]: string }) {
        this.list = Object.keys(c).map(value => {
            const text = c[value] || ''
            return { value, text }
        })
        this.reflashView()
    }

    setValue(v: [Value, Text][] | null) {
        const c = v || []
        this.value = c
        this.target.forEach(v => {
            v[1].checked = this.value?.find(c => c[0] === v[1].value) ? true : false
        })
    }
}