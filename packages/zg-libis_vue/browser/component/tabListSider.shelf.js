Shelf.define(
    { name: 'tabListSider', path: './tabListSider.shelf.html' },
    function () {

        var selected = null
        var liTemplate = ''
        var ulTemplate = ''
        var itemClick = function () { }
        var tabChange = function () { }

        var tabs = []

        return {
            render: function (props) {
                itemClick = props.itemClick || itemClick
                tabChange = props.tabChange || tabChange


                tabs = props.tabs ? props.tabs.map(function (v) {
                    return $.extend(
                        {
                            id: "ed" + Math.floor(Math.random() * 100000),
                            title: ''
                        }, v)
                }) : []

                return {}
            },
            init: function () {
                var _this = this

                liTemplate = $(_this.root).find('.thmd_side-list').get(0).innerHTML
                ulTemplate = $(_this.root).find('.thmd_side-ul').get(0).innerHTML

                document.body.appendChild($(_this.root).find('.thmd_Sider_style').get(0))

                tabs.forEach(function (v) {
                    v.target = Dom(ulTemplate)
                })

                Shelf.get('simpleTabs')(
                    _this.root,
                    {
                        bgColor: 'rgb(239, 245, 250)',
                        isCross: true,
                        pages: tabs,
                        tabChange:tabChange
                    }
                )
            },
            outer: {
                loadList: function (id, arr) {
                    var tab = tabs.find(function (v) { return v.id === id })
                    if (!tab) return
                    var bwh = tab.target
                    var bwhli = arr || []

                    bwh.innerHTML = ''
                    bwhli = bwhli.map(function (v) {
                        return $.extend(v, {
                            dom: Dom(liTemplate
                                .replace('_line1_', v.line1)
                                .replace('_line2_', v.line2)
                            )
                        })
                    }).map(function (v) {
                        v.dom.onclick = function () {
                            if (itemClick) { itemClick(v, tab.id) }
                            selected = v
                            tabs.forEach(function (v) {
                                $(v.target).find('.selected').get().forEach(function (v) { v.className = '' })
                            })
                            if (selected) selected.dom.className = 'selected'
                        }
                        bwh.appendChild(v.dom)
                        return v
                    })
                },

                getSelected: function () {
                    return selected || null
                }
            }
        }
    })