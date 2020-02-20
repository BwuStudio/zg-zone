export default {
    newId: function (prefix, format) {
        var p = prefix || ''
        var f = format || '550e8400-e29b-41d4-a716-446655440000'
        var a = '0123456789ABCDEF'
        return p + f.split('').map(function (v) { return v === '-' ? '-' : a[Math.floor(Math.random() * a.length)] }).join('')
    },
    getUrlParam: function (name) {//封装方法
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return window.decodeURIComponent(r[2]);
        return null; //返回参数值
    }
}