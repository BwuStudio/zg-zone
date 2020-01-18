import { Monad, Functor } from './fp'

export default class Event<T> implements Functor<T>{

    private events: ((v: T) => void)[] = []

    static gen<T>() { return new Event<T>() }

    constructor() { this.events = [] }

    map<S>(fn: (t: T) => S): Event<S> {

        const e = Event.gen<S>()
        this.events.push(v => {
            e.emit(fn(v))
        })

        return e
    }

    listen(fn: (t: T) => void) { this.events.push(v => fn(v)) }

    emit(v: T) { this.events.forEach(fn => fn(v)) }
}