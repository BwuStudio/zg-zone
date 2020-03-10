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

        Shelf.get('simpleTabs')(
            $('#tabs').get(0), {
                height:'auto',
                pages: [{
                    title: '部务会',
                    id: 'bwh',
                    target: $("#a").get(0),
                }, {
                    title: '常务会',
                    id: 'cuh',
                    target: $("#b").get(0),
                }, {
                    title: '二级多类型上传组件',
                    id: 'ccc',
                    target: $("#c").get(0),
                }, {
                    title: '一级多类型上传组件',
                    id: 'ccc',
                    target: $("#d").get(0),
                }]
            }
        )

        Shelf.get('upload')(
            $('#upload').get(0),{
                rid:'EAC1E0A3-23C0-432F-B93C-A78444F70601'
            }
        )

        Shelf.get('mutiUpload')(
            $('#mutiUpload').get(0),{
                rid:'48683F44-483D-42F8-ACA0-B528A9375F9B',
                type:'干部任免-个人材料'
            }
        )


    })

// eg: 当页面加载完成的时候调用 init 事件
Shelf.done().then(function () {
    event.emit('init')
})
