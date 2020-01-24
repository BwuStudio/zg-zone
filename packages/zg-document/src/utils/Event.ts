import { Functor } from './fp'
import { useEffect } from 'react'

export default class Event<T> implements Functor<T>{

    listeners: ((v: T) => void)[] = []

    static gen<T>() { return new Event<T>() }

    constructor() { this.listeners = [] }

    map<S>(fn: (t: T) => S): Event<S> {
        const e = Event.gen<S>()
        const f = (t: T) => { e.emit(fn(t)) }

        this.on(f)
        return e
    }
    emit(v: T) {
        this.listeners.forEach(s => s(v))
    }
    on(listener: (v: T) => void) { this.listeners = this.listeners.concat([listener]) }
    off(listener: (v: T) => void ) { this.listeners = this.listeners.filter(v => v !== listener) }
}

const useListener = <T>(eve: Event<T>) => {
    const e = Event.gen<T>()
    useEffect(() => {
        const f = (t: T) => { e.emit(t) }
        eve.on(f)
        return () => { eve.off(f); }
    })
    return e
}

const useEmiter = <T>(eve:Event<T>)=>{
    const e = Event.gen<T>()
    useEffect(()=>{
        e.on(v=>eve.emit(v))
    })
    return e
}


export {
    useListener,
    useEmiter
}