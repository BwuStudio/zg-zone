var table = {
    data: [],
    load: function (data) {
        this.data = data || []
        this.render()
    },
    getTarget: function () {
        return $('#table-list').get(0)
    },

    render: function () {
        var _this = this
        var t = _this.getTarget()
        var tr1 = $(t).find('.control_width').get(0)
        var tr2 = $(t).find('.table_head').get(0)
        // 初始化视图    
        t.innerHTML = ''

            ;
        // 添加列头和表格数据
        [tr1, tr2].concat(
            _this.data.map(function (v, i) {
                return _this._trRender(v, i)
            })
        ).reduce(function (r, v) {
            r.appendChild(v)
            return r
        }, t)

    },
    // 行渲染
    _trRender: function (data, index) {
        var template = $('#table-line').get(0).innerHTML

            
        return Dom(template
            .replace('${index}', index + 1)
            .replace('${name}', data.name)
            .replace('${img_src}', data.img)
            .replace('${href}', data.a00)
            .replace('${removeType}', data.removeType)
            .replace('${takeType}', data.takeType)
            .replace('${matter}', data.matter)
            .replace('${duty}', data.name), function (dom) {
                data.flow.map(function (v) {
                    return (v.detail
                        ? Dom('<div><div>${name}</div><div>${detail}</div></div>'
                            .replace("${name}", v.name)
                            .replace("${detail}", v.detail.time + (v.detail.note ? (',' + v.detail.note) : v.detail.note)))
                        : Dom('<div>${name}</div>'.replace("${name}", v.name))
                    )
                }).reduce(function (r, v) {
                    r.appendChild(v)
                    return r
                }, $(dom).find('.user_flow').get(0))

                    ;
                [
                    Dom('<a class="block_btn">任免纪实</a>', function (a) {
                        a.onclick = function () {
                            alert('任免纪实')
                        }
                    }), Dom('<a class="block_btn">流程调整</a>', function (a) {
                        a.onclick = function () {
                            alert('流程调整')
                        }
                    })
                ].reduce(function (r, v) {
                    r.appendChild(v)
                    return r
                }, $(dom).find('.user_btns').get(0))
            })
    }
}



// 声明所有从后台调用的 api
var api = Api(function (ajax) {
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
        // 加载表格数据
        table.load([
            {
                name: '张三',//名字
                a00: '',
                removeType: '', //免职类型
                takeType: '', //任职类型
                duty: '',//现任职务
                matter: '',//拟任免事项
                flow: [ //考察流程
                    {
                        name: '部长办公会',
                        detail: {
                            time: '2016-01-10',
                            note: '同意同意同意同意同意同意同意同意'
                        }
                    },
                    {
                        name: '部长办公会',
                        detail: {
                            time: '2016-01-10',
                            note: '同意同意同意同意同意同意同意同意'
                        }
                    }, {
                        name: '任职谈话',
                        detail: null
                    }, {
                        name: '任职',
                        detail: null
                    }, {
                        name: '宣布',
                        detail: null
                    }, {
                        name: '工资',
                        detail: null
                    }, {
                        name: '归档',
                        detail: null
                    },
                ]
            }
        ])
    })

// eg: 当页面加载完成的时候调用 init 事件
Shelf.done().then(function () {
    Msger().emit('init')
})

var a = document.createElement('button')

a.onclick = function () {
    Shelf.get('detailSelect').lazy('ZB02', function (d) { alert(d) })
}

