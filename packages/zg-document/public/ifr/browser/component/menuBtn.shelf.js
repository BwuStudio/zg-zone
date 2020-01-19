Shelf.define(
    { name: 'menuBtn', path: './menuBtn.shelf.html' },
    function () {
        var btn = null
        var pop = null
        var list = []
        var click = function(){}
        var width = 100
        var text = ''
        return {
            render: function (props) {   
                list = props.list || list
                click = props.itemClick || click
                width = props.width || width
                text = props.text || text

                return {}
            },
            init: function (cont) {
                btn = this.root
                pop = Shelf.get('popList')()

                btn.innerHTML = text + '<i style="float: right" class="iconfont icon-expandmore">'

                btn.onclick  = function(){

                    btn.innerHTML = text + '<i style="float: right" class="iconfont icon-expandless">'
                    pop.emit('open',[
                        list,btn,{
                            size:{width:width},
                            itemClick:click,
                            onClose:function(){
                                btn.innerHTML = text + '<i style="float: right" class="iconfont icon-expandmore">'
                            }
                        }
                    ])
                }
            },
            outer: {
            }
        }
    })