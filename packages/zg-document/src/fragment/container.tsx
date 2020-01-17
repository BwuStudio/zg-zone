import React from 'react';
import { InjCss } from '../utils/injcss';
import Document from './document'

const Container:React.FC =()=>{
    return <div className='container'>
        <Document />
    </div>
}
InjCss.gen('container',{
    '':{
        width:'100%',   
        backgroundColor:'#E5E6E4',
        flex: '1',
        overflow:'auto'
    }
})

export default Container