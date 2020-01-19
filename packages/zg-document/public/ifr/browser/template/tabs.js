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

// 全局事件管理
var event = Msger()
    .regist('init', function () {
        Shelf.get('simpleTabs')(
            $('.globe').get(0), {
            theme: 'line',
            pages: [{
                title: '任免分组',
                id: 'rmf',
                target: $('#panel1').get(0),
            }, {
                title: '任免分组',
                id: 'rmfz',
                target: $('#panel2').get(0),
            }, {
                title: '任免分组',
                id: 'rmfz3',
                target: $('#panel3').get(0),
            }]
        })
        Shelf.get('simpleTabs')(
            $('#panel3').get(0), {
            theme: 'fill_panel',
            pages: [{
                title: '任免分组',
                id: 'rmf',
                target: $('#panel4').get(0),
            }, {
                title: '任免分组',
                id: 'rmfz',
                target: $('#panel5').get(0),
            }]
        })

        mini.parse($('#datagrid1').get(0))
    })
    .regist('reflash', function () {

    })
    .regist('saveInfo', function () {

    })
    .regist('deletePerson', function () {

    })

// eg: 当页面加载完成的时候调用 init 事件
Shelf.done().then(function () {
    event.emit('init')
})
