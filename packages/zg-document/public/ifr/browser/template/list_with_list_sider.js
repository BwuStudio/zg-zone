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
        var a = Shelf.get('tabListSider')(
            $('.sider').get(0), {
                itemClick: function (a,tid) {
                    alert(a.id)
                    alert(tid)
                },
                tabChange:function(id){
                	alert(id)
                },
                tabs:[{
                    id:'bwh',title:'部务会'
                },{
                    id:'cwh',title:'党委会'
                }]
            }
        )

        // 加载数据列表
        a.emit('loadList', [
            'bwh',
            [
                { id: 'q', line1: '测试分组1', line2: 'skajfdska' },
                { id: 'w', line1: '测试分组2', line2: 'skajfdska' }, 
                { id: 'e', line1: '测试分组2', line2: 'skajfdska' }, 
                { id: 'r', line1: '测试分组2', line2: 'skajfdska' },
                { id: 't', line1: '测试分组2', line2: 'skajfdska' },
                { id: 'y', line1: '测试分组2', line2: 'skajfdska' },
                { id: 'u', line1: '测试分组1', line2: 'skajfdska' },
                { id: 'i', line1: '测试分组2', line2: 'skajfdska' }, 
                { id: 'o', line1: '测试分组2', line2: 'skajfdska' }, 
                { id: 'a', line1: '测试分组2', line2: 'skajfdska' },
                { id: 's', line1: '测试分组2', line2: 'skajfdska' },
                { id: 'd', line1: '测试分组2', line2: 'skajfdska' }
            ]
        ])

        a.emit('loadList', [
            'cwh',
            [
                { id: 'q', line1: '测试分组1', line2: 'skajfdska' },
                { id: 'w', line1: '测试分组2', line2: 'skajfdska' }, 
                { id: 'e', line1: '测试分组2', line2: 'skajfdska' }, 
                { id: 'r', line1: '测试分组2', line2: 'skajfdska' },
                { id: 't', line1: '测试分组2', line2: 'skajfdska' },
                { id: 'y', line1: '测试分组2', line2: 'skajfdska' },
                { id: 'u', line1: '测试分组1', line2: 'skajfdska' },
                { id: 'i', line1: '测试分组2', line2: 'skajfdska' }, 
                { id: 'o', line1: '测试分组2', line2: 'skajfdska' }, 
                { id: 'a', line1: '测试分组2', line2: 'skajfdska' },
                { id: 's', line1: '测试分组2', line2: 'skajfdska' },
                { id: 'd', line1: '测试分组2', line2: 'skajfdska' }
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
