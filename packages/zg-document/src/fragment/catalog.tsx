import React, { useState, useEffect } from 'react';
import { InjCss } from '../utils/injcss';
import Tree from '../utils/Tree'
import { state, onStateChange } from '../state/index'
import { useListener } from '../utils/Event'

const Calalog: React.FC = () => {
    const [cur, setCur] = useState(state.current)
    const root = state.tabs.find(v => v.tree.exist(cur))

    useListener(onStateChange).map(v => v.current).on(v => setCur(v))

    return <div className="calalog">
        <div className="calalog-hidden_scrollbar">
            {
                root
                    ? <div
                        onClick={() => { state.current = root.tree; onStateChange.emit(state) }}
                        className={'calalog-title' + (cur === root.tree ? ' focus' : '')}
                    >{root.tree.get().title}</div>
                    : ''
            }
            <TreeList focus={cur} list={root ? root.tree.getChildren() : []}></TreeList>
        </div>

    </div>
}

const scrollTo = (top: number, i = 0) => {
    const wTop = document.documentElement.scrollTop
    const wBottom = document.documentElement.scrollHeight - window.innerHeight + document.documentElement.scrollTop

    if (
        (wTop === 0 || i > 20 || wBottom === 0 || top === wTop)
        && i !== 0
    ) return

    document.documentElement.scrollTop = (top + wTop) / 2

    requestAnimationFrame(v=>scrollTo(top, i + 1))
}

const TreeList: React.FC<{
    list: Tree<{
        title: string;
        doc: HTMLElement;
        target: HTMLElement | null;
    }>[],
    focus: Tree<{
        title: string;
        doc: HTMLElement;
        target: HTMLElement | null;
    }> | null,
    level?: number
}> = (props) => {

    const { list, level = 0, focus } = props

    useEffect(() => {
        const c = state.current ? state.current.get().target : null
        if (c) {
            scrollTo( c.offsetTop)
        }

        document.title = `You clicked ${''} times`;
    });

    return <ol className="cl_tree">
        {list.map(v => {
            const value = v.get()
            const children = v.getChildren()
            return <li
                key={v.getId()}
                data-focus={focus === v ? true : false}>

                <div
                    style={{ paddingLeft: level * 20 + 20 + 'px' }}
                    className="cl_tree-title"
                    onClick={() => { state.current = v; onStateChange.emit(state) }}>
                    {value.title}
                </div>
                {
                    children.length === 0
                        ? ''
                        : <TreeList focus={focus} list={children} level={level + 1} />
                }
            </li>

        })}
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
    '.calalog-title': {
        fontWeight: 'bold',
        fontSize: '18px',
        cursor: 'pointer',
        display: 'inline-block',
        position: 'relative',
        padding: '8px 0',
        color: '#333',
        transition: 'all 0.2s ease-out',
        textShadow: '0 0 0 rgba(0,0,0,0.2)'
    },
    '.calalog-title::after': {
        content: '""',
        width: '0',
        position: 'absolute',
        bottom: '0',
        height: '3px',
        transition: 'all 0.2s ease-out',
        backgroundColor: '#666',
        left: '0',
        boxShadow: '0 0 0 rgba(0,0,0,0.2)'
    },

    '.calalog-title.focus': {
        textShadow: '0 3px 2px rgba(0,0,0,0.2)'
    },
    '.calalog-title.focus::after': {
        width: '100%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
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
        cursor: 'pointer',
        position: 'relative',
        textShadow: '0 0 0 rgba(0,0,0,0.2)'
    },
    'li[data-focus="true"] > .cl_tree-title': {
        fontWeight: 'bolder',
        textShadow: '0 3px 3px rgba(0,0,0,0.2)'
    },
    '.cl_tree-title::after': {
        content: '""',
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        width: '20px',
        backgroundColor: '#666',
        opacity: '0',
        transition: 'all 0.2s ease-out'
    },
    'li[data-focus="true"] > .cl_tree-title::after': {
        width: '4px',
        opacity: '1',
        boxShadow: '0 3px 3px rgba(0,0,0,0.2)'
    }
})

export default Calalog