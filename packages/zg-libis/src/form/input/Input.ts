

type Conf<T> = T & { container: HTMLElement }

export default abstract class Input<T, Config>{
    protected id: string
    protected config: Config

    setContainer(cntr: HTMLMapElement) {
        this.container = cntr
        this.reflashView()
    }

    constructor(id: string, config: Conf<Config>) {
        this.id = id
        this.config = config
        this.container = config.container
            || document.createElement('div')
    }
    protected value: T | null = null
    protected container: HTMLElement

    abstract getValue(): T
    abstract setValue(value: T | null): void
    protected abstract reflashView(): void

    empty() { this.setValue(null) }


}

export {
    Conf
}
