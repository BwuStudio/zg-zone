Shelf.define(
    { name: 'menuCheck', path: './menuCheck.shelf.html' },
    function () {
        var btn = null
        var pop = null
        var list = []
        var onChange = function () { }
        var width = 100
        var text = ''
        return {
            render: function (props) {
                list = props.list || list
                onChange = props.onChange || onChange
                width = props.width || width
                text = props.text || text

                return {}
            },
            init: function (cont) {
                btn = this.root
                pop = Shelf.get('popList')()
                list = list.map(function (v) {
                    return $.extend(v, {
                        checked: v.checked ? true : false,
                        dom: Dom('<label><input type="checkbox">' + v.text + '</label>', function (d) {
                            d.style.float = "left"
                            $(d).find('input').get(0).style.margin = "2px 4px 4px 8px"
                            $(d).find('input').get(0).style.verticalAlign = "middle"
                            $(d).find('input').get(0).onchange = function () {
                                v.checked = this.checked ? true : false;
                                if(onChange) onChange()
                            }
                        })
                    })
                })


                btn.innerHTML = text + '<i style="float: right" class="iconfont icon-expandmore">'

                btn.onclick = function () {

                    btn.innerHTML = text + '<i style="float: right" class="iconfont icon-expandless">'
                    pop.emit('open', [
                        list, btn, {
                            size: { width: width },
                            doNotHideOnClick:true,
                            onClose: function () {
                                btn.innerHTML = text + '<i style="float: right" class="iconfont icon-expandmore">'
                            }
                        }
                    ])
                }
            },
            outer: {
                getChecked:function(){
                    return (list||[]).filter(function(v){return v.checked?true:false})
                },
                getAll:function(){
                    return list||[]
                }
            }
        }
    })