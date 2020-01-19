
Shelf.define({
    name: 'upload',
    path: './upload.shelf.html', static: {
        createBtn: function () {
            var url = ''

        }
    }
}, function () {

    var api = Api(function (ajax) {
        return {
            getFileList: function (recordId, containerId) {
                if (containerId) {
                    return ajax({
                        url: '/filemanage/fileUpload/controller/FileUpload/getMultipleFiles?recordId=' + recordId + '&CID=' + containerId,
                        type: 'get'
                    }).then(function (a) {
                        return (a || []).map(function (v) {
                            return {
                                name: v.FILENAME,
                                fileId: v.FID
                            }
                        })
                    })
                } else {
                    return ajax({
                        url: '/filemanage/fileUpload/controller/FileUpload/getFiles?recordId=' + recordId,
                        type: 'get'
                    }).then(function (a) {
                        return (a || []).map(function (v) {
                            return {
                                name: v.FILENAME,
                                fileId: v.FID
                            }
                        })
                    })
                }

            },
            deleteFile: function (fid) {
                return ajax({
                    type: 'post',
                    url: '/filemanage/fileUpload/controller/FileUpload/deleteFile?fid=' + fid
                })
            },
            uploadFile: function (recordId, containerId, file) {

                var data = new FormData()
                data.append('recordId', recordId) // file 对象
                if (containerId) {
                    data.append('CID', containerId) // file 对象
                }
                data.append('qquuid', Tool.newId()) // file 对象
                data.append('qqtotalfilesize', file.size) // file 对象
                data.append('qqfilename', file.name || "dfsfdasfa.txt")
                data.append('qqfile', file) // file 对象

                return ajax({
                    processData: false,
                    contentType: false,
                    type: 'post',
                    url: '/filemanage/fileUpload/controller/FileUpload/fileUpload',
                    data: data
                })
            },
            downloadFile: function (fid) {
                window.open('/filemanage/fileUpload/controller/FileUpload/fileDownLoad?fid=' + fid)
            }

        }
    })



    return {
        render: function (props) {
            var _this = this
            var recordId = props.rid
            var containerId = props.cid || null
            var isReadonly = props.isReadonly || false

            setTimeout(function () {
                api.getFileList(recordId, containerId)
                    .then(function (list) {
                        _this.data.fileList = list || []
                        _this.update()
                    })
            });


            return {
                recordId: recordId,
                containerId: containerId,
                formId: Tool.newId('upload_form'),
                isReadonly: isReadonly,
                fileList: []
            }
        },
        init: function () {
            var _this = this

            var btnTemplate = $(_this.root).find('.template_btn').get(0).innerHTML

            $(_this.root).find('.template_btn').remove()

            function createBtn() {
                return Dom(
                    btnTemplate.replace(
                        /_formID_/g, Tool.newId('upload_btn_')
                    ).replace(
                        /_url_/g, '/filemanage/fileUpload/controller/FileUpload/fileUpload'
                    ),
                    function (v) {
                        $(v).find('.upload_file_input').get(0).onchange = function () {
                            api.uploadFile(_this.data.recordId, _this.data.containerId, $(v).find('.upload_file_input').get(0).files[0])
                                .then(function () {
                                    return api.getFileList(_this.data.recordId, _this.data.containerId)

                                }).then(function (list) {
                                    _this.data.fileList = list || []
                                    _this.update()
                                })
                        }
                    })
            }

            $(this.root).find('.upload_btn').get().forEach(function (v) {
                v.appendChild(createBtn())
            })

            $(this.root).find('.sf_upfile_download_btn').get().forEach(function (v) {
                var i = v.className.match(/item_index_(\d*)/)[1]
                v.onclick = function () {
                    api.downloadFile(
                        _this.data.fileList[i].fileId
                    )
                }
            })

            $(this.root).find('.sf_upfile_delete_btn').get().forEach(function (v) {
                var i = v.className.match(/item_index_(\d*)/)[1]
                v.onclick = function () {
                    if (window.confirm('确认删除文件 ' + _this.data.fileList[i].name + ' 吗?')) {
                        api.deleteFile(
                            _this.data.fileList[i].fileId
                        ).then(function () {
                            return api.getFileList(_this.data.recordId, _this.data.containerId)

                        }).then(function (list) {
                            _this.data.fileList = list || []
                            _this.update()
                        })
                    }

                }
            })

        }
    }
})
