export default abstract class Input<T>{
    protected id:string 

    setContainer(cntr:HTMLElement){
        this.container = cntr
        this.reflashView()
    }

    constructor(id:string,container:HTMLElement){
        this.id = id
        this.container = container
            ||document.createElement('div')
    }
    protected value:T|null = null
    protected container:HTMLElement 

    abstract getValue():T
    abstract setValue(value:T|null):void
    protected abstract reflashView():void

    empty(){this.setValue(null)}
}