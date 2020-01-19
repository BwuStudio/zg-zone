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
        // 初始化下拉列表
        popList = Shelf.get('menuBtn')(
            document.getElementById('output_btn'),{
            text:'输出',
            list:[
                { id: "dsf12312321", text: '案说法' },
                { id: "fds12312321", text: '范德萨' },
                { id: "asd12312321", text: '格勒恩' }
            ],
            width:100
        })
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
