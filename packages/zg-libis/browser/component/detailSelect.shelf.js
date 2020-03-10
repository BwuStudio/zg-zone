
Shelf.define({
    name: 'detailSelect',
    path: './detailSelect.shelf.html',
    static: {
        lazy: function (table, save) {
            var win = null
            var c = window.top.Shelf.get('detailSelect')(
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
                title: '选择代码表',
                width: 360,
                height: 480
            })
            return win
        },
        list: function (table, save) {
            var win = null
            var c = Shelf.get('detailSelect')(
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
        },
        input: function (dom, table) {

            var id = dom.id || (dom.id = Tool.newId())
            dom.className += ' mini-autocomplete gb_form'
            dom.style.width = dom.style.width || 'auto'
            mini.parse(dom)
            var t = mini.get(id)
            t.setUrl('/formdesign/form/CodeTable/getSelectValue?tableName=' + table)
            t.setDataField('Data')
            t.setValueField('DMCOD')
            t.setTextField('DMCPT')
            t.onValueChanged(function (c) {
                if (c.selected) {
                    set(c.selected)
                } else {
                    set({
                        DMCOD: '',
                        DMCPT: ''
                    })
                }
            })

            var DMCOD = ''
            var DMCPT = ''
            var change = function (t) { }
            function set(c) {
                if (!c) return
                DMCOD = c.DMCOD
                DMCPT = c.DMCPT

                t.setText(DMCPT)
                t.setValue(DMCOD)

                change({
                    DMCOD: DMCOD,
                    DMCPT: DMCPT
                })
            }

            function get() {
                return {
                    DMCOD: DMCOD,
                    DMCPT: DMCPT
                }
            }

            document.getElementById(id).ondblclick = function () {
                Shelf.get('detailSelect').lazy(table, function (v) {
                    if (v) set(v)
                })
            }

            $('#' + id + ' > span').get().forEach(function (v) {
                v.style.background = '#FFF6E0'
            })

            return {
                getValue: get,
                setValue: set,
                disable: function () {
                    t.disable()
                    document.getElementById(id).dataondblclick = null
                },
                onchange: function (fn) {
                    change = fn || change
                }
            }

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
    var table = ''
    var node = null

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

            // 设置获取所有节点的函数
            all = props.all === 'lazy' ? function (_mini) {
                _mini.setDataField('Data')
                setTimeout(function () {
                    _mini.setUrl('/formdesign/form/CodeTable/SelectGERENSHENFEN?tableName=' + table)
                });
            } : props.all ? function (_mini) {
                props.all().then(function (v) { _mini.loadData(v) })
            } : props.setTree ? props.setTree : function (_mini) {
                api.searchWithKey(table, '').then(function (v) { _mini.loadData(v) })
            }
            // 模糊查询的函数
            find = function (_mini, str) {
                var s = props.find || api.searchWithKey
                s(table, str).then(function (v) { mini.get('detail_select_tree').loadData(v) })
            }
            return {}
        },
        init: function (cont) {
            mini.parse(cont)

            var tree = mini.get('detail_select_tree')

            all(tree)

            tree.on('nodeClick', function (a) {
                if (a.node.selectable === 'false') return
                node = a.node
                $(cont).find('textarea').get(0).innerHTML = node[tree.getTextField()]
            })

            $(cont).find('.ds-save_btn').get(0).onclick = function () {
                if (!node && confirm('是否清除已选项？')) {
                    update({
                        DMCOD: '',
                        DMCPT: ''
                    })
                    close()
                }
                else {
                    update(node)
                    close()
                }
            }
            $(cont).find('.ds-cancel_btn').get(0).onclick = function () {
                close()
            }

            $(cont).find('.ds-search').get(0).onkeydown = throttle(function () {
                var v = this.value
                if (!$.trim(v)) {
                    all(mini.get('detail_select_tree'))
                } else {
                    find(mini.get('detail_select_tree'), v)
                }
            }, 400)
        }
    }
})
