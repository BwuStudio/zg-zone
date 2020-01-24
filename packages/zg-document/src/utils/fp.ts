export interface Functor<T> {
    map<S>(fn: (v: T) => S): Functor<S>
}

export interface Monad<T> {
    flatMap<S>(fn: (v: T) => Monad<S>): Monad<S>
}
