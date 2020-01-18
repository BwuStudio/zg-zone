type TreeJson<T> = {
    title: string,
    children?: TreeJson<T>[]
} & T

export default class Tree<T>{
    private v:T
    constructor(v:T){ this.v = v}
    static gen<T>(c: TreeJson<T>) { return new Tree<T>(c) }
    get(){return this.v}
}