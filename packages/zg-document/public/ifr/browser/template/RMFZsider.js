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
        mini.parse($('#datagrid1').get(0))
        // 初始化下拉菜单按钮
        Shelf.get('menuBtn')(
            $('#output_btn').get(0), {
                text: '输出',
                list: [
                    { id: "dsf12312321", text: '案说法' },
                    { id: "fds12312321", text: '范德萨' },
                    { id: "asd12312321", text: '格勒恩' }
                ],
                width: 100
            })
        // 初始化左侧 sider
        var a = Shelf.get('rmfzSider')(
            $('.sider').get(0), {
                btns: {
                    up: function () { alert('up') },
                    down: function () { alert('down') },
                    show: function () { alert('show') },
                    set: {
                        list: [
                            { id: 'da', text: '新建' },
                            { id: 'da', text: '编辑' },
                            { id: 'da', text: '删除' }
                        ],
                        click: function (a) {
                            alert(a.text)
                        }
                    }
                },
                itemClick: function (a) {
                    alert(a.id)
                }
            }
        )
        
        // 加载数据列表
        a.emit('loadList', [
            [
                { id: 'q', text: '测试分组1', isChild: false, num: 12 },
                { id: 'w', text: '测试分组2', isChild: true, num: 12 }, 
                { id: 'e', text: '测试分组2', isChild: true, num: 12 }, 
                { id: 'r', text: '测试分组2', isChild: false, num: 12 },
                { id: 't', text: '测试分组2', isChild: false, num: 12 },
                { id: 'y', text: '测试分组2', isChild: true, num: 12 },
                { id: 'u', text: '测试分组1', isChild: false, num: 12 },
                { id: 'i', text: '测试分组2', isChild: true, num: 12 }, 
                { id: 'o', text: '测试分组2', isChild: true, num: 12 }, 
                { id: 'a', text: '测试分组2', isChild: false, num: 12 },
                { id: 's', text: '测试分组2', isChild: false, num: 12 },
                { id: 'd', text: '测试分组2', isChild: true, num: 12 }
            ]
        ])

        // 手动选择一个节点
        a.emit('select', ['e'])


        // 取消选择所有节点
        a.emit('select', [null])

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
