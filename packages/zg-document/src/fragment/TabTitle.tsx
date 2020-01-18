import React, { useState } from 'react'
import { InjCss } from '../utils/injcss'
import { state, onStateChange } from '../state/index'
import Tree from '../utils/Tree'

const TabTitle: React.FC = () => {

    const [cur, setCur] = useState<Tree<{ url: string }> | null>(state.current)
    const list = state.tabs
    const isCheck = (v: Tree<{ url: string }>, cur: Tree<{ url: string }> | null) => {
        return v === cur
    }
    onStateChange.map(v => v.current).listen(v => setCur(v))
    return <ol className='tab_title'>{
        list.map(v => <li key={v.key} className={'tab_title--li' + (isCheck(v.tree, cur) ? ' tab_title--li__check' : '')} onClick={() => {
            state.current = v.tree
            onStateChange.emit(state)
        }}>{v.text}</li>)
    }</ol>
}

InjCss.gen('tab_title', {
    '': {
        float: 'left',
        height: '60px',
        lineHeight: '60px',
        listStyle: 'none',
        color: 'white',
        margin: '0',
        padding: '0 20px',
    },
    'li': {
        float: 'left',
        margin: '0',
        padding: '0 20px',
        height: '60px',
        lineHeight: '60px',
        listStyle: 'none',
        color: 'rgba(255,255,255,0.9)',
        cursor: 'pointer',
        fontSize: '18px',
        transition: 'all 0.2s ease-out',
        position: 'relative',
        backgroundColor: 'rgba(255,255,255,0)'
    },
    'li.tab_title--li__check': {
        color: '#A9DEF9',
        textShadow: '0 3px 3px rgba(0,0,0,0.3)',
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    'li.tab_title--li::after': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        transition: 'all 0.2s ease-out',
        height: '0',
        backgroundColor: '#A9DEF9'
    },
    'li.tab_title--li__check::after': {
        height: '4px',
        borderRadius: '2px 2px 0 0'
    }
})
export default TabTitle