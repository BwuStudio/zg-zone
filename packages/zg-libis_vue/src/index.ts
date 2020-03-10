import './style/index.scss'

import globe from './globe'
import Vue from './vue'

import ElementUI from 'element-ui'

(Vue as any).use(ElementUI)

Object.assign(window, {
    Vue: Vue,
})

export default {
    Vue,
    ElementUI,
    globe
}

