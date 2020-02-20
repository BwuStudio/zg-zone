

import Tool from '../tool/index'

export default function Dom(str, fn) {
    var v = null // parentNode
    var e = null // resultNode
    if (/^\s*<\s*tr\s*/.test(str)) {
        v = document.createElement('table')
        v.innerHTML = $.trim(str)
        e = $(v).find('tr').get(0) || document.createElement('tr')
    } else if (/^\s*<\s*td\s*/.test(str)) {
        v = document.createElement('tr')
        v.innerHTML = $.trim(str)
        e = $(v).find('td').get(0) || document.createElement('td')
    } else if (/^\s*<\s*li\s*/.test(str)) {
        v = document.createElement('ul')
        v.innerHTML = $.trim(str)
        e = $(v).find('li').get(0) || document.createElement('li')
    } else if (/^\s*<\s*option\s*/.test(str)) {
        v = document.createElement('select')
        v.innerHTML = $.trim(str)
        e = $(v).find('option').get(0) || document.createElement('option')
    } else{
        v = document.createElement('div')
        v.innerHTML = $.trim(str)
        e = v.firstChild || document.createElement('span')
    }
    if (fn) { fn(e) }
    return e
}


Dom.async = function(str,fn){
    console.log(1)
    var id = Tool.newId('el_')

    setTimeout(function(){
        if(fn)fn(document.getElementById(id))
    })
    
    return  str.replace('>',' id ="'+id+'" >')
}