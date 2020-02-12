import showdown from 'showdown'
import 'github-markdown-css'
import Tree from './Tree'

const host = process.env.NODE_ENV === 'development'?"http://localhost:3001/browser":'https://bwustudio.github.io/zg-zone/packages/zg-libis/browser'


const converter = new showdown.Converter()

const loader = (url: string) => {
    return (fetch(url)
        .then(res => res.text())
        .then(text => ({ html: converter.makeHtml(text), md: text })))
}
export const loadToDom = (url:string) => loader(url).then<HTMLElement>(v=>{
    const doc = document.createElement('div')
    doc.className = 'markdown-body'
    doc.innerHTML = v.html
    return doc
})

export const toMdTree = (tree: Tree<{ title: string, url: string }>) => new Promise<
    Tree<{
        title: string;
        doc: HTMLElement;
        target: HTMLElement | null;
    }>
>((res, rej) => {
    const promiseArr: Promise<{ url: string, html: string, md: string }>[] = []

    tree.forEach((node) => {
        const url = node.getValue().url
        promiseArr.push(loader(url).then(({ html, md }) => ({ url, html, md })))
    })

    Promise.all(promiseArr)
        .then(v => {
            return tree.map(({ title, url }) => ({ title, data: v.find(c => c.url === url) }))
                .map(({ data, title }) => ({ title, html: data ? data.html : '' }))
                .map(({ title, html }): { title: string, doc: HTMLElement, target: HTMLElement | null } => {
                    const doc = document.createElement('div')
                    doc.className = 'markdown-body'
                    doc.innerHTML = html
                    return { title, doc, target: null }
                })
        }).then(v => {
            v.forEach(v => {
                Array.from(v.getValue().doc.querySelectorAll('.ifr'))
                    .forEach((v) => {
                        const c = v as HTMLElement
                        if ((c.dataset.src || '').indexOf(host) < 0)
                            c.dataset.src = c.dataset.src ? host + c.dataset.src : ''
                    })

                if (v.getChildren().length > 0) return
                if (v.get().target) return
                Array.from(v.getValue().doc.querySelectorAll('h2'))
                    .map(c => Tree.gen({
                        title: c.innerHTML,
                        doc: v.getValue().doc,
                        target: c
                    }))
                    .forEach(m => v.pushChildren(m))
            })
            return v
        }).then(v => {
            res(v)
        })

})