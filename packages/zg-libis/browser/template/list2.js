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
Msger()
    .regist('init', function () {
        mini.parse($('#datagrid1').get(0))

        window.uploadBtn = Shelf.get('uploadBtn')(
            document.getElementById('upload_btn'),{
                url:'/upload',
                accept:['txt','dll'],
                multiple:true,
            }).regist('beforeUpload',function(file){
                if(file.size >= 2884570){
                    alert('文件过大')
                    return false
                }else{
                    return {
                        syhj:document.getElementById('syhj').value
                    }
                }
            }).regist('uploadSuccess',function(data){
                alert(data)
            }).regist('uploadError',function(e){
                alert("上传失败" )
                console.log(e)
            })

        // 初始化下拉列表
        popList = Shelf.get('menuBtn')(
            document.getElementById('output_btn'), {
                text: '测试',
                list: [
                    { id: "modal", text: '测试弹窗' },
                    { id: "detailSelect", text: '测试代码表' }
                ],
                width: 150,
                itemClick: function (i) {
                    switch (i.id) {
                        case 'modal':
                            Shelf.get('modal').open(
                                '/gbrm/template/list.html'
                            )
                            break
                        case "detailSelect":
                            Shelf.get('detailSelect').lazy(
                                'ZB02',
                                function (a) { alert(a.DMCOD) }
                            )
                    } 
                }
            })
    })

// eg: 当页面加载完成的时候调用 init 事件
Shelf.done().then(function () {
    Msger().emit('init')
})

var a = document.createElement('button')

a.onclick = function(){
	Shelf.get('detailSelect').lazy('ZB02',function(){})
}

