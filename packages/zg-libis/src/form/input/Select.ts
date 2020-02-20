import Input from "./Input";

type Value = string
type Text = string

export default class Select extends Input<[Value, Text]>{

    static gen(s: string, config: {
        container:HTMLElement
    }) {
        return new this(s,config.container)
    }

    list: { value: string, text: string }[] = []

    constructor(id: string,container:HTMLElement) {
        super(id,container)
        this.reflashView()
    }

    private target: HTMLSelectElement = document.createElement('select')
    
    protected reflashView(){
        if(this.target) try{this.target.remove()}catch(e){}

        this.target = document.createElement('select')
        this.target.className = 'gb_form'
        this.container.appendChild(this.target)
    }

    getValue() {
        return this.value || ['', '']
    }

    setOpions(c:{[value:string]:string}){
        this.list = Object.keys(c).map(value=>{
            const text = c[value] || ''
            return {value,text}
        })

        this.target.innerHTML = ''
        this.target.innerHTML = this.list.map(v=>`<option value="${v.value}">${v.text}</option>`).join('')
    }

    setValue(v: [Value, Text] | null) {
        const c = v || ['', '']
        this.value = c
        this.target.value = this.value[0]
    }
}