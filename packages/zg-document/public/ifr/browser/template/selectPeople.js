Msger()
    .regist('init', function () {

        Msger(window.above).emit('test', ['test1'])

        mini.parse()

        var col = [
            { type: "checkcolumn", width: "12px" },
            { type: "indexcolumn", width: "18px", header: "序号" },
            { field: "name", header: "姓名", width: "60px" },
            { field: "job", header: "现任职务", headerAlign: "center" },
        ]

        mini.get('all_people').setColumns(col)
        mini.get('selected_people').setColumns(col)
        mini.get('all_people').setMultiSelect(true)
        mini.get('selected_people').setMultiSelect(true)

        // 查询按钮事件绑定
        $('#search_btn').get(0).onclick = function () {
            api.searchPerson($('#search_input').get(0).value).then(function (data) {
                return JSON.parse(data).map(function (v) {
                    return {
                        name: v.A0101,
                        a00: v.MAINKEY,
                        job: v.TEXT
                    }
                })
            }).then(function (data) {
                mini.get('all_people').setData(data)
            })
        }


        // 添加按钮事件绑定
        $('#add_btn').get(0).onclick = function () {
            var data = mini.get('all_people').getSelecteds()
            if (!data || data.length === 0) return alert('请选择被添加人员')

            var map = mini.get("selected_people").getData().reduce(function (r, v) {
                r[v.a00] = true
                return r
            }, {})

            data = data.filter(function (v) { return !map[v.a00] }).map(function (v) {
                return {
                    name: v.name,
                    a00: v.a00,
                    job: v.job
                }
            })

            mini.get('selected_people').setData(
                mini.get('selected_people').getData().concat(data)
            )
            mini.get('all_people').deselectAll()
        }
        $('#del_btn').get(0).onclick = function () {
            var data = mini.get('selected_people').getSelecteds()
            if (!data || data.length === 0) alert('请选择需删除的人员')

            var map = data.reduce(function (r, v) {
                r[v.a00] = true
                return r
            }, {})

            mini.get("selected_people").setData(
                mini.get("selected_people").getData().filter(function (v) { return !map[v.a00] })
            )

        }

        // 取消按钮事件绑定
        $('#cancel_btn').get(0).onclick = function () {
            Msger(window.above).emit('close')
        }

        // 确定按钮事件绑定
        $('#ok_btn').get(0).onclick = function () {
            
            var data = mini.get('selected_people').getData()
            if (!data || data.length === 0) return alert('请选择需添加的人员')

            Msger(window.above).emit('addPeople', [data])
            Msger(window.above).emit('close')
        }
    })


var api = Api(function (ajax, reg) {
    return {
        //查询人员
        searchPerson: function (key, hasRM) {
            return ajax({
                type: 'get',
                data: {
                    "key": key,
                    "hasRM": 0
                },
                url: '/gbrm/tjkc/controller/tjkc/searchKcPerson'
            })
        }
    }
})

Shelf.done().then(function () {
    Msger().emit('init')
})