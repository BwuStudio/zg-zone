import React, { useState } from 'react';
import { InjCss } from '../utils/injcss';
import mdloader from '../utils/mdloader'
import { state, onStateChange } from '../state/index'
import { useListener } from '../utils/Event';

const Document: React.FC = () => {
    const [focus, setFocus] = useState(true)
    const [html, setHTML] = useState('')

    // mdloader(state.index).then(s => setHTML(s))

    useListener(onStateChange)
        .map(v => v.current)
        .map(v => v ? v.get().url : v)
        .on(v => {
            if (v) mdloader(v).then(s => {setHTML(s) ;setFocus(false)})
            else mdloader(state.index).then(s =>  {setHTML(s) ;setFocus(true)})
        })

    return <div className='document'>
        <div
            className={'markdown-body content' + (focus ? ' focus' : '')}
            dangerouslySetInnerHTML={{ __html: html }}
        >
        </div>

        <div
            className = "background"
        ></div>
    </div>
}


InjCss.gen('document', {
    '': {
        width: '100%',
        overflowY: 'hidden',
        minHeight:'100%',
    },
    '.content': {
        minHeight: '100%',
        position: 'relative',
        marginRight: "500px",
        zIndex:'1',
        padding: '60px',
        transition: 'all 0.3s ease-out',
    },
    '.content.focus': {
        marginRight: "0",
    },
    '.background': {
        transition: 'all 0.3s ease-out',
        position:"fixed",
        left:'0',
        top:'0',
        bottom:"0",
        right:"500px",
        backgroundColor: 'rgba(255,255,255,1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    '.content.focus + .background':{
        right:"0",
        backgroundColor: 'rgba(255,255,255,0)',
        boxShadow: '0 2px 4px rgba(0,0,0,0)'
    }
})

export default Document