import { Functor } from "./fp";

type TreeJson<T> = {
    children?: TreeJson<T>[]
} & T

export default class Tree<T> implements Functor<T>{
    constructor(v: T) { 
        this.v = v; 
        this.children = [];
        this.id = Math.random().toString()
    }
    static gen<T>(c: T) { return new Tree<T>(c) }
    static prase<T>(c: TreeJson<T>) {

        const s = Tree.gen<T>(Object.assign({}, c, { children: null }))
        s.children = c.children ? c.children.map(v => Tree.prase(v)) : []

        return s
    }

    private id: string
    private v: T
    private children: Tree<T>[]
    get() { return this.v }
    getId() { return this.id}

    map<S>(fn: (t: T) => S): Tree<S> {
        const c = Tree.gen(fn(this.v))
        c.children = this.children.map(v => v.map(fn))
        return c
    }

    forEach(fn: (t: Tree<T>) => void): void {
        const c = fn(this)
        this.children.map(v => v.forEach(fn))
        return c
    }

    getValue(){
        return this.v
    }
    getChildren() {
        return this.children
    }
    pushChildren(tree:Tree<T>){
        this.children.push(tree)
    }
    exist(node: Tree<T>|null): boolean {
        if (this === node)
            return true
        else
            return this.children.find(v => v.exist(node)) ? true : false
    }
}