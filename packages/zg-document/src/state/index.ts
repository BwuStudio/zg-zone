import blogData from '../data/blog.data'
import componentData from '../data/component.data'
import layoutData from '../data/layout.data'
import issueData from '../data/issue.data'
import toolData from '../data/tool.data'
import Tree from '../utils/Tree'
import Event from '../utils/Event'

type State = {
    index: string;
    current: Tree<{
        url: string;
    }> | null;
    tabs: {
        key:string
        text: string;
        tree: Tree<{
            url: string;
        }>;
    }[];
}
const state: State = {
    index: '/md/index.md',
    current: null,
    tabs: [
        { key:'tool', text: '工具库', tree: toolData },
        { key:'component',text: '组件', tree: componentData },
        { key:'layout',text: '布局', tree: layoutData },
        { key:'issue',text: '讨论', tree: issueData },
        { key:'blog',text: '博客', tree: blogData },
    ]
}

const onStateChange = Event.gen<State>()

export  {
    state,
    onStateChange
}