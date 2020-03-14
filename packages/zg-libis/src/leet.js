function a() {
    const arr = nums

    if (arr.length === 0) return []

    const max = arr.reduce((a, b) => a >= b ? a : b)
    const min = arr.reduce((a, b) => a <= b ? a : b)

    const c = new Array(max - min + 1).fill(0).map((v, i) => ({
        begin: i + min,
        end: i + min,
        count: 0,
        left: null,
        right: null
    }))

    function re(arr) {
        if (arr.length === 1) return arr

        const next = new Array(Math.ceil(arr.length / 2)).fill(0)

        return re(next.map((v, i) => {
            const left = arr[i * 2]
            const right = arr[i * 2 + 1] || null

            return right ? {

                begin: left.begin,
                end: right.end,
                count: 0,
                left,
                right

            } : left

        }))
    }

    const tree = re(c)

    function push(num, c = tree[0]) {
        if ((c.begin <= num) && (c.end >= num)) {
            c.count = c.count + 1
        }

        if (c.left && ((c.left.begin <= num) && (c.left.end >= num))) {
            push(num, c.left)
        }

        if (c.right && (c.right.begin <= num) && (c.right.end >= num)) {
            push(num, c.right)
        }

    }
    function caclu(num, c = tree[0]) {
        if (num <= c.begin) return 0
        if( num > c.end) return c.count

        return (c.left?caclu(num,c.left):0) +(c.right?caclu(num,c.right):0)
    }

    return arr.reverse().map(v => {
        push(v)
        return caclu(v)
    }).reverse()
}