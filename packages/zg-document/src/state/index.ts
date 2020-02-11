import blogData from '../data/blog.data'
import componentData from '../data/component.data'
import layoutData from '../data/layout.data'
import issueData from '../data/issue.data'
import toolData from '../data/tool.data'
import Tree from '../utils/Tree'
import Event from '../utils/Event'
import { toMdTree } from '../utils/mdloader'
import { stat } from 'fs'

type State = {
    index: string;
    current: Tree<{
        title: string;
        doc: HTMLElement;
        target: HTMLElement | null;
    }> | null;
    tabs: {
        key: string
        text: string;
        tree: Tree<{
            title: string;
            doc: HTMLElement;
            target: HTMLElement | null;
        }>,
        url: Tree<{
            title: string;
            url: string
        }>
    }[];
}

const state: State = {
    index: '/md/index.md',
    current: null,
    tabs: [
        { key: 'tool', text: '工具库', url: toolData, tree: Tree.gen({ title: '', doc: document.createElement('div'), target: null }) },
        { key: 'component', text: '组件', url: componentData, tree: Tree.gen({ title: '', doc: document.createElement('div'), target: null }) },
        { key: 'layout', text: '布局', url: layoutData, tree: Tree.gen({ title: '', doc: document.createElement('div'), target: null }) },
        { key: 'issue', text: '讨论', url: issueData, tree: Tree.gen({ title: '', doc: document.createElement('div'), target: null }) },
        { key: 'blog', text: '博客', url: blogData, tree: Tree.gen({ title: '', doc: document.createElement('div'), target: null }) },
    ]
}

const onStateChange = Event.gen<State>()

Promise.all(
    state.tabs.map(v=>v.url).map(v=>toMdTree(v))
).then(v=>{
    v.forEach((v,i)=>{
        state.tabs[i].tree = v
    })
    onStateChange.emit(state)

    console.log(state)
})

export {
    state,
    onStateChange
}