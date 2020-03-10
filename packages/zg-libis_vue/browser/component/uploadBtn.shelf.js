Shelf.define(
    { name: 'uploadBtn', path: './uploadBtn.shelf.html' },
    function () {
        var api = Api(function (ajax) {
            return {
                uploadFile: function (url, file, patch) {
                    var data = new FormData()

                    data.append('qquuid', Tool.newId()) // file 对象
                    data.append('qqtotalfilesize', file.size) // file 对象
                    data.append('qqfilename', file.name)
                    data.append('qqfile', file) // file 对象

                    if (patch && typeof patch === 'object') {
                        Object.keys(patch).forEach(function (key) {
                            var value = patch[key]
                            data.append(key, value)
                        })
                    }

                    return ajax({
                        processData: false,
                        contentType: false,
                        type: 'post',
                        url: url,
                        data: data
                    })
                },
                uploadMultiFile: function (url, files, patch) {
                    var data = new FormData()
                    
                    Array.prototype.forEach.bind(files)(function(file,i){
                        data.append('qquuid_'+i, Tool.newId()) // file 对象
                        data.append('qqtotalfilesize_'+i, file.size) // file 对象
                        data.append('qqfilename_'+i, file.name)
                        data.append('qqfile_'+i, file) // file 对象
                    })


                    if (patch && typeof patch === 'object') {
                        Object.keys(patch).forEach(function (key) {
                            var value = patch[key]
                            data.append(key, value)
                        })
                    }

                    return ajax({
                        processData: false,
                        contentType: false,
                        type: 'post',
                        url: url,
                        data: data
                    })
                },
            }
        })

        return {
            events: ['beforeUpload', 'uploadSuccess', 'uploadError'],
            render: function (props) {
                return {
                    url: props.url || '',
                    multiple:props.multiple || false,
                    max:props.max || 5,
                    accept: (props.accept || []).map(function (v) { return '.' + v }).join(',')
                }
            },
            init: function (cont) {
                var _this = this

                $(_this.root).find('.upload_file_input').get(0).onchange = function () {
                    var files = this.files
                    if (files.length > _this.data.max){
                        $(_this.root).find('.upload_label').get(0).innerText = '请选择文件'
                        return alert('上传文件数量不能超过 '+  _this.data.max + ' 个！') 
                    }else if (files[0]) {
                        $(_this.root).find('.upload_label').get(0).innerText = Array.prototype.map.bind(files)(function(v){return v.name}).join(',')
                    } else {
                        $(_this.root).find('.upload_label').get(0).innerText = '请选择文件'
                    }
                }

                $(_this.root).find('.upload_btn').get(0).onclick = function () {
                    var files =  $(_this.root).find('.upload_file_input').get(0).files
                    var file = files[0]
                    var patch = {}

                    if (!file) return alert('请选择文件')

                    if(_this.data.multiple){

                        patch = _this.send('beforeUpload', [files])

                        if (patch || patch === undefined) {
                            api.uploadMultiFile(_this.data.url, files, patch).then(function (d) {
                                _this.send('uploadSuccess', [d])
                            }).catch(function (e) {
                                _this.send('uploadError', [e])
                            })
                        }
                    }else{
                        patch = _this.send('beforeUpload', [file])

                        if (patch || patch === undefined) {
                            api.uploadFile(_this.data.url, file, patch).then(function (d) {
                                _this.send('uploadSuccess', [d])
                            }).catch(function (e) {
                                _this.send('uploadError', [e])
                            })
                        }
                    }

                   
                }
            },
            outer: {}
        }
    })