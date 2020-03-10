// 声明所有从后台调用的 api
var api = Api(function (ajax, reg) {
    return {
        getPersonList: function () {
            return ajax({
                type: 'get',
                url: '/gbrm/api/getPersonList'
            })
        },
        getPersonDetail: function () {
            return ajax({
                type: 'get',
                url: '/gbrm/api/getPersonList'
            })
        }
    }
})

var warning = {
    list: [
        ['退休人员', 16, true],
        ['推荐考察提醒', 1, true],
        ['干部调配划转意见提醒', 7, false],
        ['干部调配审核提醒', 4, false],
        ['公务员登记审核提醒', 4, false],
        ['因公出国境审核提醒', 5, false]
        // ['因私出国境审核提醒', 3, false]
    ],
    render: function () {
        var ol = $('#warning').get(0)
        ol.innerHTML = this.list.map(function (v) {
            return '<li style="height:16.66%;line-height:20px;">${text} (${num})</li>'.replace('${text}', v[0]).replace('${num}', v[1])
        }).join('')
    }
}

var announce = {
    list: [
        ['中共中央印发《中国共产党党内法规制定条例》', '2023-03-02'],
        ['中共中央印发《中国共产党问责条例》', '2023-03-02'],
        ['中共中央印发三部党内法规(全文)', '2023-03-02'],
        ['中共中央办公厅印发《党政领导干部考核工作条例》', '2023-03-02'],
        ['中共中央印发《中国共产党农村工作条例》', '2023-03-02'],
        ['中共中央办公厅印发《关于贯彻实施公务员法建设高素质专业化公务员队伍的意见》', '2023-03-02']
        // ['中共中央印发《关于认真学习宣传贯彻党的十八大精神的通知》', '2023-03-02']
    ],
    render: function () {
        var ol = $('#announce').get(0)
        ol.innerHTML = this.list.map(function (v) {
            return '<li style="padding-right:100px;height:16.66%;line-height:20px;">${text} <div style="height:100%;width:90px;position:absolute;top:0;right:0;color:rgb(164,166,171);font-size:13px;">${time}</div></li>'.replace('${text}', v[0]).replace('${time}', v[1])
        }).join('')
    }
}

var standingBook = {
    left: [
        ['少数民族干部'],
        ['非中共干部'],
        ['35岁一下市管干部'],
        ['35岁到40岁市管干部'],
        ['40岁到45岁市管干部'],
        ['45岁到50岁市管干部'],
        ['50岁到55岁市管干部'],
        ['55岁到60岁市管干部'],
        ['动议管理'],
        ['玄武区人大']
    ],
    right: [
        ['青龙县委名册'],
        ['女，在任干部'],
        ['宣武区名册'],
        ['市财政局名册'],
        ['京州市名册'],
        ['市委秘书长名册'],
        ['市委秘书名册'],
        ['女，在任条件名称'],
        ['动议管理'],
        ['玄武区人大名册']
    ],
    render: function () {

        var _this = this
        var left = $('#book-left').get(0)
        left.innerHTML = this.left.map(function (v, i) {
            return '<li style="padding-right:100px"><span>${text}</span> <div class="home-book-index">${time}</div></li>'.replace('${text}', v[0]).replace('${time}', i + 1)
        }).join('')

        var right = $('#book-right').get(0)
        right.innerHTML = this.right.map(function (v, i) {
            return '<li style="padding-right:100px"><span>${text}</span> <div class="home-book-index">${time}</div></li>'.replace('${text}', v[0]).replace('${time}', _this.left.length + i + 1)
        }).join('')
    }
}

var todo = {
    all: 32,
    em: 23,
    render: function () {
        $('#all-todo-num').get(0).innerHTML = this.all
        $('#em-todo-num').get(0).innerHTML = this.em
    }
}

var shotcut = {
    list: [
        ['新建人员','icon-renzhi'],
        ['人员浏览','icon-renzhi'],
        ['单位管理','icon-renzhi'],
        ['查询分析','icon-renzhi'],
        ['任职跟踪','icon-renzhi']
    ],
    render: function () {
        var ol = $("#shotcut").get(0)
        ol.display = 'table'
        ol.innerHTML = this.list.map(function (v, i) {
            return '<li style="display:table;height:20%;"><div style="vertical-align: middle;display:table-cell;text-align: center;line-height:1.3"><i style="font-size:44px;color:rgb(0,89,156)" class="iconfont ${icon}"></i><br>${text}</div></li>'.replace('${text}', v[0]).replace('${icon}', v[1])
        }).join('')
    }

}

// 全局事件管理
var event = Msger()
    .regist('init', function () {
        [warning, announce, standingBook, todo,shotcut].forEach(function (v) {
            v.render()
        })
    })

Shelf.done().then(function () {
    Msger().emit('init')
})