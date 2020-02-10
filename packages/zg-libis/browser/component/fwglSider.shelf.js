Shelf.define(
    { name: 'fwglSider', path: '/gbrm/common/component/fwglSider.shelf.html' },
    function () {
        var upClick = function () { }
        var downClick = function () { }
        var setClick = function () { }
        var setList = []
        var showClick = function () { }

        var list = null
        var li = []
        var liTemplate = ''

        var itemClick = function(){}

        function selectLi(id){

            li.forEach(function(v){
                v.dom.className =v.dom.className.replace(' selected','')

                if(v.id === id){
                    v.dom.className += ' selected'
                }
            });

        }

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
                var a = $(_this.root).find('.fwglSider').get(0)

                var up = $(a).find('.up').get(0)

                var down = $(a).find('.down').get(0)
                var set = $(a).find('.setting').get(0)
                var show = $(a).find('.show_all').get(0)
                list = $(a).find('.fwgl_sider-list').get(0)
                liTemplate = list.innerHTML

                up.onclick = upClick
                down.onclick = downClick
                show.onclick = showClick

                var btn = Shelf.get('menuBtn')(
                    set, {
                        text: '设置',
                        list: setList,
                        itemClick: setClick
                    }
                )


                var tabs = Shelf.get('simpleTabs')(
                    _this.root,
                    {
                        bgColor: 'rgb(239, 245, 250)',
                        select: 'fwgl',
                        isCross: true,
                        pages: [{
                            title: '主送单位',
                            id: 'fwgl',
                            target: a,
                        }]
                    }
                )
            },
            outer: {
                loadList: function (arr) {
                    li = arr || []
                    list.innerHTML = ''
                    li = li.map(function (v) {
                        return $.extend(v,{
                            dom:Dom(liTemplate
                                .replace('_number_',
                                (v.isChild?'':'<i class="iconfont icon-ai-connection"></i>') +('<div>共' + (v.num ? v.num : 0) + '人</div>'))
                                .replace('_text_', v.text)
                                .replace('_child_',v.isChild?'child':'')
                            )
                        })
                    }).map(function(v){
                        v.dom.onclick= function(){
                            selectLi(v.id)
                            if(itemClick){ itemClick(v)}
                        }
                        list.appendChild(v.dom)
                        return v
                    })
                },

                select:function(id){
                    selectLi(id)
                },

                getSelected:function(){
                    return li.find(function(v){
                        return v.dom.className.indexOf('selected') >= 0
                    })
                }
            }
        }
    })