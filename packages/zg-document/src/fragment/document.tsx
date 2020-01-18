import React, { useState } from 'react';
import { InjCss } from '../utils/injcss';
import mdloader from '../utils/mdloader'
import { state, onStateChange } from '../state/index'

const Document: React.FC = () => {
    const [count, SetCount] = useState(0)
    const [html, setHTML] = useState('')

    mdloader(state.index).then(s => setHTML(s))

    onStateChange
        .map(v => v.current)
        .map(v => v ? v.get().url : v)
        .listen(v => {
            if (v)mdloader(v).then(s => setHTML(s))
        })

    return <div
        className={'markdown-body document' + (count % 2 === 0 ? '' : ' focus')}
        onClick={() => { SetCount(count + 1) }}
        dangerouslySetInnerHTML={{ __html: html }}
    >
    </div>
}
InjCss.gen('document', {
    '': {
        // width:'800px',   
        backgroundColor: 'white',
        minHeight: '100%',
        position: 'relative',
        marginRight: "500px",
        padding: '60px',
        // left:'0',
        // transform:'translate(0,0)',
        transition: 'all 0.3s ease-out',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    '$.focus': {
        // left:'50%',
        marginRight: "0",
        // backgroundColor:'transparent',
        // transform:'translate(-50%,0)',
        boxShadow: '0 2px 4px rgba(0,0,0,0)'
    }
})

export default Document