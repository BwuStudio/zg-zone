import Tree from '../utils/Tree'

export default Tree.prase<{ url: string, title: string }>({
    title: '概述',
    url: './md/component/index.md',
    children: [
        { title: 'HTML 原生组件', url: './md/component/html.md' },

        { title: 'miniUI 组件', url: './md/index.md' },

        { title: 'shelf 自研组件', url: './md/index.md' }
    ]
})