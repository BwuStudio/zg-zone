interface Functor<T> {
    map<S>(fn: (v: T) => S): Functor<S>
}

interface Monad<T> {
    flatMap<S>(fn: (v: T) => Monad<S>): Monad<S>
}

export {
    Functor,
    Monad
}