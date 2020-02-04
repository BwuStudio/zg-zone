import Tree from '../utils/Tree'

export default Tree.prase<{ url: string, title: string }>({
    title: '布局',
    url: '/md/index.md',
    children: [
        {
            title: '文本内容具有一定', url: '/md/index.md',
            children: [
                { title: '换成更多的格式', url: '/md/index.md' },

                { title: '这些功能原初的', url: '/md/index.md' },

                { title: '基本兼容', url: '/md/index.md' },

                { title: '语法和渲染效果上有改动', url: '/md/index.md' },

                { title: '协议的', url: '/md/index.md' }
            ]
        },

        { title: '使用易读易写的纯', url: '/md/index.md' },

        { title: '使普通文本', url: '/md/index.md' },

        { title: '辑器编写的标', url: '/md/index.md' },

        { title: '种可以使用普通文本', url: '/md/index.md' }
    ]
})