type TreeJson<T> = {
    children?: TreeJson<T>[]
} & T

export default class Tree<T>{
    private v: T

    children: Tree<T>[]
    constructor(v: T) { this.v = v; this.children = [] }
    static gen<T>(c: TreeJson<T>) { return new Tree<T>(c) }
    get() { return this.v }


}