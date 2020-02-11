import React from 'react'
import { InjCss } from '../utils/injcss'
import Tree from '../utils/Tree'

type Props = {
    cur: Tree<{
        title: string;
        doc: HTMLElement;
        target: HTMLElement | null;
    }> | null,
    list: {
        key: string;
        text: string;
        tree: Tree<{
            title: string;
            doc: HTMLElement;
            target: HTMLElement | null;
        }>
    }[],
    changeTo: (tree: Tree<{
        title: string;
        doc: HTMLElement;
        target: HTMLElement | null;
    }> | null) => void
}

const TabTitle: React.FC<Props> = (props: Props) => {

    const { cur, list, changeTo } = props

    return <ol className='tab_title'>{
        list.map(v => <li key={v.key} className={'tab_title--li' + (v.tree.exist(cur) ? ' tab_title--li__check' : '')} onClick={() => {
            changeTo(v.tree)
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
        lineHeight: '65px',
        listStyle: 'none',
        color: 'rgba(255,255,255,1)',
        // color: '##706c61',
        cursor: 'pointer',
        fontSize: '18px',
        transition: 'all 0.2s ease-out',
        position: 'relative',
        fontWeight: 'bold',
        textShadow: '0 3px 3px rgba(0,0,0,0.2)',
        backgroundColor: 'rgba(255,255,255,0)'
    },
    'li.tab_title--li__check': {
        color: '#393e46',
        lineHeight: '60px',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    'li.tab_title--li::after': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        transition: 'all 0.2s ease-out',
        height: '0',
        backgroundColor: '#393e46',
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.5)',
    },
    'li.tab_title--li__check::after': {
        height: '4px',
        borderRadius: '2px 2px 0 0'
    }
})
export default TabTitle