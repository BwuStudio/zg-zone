import React, { useState } from 'react';
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
                root ? <div>{root.tree.get().title}</div> : ''
            }
            <TreeList focus={cur} list={root ? root.tree.getChildren() : []}></TreeList>
        </div>

    </div>
}

const TreeList: React.FC<{
    list: Tree<{ title: string, url: string }>[],
    focus: Tree<{ title: string, url: string }> | null,
    level?: number
}> = (props) => {

    const { list, level = 0, focus } = props

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
        position:'relative',
        textShadow:'0 0 0 rgba(0,0,0,0.2)'
    },
    'li[data-focus="true"] > .cl_tree-title': {
        fontWeight: 'bolder',
        textShadow:'0 3px 3px rgba(0,0,0,0.2)'
    },
    '.cl_tree-title::after': {
        content:'""',
        position:'absolute',
        left:'0',
        top:'0',
        bottom:'0',
        width:'20px',
        backgroundColor:'#666',
        opacity:'0',
        transition:'all 0.2s ease-out'
    },
    'li[data-focus="true"] > .cl_tree-title::after': {
        width:'4px',
        opacity:'1',
        boxShadow:'0 3px 3px rgba(0,0,0,0.2)'
    }
})

export default Calalog