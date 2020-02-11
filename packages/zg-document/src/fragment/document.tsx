import React, { useState, useRef } from 'react';
import { InjCss } from '../utils/injcss';
import { state, onStateChange } from '../state/index'
import { useListener } from '../utils/Event';

const Document: React.FC = () => {
    const [focus, setFocus] = useState(true)
    const doc = useRef(document.createElement('div'))

    useListener(onStateChange)
        .map(v => v.current)
        .map(v => v ? v.get().doc : v)
        .on(v => {
            if (v) {
                doc.current.innerHTML = ''
                doc.current.appendChild(v)

                Array.from(v.querySelectorAll('.ifr'))
                .forEach(v=>{
                    v.innerHTML = ''
                    setTimeout(()=>{
                        v.innerHTML = `<iframe style="height:100%;width:100%" src= ${(v as HTMLElement).dataset.src}></iframe>`
                    },300)
                })

                setFocus(false)
            }
            else {
                setFocus(true)
            }
        })

    return <div className='document'>
        <div
            className={'markdown-body content' + (focus ? ' focus' : '')}
            ref={doc}
        >
        </div>
        <div
            className="background"
        ></div>
    </div>
}


InjCss.gen('document', {
    '': {
        width: '100%',
        overflowY: 'hidden',
        minHeight: '100%',
    },
    '.content': {
        minHeight: '100%',
        position: 'relative',
        marginRight: "500px",
        zIndex: '1',
        padding: '60px',
        transition: 'all 0.3s ease-out',
    },
    '.content.focus': {
        marginRight: "0",
    },
    '.background': {
        transition: 'all 0.3s ease-out',
        position: "fixed",
        left: '0',
        top: '0',
        bottom: "0",
        right: "500px",
        backgroundColor: 'rgba(255,255,255,1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    '.content.focus + .background': {
        right: "0",
        backgroundColor: 'rgba(255,255,255,0)',
        boxShadow: '0 2px 4px rgba(0,0,0,0)'
    },
    '.ifr': {
        height:'320px',
        width:"400px"
    }
})

export default Document