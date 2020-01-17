import React, { useState } from 'react'
import { InjCss } from '../utils/injcss'


const TabTitle: React.FC = () => {

    const [list, SetList] = useState([
        { id: 'tools', text: '工具库', check: false },
        { id: 'components', text: '组件', check: false },
        { id: 'layout', text: '布局', check: false },
        { id: 'discu', text: '讨论', check: false },
        { id: 'blog', text: '博客', check: false },
    ])

    return <ol className='tab_title'>{
    list.map(v=><li className={'tab_title--li' + (v.check?' tab_title--li__check':'')} onClick={()=>{
        SetList(list.map(c=>{
            c.check = c.id === v.id 
            return c
        }))
    }}>{v.text}</li>)
    }</ol>
}

InjCss.gen('tab_title', {
    '': {
        float: 'left',
        height: '60px',
        lineHeight: '60px',
        listStyle: 'none',
        color:'white',
        margin:'0',
        padding:'0 20px',
    },
    'li': {
        float: 'left',
        margin:'0',
        padding:'0 20px',
        height: '60px',
        lineHeight: '60px',
        listStyle: 'none',
        color:'rgba(255,255,255,0.9)',
        cursor:'pointer',
        fontSize:'18px',
        transition:'all 0.2s ease-out',
        position:'relative',
        backgroundColor:'rgba(255,255,255,0)'
    },
    'li.tab_title--li__check':{
        color:'#A9DEF9',
        textShadow:'0 3px 3px rgba(0,0,0,0.3)',
        backgroundColor:'rgba(255,255,255,0.1)'
    },
    'li.tab_title--li::after':{
        content:'""',
        position:'absolute',
        bottom:'0',
        left:'0',
        right:'0',
        transition:'all 0.2s ease-out',
        height:'0',
        backgroundColor:'#A9DEF9'
    },
    'li.tab_title--li__check::after':{
        height:'4px',
        borderRadius:'2px 2px 0 0'
    }
})
export default TabTitle