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
        var a = Shelf.get('tabBtnSider')(
            $('.sider').get(0), {
                itemClick: function (a) {
                    alert(a.id)
                },
                tabs: [{
                    id: 'bwh',
                    title: '部务会',
                    btns: [
                        {
                            text: '按钮1', call: function () {
                                alert('按钮1')
                            }
                        },
                        {
                            text: '按钮2', call: function () {
                                alert('按钮1')
                            }
                        }],
                    list: []
                }]
            }
        )

        // 加载数据列表
        a.emit('loadList', [
            'bwh',
            [
                { id: 'testse1', text: 'teaetawtw' },
                { id: 'testse2', text: 'teaetawtw' },
                { id: 'testse3', text: 'teaetawtw' },
                { id: 'testse4', text: 'teaetawtw' },
                { id: 'testse5', text: 'teaetawtw' },
                { id: 'testse6', text: 'teaetawtw' },
                { id: 'testse7', text: 'teaetawtw' },
                { id: 'testse8', text: 'teaetawtw' },
                { id: 'testse9', text: 'teaetawtw' },
                { id: 'testse10', text: 'teaetawtw' },
                { id: 'testse11', text: 'teaetawtw' }
            ]
        ])


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
