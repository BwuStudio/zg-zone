
Shelf.define({
    name: 'mutiUpload',
    path: './mutiUpload.shelf.html'
}, function () {
    function chineseNum(num) {
        var arr = [null, '一', '二', '三', '四', '五', '六', '七', '八', '九']
        var arr1 = ['', '十', '百', '千']

        var n = num.toString().split('')

        return n.reverse()
            .map(function (v, i) {
                var w = arr1[i]
                var s = arr[v]
                return s ? (s + w) === "一十" ? '十' : (s + w) : null
            })
            .filter(function (v) { return v })
            .reverse()
            .join('')
    }

    var api = Api(function (ajax) {
        return {
            getContainerId: function (name) {
                return ajax({
                    url: '/filemanage/fileUpload/controller/FileUpload/getFileType?name=' + encodeURIComponent(name),
                    type: 'get'
                }).then(function (d) {
                    var data = d || []
                    // 判断是否存在嵌套结构
                    var isList = d.find(function (v) { return v.PID }) ? false : true
                    var map = {}
                    var arr = []
                    data.forEach(function (v) {
                        if (map[v.CID])
                            map[v.CID].title = v.CATALOGNAME
                        else
                            map[v.CID] = { cid: v.CID, title: v.CATALOGNAME }

                        if (!v.ISUPLOAD)
                            arr.push(map[v.CID])
                        else if (!map[v.PID])
                            map[v.PID] = { cid: v.PID, children: [map[v.CID]] }
                        else if (map[v.PID] && map[v.PID].children)
                            map[v.PID].children.push(map[v.CID])
                        else if (map[v.PID] && (!map[v.PID].children))
                            map[v.PID].children = [map[v.CID]]

                    })
                    return [isList, arr]
                })
            },
	        isHasFile:function (type,rid) {
	            return ajax({
	                url: '/filemanage/fileUpload/controller/FileUpload/isHasFile?type=' +type+'&rid='+rid,
	                type: 'get'
	            })
	        }
        }
    })

    function translateList(list) {

    }

    function translateTree(tree, showTitleIndex) {
        var res = []
        var tIdx = 1
        var mIdx = 1

        function walk(item) {
            if (item.children) {
                res.push({ title: (showTitleIndex ? (chineseNum(tIdx++) + '、') : '') + item.title })
                item.children.forEach(function (v) { walk(v) })
            } else {
                res.push({ title: (mIdx++) + '. ' + item.title, cid: item.cid })
            }
            return res
        }

        tree.forEach(function (v) { walk(v) })
        
        
        if(tree.length === 1){
        	res.shift()
        }
        return res
    }


    return {
        render: function (props) {
            var _this = this
            var recordId = props.rid
            var type = props.type
            var isReadonly = props.isReadonly || false
            var titleWidth = props.titleWidth || 250
            var batchDownload = props.batchDownload || false

            var showTitleIndex = props.showTitleIndex === false?false:true
            setTimeout(function () {
                api.getContainerId(type).then(function (v) {
                    if (!v[0]) {
                        _this.data.list = translateTree(v[1],showTitleIndex)
                        _this.update()
                    }
                })
            })

            return {
                recordId: recordId,
                titleWidth: titleWidth,
                type: type,
                isReadonly:isReadonly,
                batchDownload:batchDownload,
                list: []
            }
        },
        init: function () {
            var _this = this

            _this.data.list.forEach(function (v) {
                if (!v.cid) return

                Shelf.get('upload')(
                    $('.mu_cntr_' + v.cid).get(0), {
                    rid: _this.data.recordId,
                    cid: v.cid,
                    isReadonly:_this.data.isReadonly,
                }
                )
            })


            $(_this.root).find('.upload_btn').get().forEach(function(v){
                v.onclick = function(){
                	var rid = _this.data.recordId;
                	var type =  window.encodeURIComponent(_this.data.type)
                	api.isHasFile(type,rid).then(function(data){
                		if(data === 'true'){
                			window.open('/filemanage/fileUpload/controller/FileUpload/fileDownLoadAll?rid='+rid+'&type='+ type);
                		}else{
                			alert('没有文件可以下载');
                		}
                	})
                }
            })
        }
    }
})
