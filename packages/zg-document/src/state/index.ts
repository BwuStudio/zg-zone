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
        { text: '工具库', tree: toolData },
        { text: '组件', tree: componentData },
        { text: '布局', tree: layoutData },
        { text: '讨论', tree: issueData },
        { text: '博客', tree: blogData },
    ]
}

const onStateChange = Event.gen<State>()


export  {
    state,
    onStateChange
}