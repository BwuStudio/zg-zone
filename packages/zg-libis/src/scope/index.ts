export default function Scope<T>(c: T) {
    let m = c
    let set = (s: { [P in keyof T]?: T[P] } = {}) => {
        m = Object.assign(m, s)
        return m
    }

    let map: { [key: string]: Function } = {}

    return {
        def(name: string, fn: Function) {
            map[name] = fn
        },
        run(name: string, ...arg: any[]) {
            if (map[name]) {
                return map[name].call(null, ...[set].concat(arg))
            }
        }
    }
}