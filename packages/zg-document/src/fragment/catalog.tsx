import React from 'react';
import { InjCss } from '../utils/injcss';

const Calalog: React.FC = () => {
    return <div className="calalog">
        <div className="calalog-hidden_scrollbar">
            <TreeList focus={'1'} list={[{
                title: '1231',
                id: '1',
                children: [{
                    title: '1231',
                    id: '2',
                    children: []
                }, {
                    title: '1231',
                    id: '3',
                    children: []
                }, {
                    title: '1231',
                    id: '4',
                    children: []
                }, {
                    title: '1231',
                    id: '6',
                    children: []
                }, {
                    title: '1231',
                    id: '7',
                    children: []
                }, {
                    title: '1231',
                    id: '8',
                    children: []
                }]
            }, {
                title: '1231',
                id: '9',
                children: []
            }, {
                title: '1231',
                id: 'a',
                children: []
            }, {
                title: '1231',
                id: 's',
                children: []
            }, {
                title: '1231',
                id: 'x',
                children: []
            }, {
                title: '1231',
                id: 'c',
                children: []
            }]}></TreeList>

        </div>

    </div>
}

type TreeItem = {
    title: string,
    id: string,
    children: TreeItem[]
}
const TreeList: React.FC<{ list: TreeItem[], focus: string, level?: number }> = (props) => {

    const { list, level = 0, focus } = props

    return <ol className="cl_tree" style={{ paddingLeft: level * 20 + 'px' }}>
        {list.map(v => <li data-focus={focus === v.id ? true : false}>
            <div className="cl_tree-title">{v.title}</div>
            {
                v.children.length === 0
                    ? ''
                    : <TreeList focus={focus} list={v.children} level={level + 1} />
            }
        </li>)}
    </ol>
}

InjCss.gen('calalog', {
    '': {
        position: 'fixed',
        right: '200px',
        height: '100%',
        top: '60px',
        overflow: 'hidden',
        width: '300px',
    },
    '.calalog-hidden_scrollbar': {
        height: '100%',
        overflowY: 'auto',
        marginRight: '-17px',
        padding: '50px'
    },
    '.cl_tree': {
        listStyle: 'none',
        padding: '0',
        // paddingLeft: '20px',
    },
    '.cl_tree-title': {
        padding: '4px 0',
    },
    'li[data-focus="true"] > .cl_tree-title': {
        fontWeight: 'bolder'
    }
})

export default Calalog