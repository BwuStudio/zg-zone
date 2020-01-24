import { Functor } from "./fp";

type TreeJson<T> = {
    children?: TreeJson<T>[]
} & T

export default class Tree<T> implements Functor<T>{
    constructor(v: T) { this.v = v; this.children = [] }
    static gen<T>(c: T) { return new Tree<T>(c) }
    static prase<T>(c: TreeJson<T>) {

        const s = Tree.gen<T>(Object.assign({}, c, { children: null }))
        s.children = c.children?c.children.map(v=>Tree.prase(v)):[]

        return s
    }

    private v: T
    private children: Tree<T>[]
    get() { return this.v }

    map<S>(fn: (t: T) => S): Tree<S> {
        const c = Tree.gen(fn(this.v))
        c.children = this.children.map(v => v.map(fn))
        return c
    }

    getChildren() {
        return this.children.map(v => v)
    }
    gerValue(){
        return this.v
    }
}