import Input from "./Input";

export default class Text extends Input<string>{

    static gen(s:string,config:{
        container:HTMLElement
    }){
        return new this(s,config.container)
    }

    constructor(id:string,container:HTMLElement){
        super(id,container)
        this.reflashView()
    }

    private target : HTMLInputElement = document.createElement('input')

    protected reflashView(){
        if(this.target) this.target.remove()
        this.target = document.createElement('input')
        this.container.appendChild(this.target)
    }

    getValue(){
        return this.value||''
    }

    setValue(v:string|null){
        const c = v || ''
        this.value = c
        this.target.value = c
    }
}