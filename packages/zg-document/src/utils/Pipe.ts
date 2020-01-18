import { Monad, Functor } from './fp'

export default class Pipe<T>
    implements Functor<T>, Monad<T>
{
    private v: T
    constructor(v: T) { this.v = v }
    static gen<T>(v: T) { return new Pipe(v) }
    map<S>(fn: (v: T) => S): Pipe<S> { return Pipe.gen(fn(this.v)) }
    flatMap<S>(fn: (v: T) => Pipe<S>): Pipe<S> { return fn(this.v) }
}