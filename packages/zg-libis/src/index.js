import './polyfill/index'
import './style/index'

import Validate from './validate/index'
import Api from './api/index'
import Shelf from './shelf/index'
import Msger from './msger/index'
import Form from './form/index'
import Dom from './dom/index'
import Tool from './tool/index'
 
export {
    Validate, // 验证工具
    Api, // ajax 工具
    Shelf,// 组件框架
    Msger,
    Dom,
    Tool,
    Form
}


window.Validate = Validate
window.Api = Api
window.Shelf = Shelf
window.Msger = Msger
window.Dom = Dom
window.Tool = Tool
window.Form = Form