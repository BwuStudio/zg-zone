// 引入koa
const koa = require('koa');
const path = require('path')
const static = require('koa-static');


const app = new koa();


var cors = require('koa2-cors');
app.use(cors());

// 配置静态web服务的中间件
app.use(static(path.resolve(__dirname, './')));
// 监听端口
app.listen(3001, function () {
    console.log('启动成功');
})


function transfrom(array) {
    array.forEach(function (v) {
        if (v.BZ && v.BZ.indexOf('老工勤')>= 0) {
            v.Order = 0
            return
        }
        if (v.BZ && v.BZ.indexOf('职工') >= 0) {
            v.Order = 1
            return
        }
        if (v.BZ && v.BZ.indexOf('公务员') >= 0) {
            v.Order = 2
            return
        }
        if (v.Text && v.Text.indexOf('下属事业单位') >= 0) {
            v.Order = 3
            return
        }
        if (v.Text && v.Text.indexOf('下设单位') >= 0) {
            v.Order = 4
            return
        }
        if (v.Text && v.Text.indexOf('本级人员') >= 0) {
            v.Order = 5
            return
        }
    
        v.Order = 6
    })

    var map = {}

    var arr = []

    array.forEach(function (v) {
        
        if (v.PidStr && map[v.PidStr])
            map[v.PidStr].children.push(v)
        else if (v.PidStr) map[v.PidStr] = { children: [v] }
        else arr.push(v)
        
        if (map[v.BidStr]) {
            v.children = map[v.BidStr].children
            map[v.BidStr] = v
        } else {
            map[v.BidStr] = v
            map[v.BidStr].children = []
        }

    })

    arr = map['00000000-0000-0000-0000-000000000000'].children.concat(arr)

    function sort(arr){
        
        arr.forEach(function(v){
            if(v.children) v.children = sort(v.children)
        })

        return arr.sort(function(a,b){ return b.Order - a.Order })
    }

    return sort(arr)
}
var a = new FormData()
a.append('data', JSON.stringify({ "BZ": "1,6,7" }))

fetch('/RSGL/Report/GetOrgBianZhiList.do', {
    method: "post",
    body: a
}).then(function (d) {
    return d.json()
}).then(function (v) {
    var m = transfrom(v)
    console.log(m)
    mini.get('TreeGrid').loadData(m)
})


// https://github.com/Microsoft/TypeScript/wiki/Roadmap

// 沙盘推演首页人员变化添加红色标识
// 沙盘推演首页添加记录状态数据功能
// 沙盘推演解决数据更新后显示异常 bug
// 沙盘推演解决第三方文件改写 Array.prototype 问题
// 沙盘推演拖拽数据修改
// 沙盘推演修改党副书记显示状态
// 沙盘推演将记录的数据改为现状数据
// 沙盘推演添加转置表格
// 沙盘推演拖拽单位数据取值错误修改
// 沙盘推演添加新页面显示变化后数据



// 协助 7.0 产品模块前端迁移
// 搭建 7.0 组件/模板展示项目
// 搭建 7.0 组件/模板展示项目
// 7.0产品 模板，通用组件页面整理
// 7.0产品 模板，通用组件页面整理