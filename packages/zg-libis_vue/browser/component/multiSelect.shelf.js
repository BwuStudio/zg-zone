
Shelf.define({
    name: 'multiSelect',
    path: './multiSelect.shelf.html',
    static: {
        lazy: function (table, save, data,parentSelect) {
            var win = null
            var c = window.top.Shelf.get('multiSelect')(
                Dom('<div style="height:100%"></div>'),
                {
                    // 查的表
                    table: table,
                    all: 'lazy',
                    // 数据更新的方法
                    update: function (d) {
                        if (save) save(d)
                    },
                    // 关闭弹窗的方法
                    close: function () {
                        if (win) win.emit('close')
                    },
                    nodes:data||[],
                    parentSelect :parentSelect
                }
            )
            win = Shelf.get('modal').open(c.root, {
                title: '选择代码表',
                width: 360,
                height: 480
            })

            return win
        },
        list: function (table, save) {
            var win = null
            var c = Shelf.get('multiSelect')(
                Dom('<div style="height:100%"></div>'),
                {
                    // 查的表
                    table: table,
                    all: 'lazy',
                    // 数据更新的方法
                    update: function (d) {
                        if (save) save(d)
                    },
                    // 关闭弹窗的方法
                    close: function () {
                        if (win) win.emit('close')
                    }
                }
            )
            win = Shelf.get('modal').open(c.root, {
                width: 360,
                height: 480
            })

            return win
        }
    }
}, function () {
    // 节流函数
    function throttle(fn, delay) {
        var timeout = null
        var PromiseRes = []
        return function () {
            var _this = this
            return new Promise(function (res) {
                PromiseRes.push(res)

                if (timeout) clearTimeout(timeout)

                timeout = setTimeout(function () {
                    fn.call(_this, arguments)
                    PromiseRes.forEach(function (v) { if (v) v() })
                    PromiseRes = []
                    timeout = null
                }, delay)
            })
        }
    }


    var all = function () { return new Promise(function (res) { res([]) }) }
    var find = function () { return new Promise(function (res) { res([]) }) }
    var close = function () { }
    var update = function () { }
    var parentSelect = false
    var table = ''
    var nodes =[]

    var api = Api(function (ajax) {
        return {
            searchWithKey: function (table, key) {
                return ajax({
                    type: 'post',
                    url: '/formdesign/form/CodeTable/getSelectValue?tableName=' + table,
                    data: { key: key }
                })
            }
        }
    })

    return {
        render: function (props) {
            close = props.close || close
            update = props.update || update
            table = props.table || table
            nodes = props.nodes || nodes
            parentSelect = props.parentSelect || parentSelect

            // 设置获取所有节点的函数
            all = props.all === 'lazy' ? function (_mini) {
                _mini.setDataField('Data')
                _mini.setUrl('/formdesign/form/CodeTable/SelectGERENSHENFEN?tableName=' + table)
            } : props.all ? function (_mini) {
                props.all().then(function (v) { _mini.loadData(v) })
            } : props.setTree ? props.setTree : function (_mini) {
                api.searchWithKey(table, '').then(function (v) { _mini.loadData(v) })
            }
            // 模糊查询的函数
            find = function (_mini, str) {
                var s = props.find || api.searchWithKey
                s(table, str).then(function (v) { mini.get('multi_select_tree').loadData(v) })
            }
            return {
                canSelectParentNode:parentSelect
            }
        },
        init: function (cont) {
            mini.parse(cont)

            var tree = mini.get('multi_select_tree')


            $(cont).find('textarea').get(0).innerHTML = nodes.map(function (v) { return v.DMCPT }).join(',')

            tree.on('load', function (a) {
                a.data.filter(function (v) {
                    return nodes.find(function (c) {
                        return c.DMCOD === v.DMCOD
                    })
                }).forEach(function (v) {
                    tree.checkNode(v)
                })
            })

            all(tree)


            $(cont).find('.ds-cancel_btn').get(0).onclick = function () {
                close()
            }

            tree.setShowCheckBox(true)

            tree.on('nodeCheck', function (a) {
                // if (a.isLeaf === false) return
                if (a.node.checked && (!nodes.find(function (v) { return v.DMCOD === a.node.DMCOD }))) {
                    nodes.push(a.node)
                } else if (!a.node.checked) {
                    nodes = nodes.filter(function (v) { return v.DMCOD !== a.node.DMCOD })
                }
                $(cont).find('textarea').get(0).innerHTML = nodes.map(function (v) { return v.DMCPT }).join(',')
            })



            $(cont).find('.ds-save_btn').get(0).onclick = function () {
                update(nodes)
                close()
            }

            $(cont).find('.ds-search').get(0).onchange = function () {
                var v = this.value
                var pro = null
                if (!$.trim(v)) {
                    pro = all(mini.get('detail_select_tree'))
                } else {
                    pro = find(mini.get('detail_select_tree'), v)
                }

                if (pro) {
                    pro.then(function () {
                        var map = nodes.reduce(function (a, b) { a[b.DMCOD] = true; return a }, {})

                        tree.getList().filter(function (v) { return map[v.DMCOD] }).forEach(function (v) {
                            tree.checkNode(v)
                        })
                    })
                }


            }

            // tree.on('nodeClick', function (a) {
            //     // if (a.node.children || a.node.isLeaf === 'false'  ) return
            //      node = a.node
            //      $(cont).find('textarea').get(0).innerHTML = node[tree.getTextField()]
            //  })

            //  $(cont).find('.ds-save_btn').get(0).onclick = function () {
            //      if (!node) return alert('请选择子节点')
            //      else {
            //          update(node)
            //          close()
            //      }
            //  }
            // $(cont).find('.ds-search').get(0).onkeydown = throttle(function () {
            //     var v = this.value
            //     if (!$.trim(v)) {
            //         all(mini.get('multi_select_tree'))
            //     } else {
            //         find(mini.get('multi_select_tree'), v)
            //     }
            // },400)
        }
    }
})
