import React from 'react';
import { InjCss } from '../utils/injcss';

const Calalog: React.FC = () => {
    return <div className="calalog">
        <div className="calalog-hidden_scrollbar">
            <Tree focus={'1'} list={[{
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
            }]}></Tree>

        </div>

    </div>
}

type TreeItem = {
    title: string,
    id: string,
    children: TreeItem[]
}
const Tree: React.FC<{ list: TreeItem[], focus: string }> = (props: { list: TreeItem[], focus: string }) => {

    return <ol className="cl_tree">
        {props.list.map(v => <li data-focus={props.focus === v.id ? true : false}>
            <div className="cl_tree-title">{v.title}</div>
            {
                v.children.length === 0
                    ? ''
                    : <Tree focus={props.focus} list={v.children} />
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
        paddingLeft: '20px',
    },
    '.cl_tree-title': {
        padding: '4px 0',
    },
    'li[data-focus="true"] > .cl_tree-title':{
        fontWeight:'bolder'
    }
})

export default Calalog