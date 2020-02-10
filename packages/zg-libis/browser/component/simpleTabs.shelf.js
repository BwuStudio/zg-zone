Shelf.define(
    { name: 'simpleTabs', path: './simpleTabs.shelf.html' },
    function () {

        var tabChange = null
        return {
            render: function (props) {
                var bgColor = props.bgColor ? props.bgColor : "#fff"
                var pages = props.pages || []
                var isCross = props.isCross || false 
                var height = props.height || '100%'
                var style = props.style === 'line' ? 'line' : false
                var theme = props.theme || ''

                tabChange = props.tabChange ? props.tabChange : tabChange

                pages = pages.map(function (v) {
                    return $.extend({
                        title: '',
                        target: '',
                        selected: false,
                        id: 'sptab_' + Math.floor(Math.random() * 10000000)
                    }, v)
                }).map(function (v) {
                    if (typeof v.target === 'string')
                        v.target = Dom(v.target)
                    return v
                })

                var selected = props.selected ? props.selected : pages.length <= 0 ? '' : pages[0].id

                return {
                    isCross: isCross,
                    bgColor: bgColor,
                    pages: pages,
                    selected: selected,
                    height: height,
                    style: style,
                    theme: theme
                }
            },
            init: function () {
                if (this.data.style == 'line') {
                    $(this.root).children('.simple-tabs').get(0).className += ' simple-tabs_line'
                }

                // console.log(  $(this.root).children('.simple-tabs').get() )
                var _this = this
                var body = $(this.root).find('.st-body').get(0)

                this.root.style.height = this.data.height === "100%" ? '100%'
                    : this.data.height === 'auto' ? 'auto' : this.data.height + 'px'

                body.style.height = this.data.height === 'auto' ? 'auto' : "100%"

                _this.data.pages.forEach(function (v) {
                    $(v.target).hide()
                    body.appendChild(v.target)
                })

                var target = _this.data.pages.find(function (v) {
                    return v.id === _this.data.selected
                })

                if (target) {
                    $(target.target).show()
                    body.appendChild(target.target)
                    if(mini && typeof mini.layout === 'function'){mini.layout()}
                }

                $(_this.root).children('.simple-tabs').get().forEach(function(v){v.className = "simple-tabs "+ _this.data.theme})

                
                $(_this.root).children('.simple-tabs').children('.st-head').find('.st-title').get().forEach(function (v) {
                    if (_this.data.isCross && _this.data.pages.length > 0) {
                        v.style.width = 100 / _this.data.pages.length - 0.1 + '%'
                    }
                    var c = $(v).find('.st-title-text').get(0)
                    c.style.borderBottomColor = _this.data.bgColor

                    var i = c.className.match(/item_index_(\d*)/)[1]

                    c.onclick = function () {
                        _this.data.selected = _this.data.pages[i].id

                        $(_this.root).children('.simple-tabs').children('.st-head').find('.st-title').get().forEach(function (s) { s.className = 'st-title' })

                        v.className = 'st-title selected'

                        _this.data.pages.forEach(function (v) { $(v.target).hide() })

                        $(_this.data.pages[i].target).show()

                        if (tabChange) tabChange(_this.data.pages[i].id)
                        
                        if(mini && typeof mini.layout === 'function'){mini.layout()}
                    }
                })


            },
            outer: {
            }
        }
    })