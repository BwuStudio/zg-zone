Shelf.define(
    { name: 'tabBtnSider', path: './tabBtnSider.shelf.html' },
    function () {
        var tabs = []
        var selectedLi = null
        var itemClick = null 
        function markSelected() {
            tabs.forEach(function (t) {
                t.list.forEach(function (v) {
                    if (v.dom) v.dom.className = ''
                })
            })
            if (selectedLi) selectedLi.dom.className = 'selected'
        }
        function tabsRender() {
            tabs.forEach(function (tab) {
                var ol = $(tab.target).find('ol').get(0)
                ol.innerHTML = ''
                tab.list.map(function (li) {
                    li.dom = Dom(liTemplate.replace('_text_', li.text), function (m) {
                        m.onclick = function () {
                            selectedLi = li
                            markSelected()
                            if(itemClick) itemClick(li)
                        }
                    })
                    return li.dom
                }).forEach(function (v) {
                    ol.appendChild(v)
                })
            })
        }



        var liTemplate
        var tabTemplate

        return {
            render: function (props) {
                itemClick = props.itemClick || function(){}
                tabs = (props.tabs || []).map(function (v) {
                    return $.extend({
                        title: '',
                        id: 'tbs_' + Math.floor(Math.random() * 10000000),
                        btns: [], // {text:'',call:function(){}}
                        list: [], // {text:'', id :''}
                    }, v)
                })
                return {}
            },
            init: function () {
                var _this = this

                // 添加样式
                document.body.appendChild(Dom($(_this.root).find('.style').get(0).innerHTML))

                liTemplate = $(_this.root).find('.li').get(0).innerHTML
                tabTemplate = $(_this.root).find('.tab').get(0).innerHTML


                tabs = tabs.map(function (v) {
                    return {
                        id: v.id,
                        title: v.title,
                        list: v.list,
                        target: Dom(tabTemplate, function (n) {
                            v.btns.map(function (li) {
                                return Dom('<a class="block_btn" style="margin:0 3px;">_text_<a>'.replace('_text_', li.text), function (m) {
                                    m.onclick = function () {
                                        li.call()
                                    }
                                })
                            }).forEach(function (v) {
                                $(n).find('.head>.row').get(0).appendChild(v)
                            })
                        })
                    }
                })

                Shelf.get('simpleTabs')(
                    _this.root,
                    {
                        bgColor: 'rgb(239, 245, 250)',
                        isCross: true,
                        pages: tabs
                    }
                )
                tabsRender()
            },
            outer: {
                loadList: function (id, list) {
                    var tab = tabs.find(function (v) { return v.id === id })
                    if (!tab) return

                    tab.list = list
                    tabsRender()
                },
                getSelected:function(){
                    return selectedLi
                },
                unselectAll:function(){
                	selectedLi = null
                    markSelected()
                },
                hideBtns:function(){
                	$(this.root).find('.st-body>.panel').get(0).className = 'panel'
                    $(this.root).find('.st-body>.panel>.head').get(0).style.display = 'none'
                },
                showBtns:function(){
                	$(this.root).find('.st-body>.panel').get(0).className = 'panel with_head'
                    $(this.root).find('.st-body>.panel>.head').get(0).style.display = ''
                }
            }
        }
    })


