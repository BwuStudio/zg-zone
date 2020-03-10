Shelf.define(
    { name: 'thmdSider', path: './thmdSider.shelf.html' },
    function () {
        var upClick = function () { }
        var downClick = function () { }
        var setClick = function () { }
        var setList = []
        var showClick = function () { }

        var cwh = null
        var bwh = null
        var cwhli = []
        var bwhli = []
        var liTemplate = ''

        var itemClick = function () { }

        return {
            render: function (props) {
                var btns = props.btns || {}
                var set = btns.set || {}

                itemClick = props.itemClick || itemClick

                upClick = btns.up || upClick
                downClick = btns.down || downClick
                showClick = btns.show || showClick


                setClick = set.click || setClick
                setList = set.list || setList

                return {}
            },
            init: function () {
                var _this = this
                cwh = $(_this.root).find('.thmd_side_cwh-list').get(0)
                bwh = $(_this.root).find('.thmd_side_bwh-list').get(0)

                liTemplate = $(_this.root).find('.thmd_side-list').get(0).innerHTML

                Shelf.get('simpleTabs')(
                    _this.root,
                    {
                        bgColor: 'rgb(239, 245, 250)',
                        isCross: true,
                        pages: [{
                            title: '部务会',
                            id: 'bwh',
                            target: bwh,
                        }, {
                            title: '常务会',
                            id: 'cuh',
                            target: cwh,
                        }]
                    }
                )
            },
            outer: {
                loadList: function (arr,arr1) {
                    bwhli = arr || []
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
                            if (itemClick) { itemClick(v) }
                        }
                        bwh.appendChild(v.dom)
                        return v
                    })

                    cwhli = arr1 || []
                    cwh.innerHTML = ''
                    cwhli = cwhli.map(function (v) {
                        return $.extend(v, {
                            dom: Dom(liTemplate
                                .replace('_line1_', v.line1)
                                .replace('_line2_', v.line2)
                            )
                        })
                    }).map(function (v) {
                        v.dom.onclick = function () {
                            if (itemClick) { itemClick(v) }
                        }
                        cwh.appendChild(v.dom)
                        return v
                    })
                },

                select: function (id) {
                }
            }
        }
    })