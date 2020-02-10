Shelf.define(
    { name: 'pageSwitch', path: './pageSwitch.shelf.html' },
    function () {

        return {
            render: function (props) {
                var onChanged = props.onChanged || function(){}

                var pages = (props.pages || []).map(function (v) {
                    return $.extend({
                        target: '',
                        id: 'sptab_' + Math.floor(Math.random() * 10000000)
                    }, v)
                }).map(function (v) {
                    if (!v.target)
                        v.target = []
                    if (typeof v.target === 'string')
                        v.target = [Dom(v.target)]
                    if (v.target instanceof Array)
                        v.target = v.target
                    else
                        v.target = [v.target]

                    return v
                })

                var selected = props.selected ? props.selected : pages.length <= 0 ? '' : pages[0].id

                return {
                    pages: pages,
                    selected: selected,
                    onChanged:onChanged
                }
            },
            init: function () {
                var _this = this
                var show = _this.data.pages.find(function (v) { return v.id === _this.data.selected })
                var hide = $(_this.root).find('.pageSwich_hide').get(0)

                _this.data.pages
                    .map(function (v) { return v.target })
                    .flat().
                    forEach(function (v) {
                        hide.appendChild(v)
                    })

                if (show) {
                    show.target.forEach(function (v) {
                        _this.root.appendChild(v)
                    })
                }
            },
            outer: {
                change:function(id){
                    var _this= this
                    this.data.selected = id
                    this.update().then(function(){
                        _this.data.onChanged(
                            _this.data.pages.find(function(v){return v.id === id})
                        )
                        if(mini && mini.layout){mini.layout()}
                    })
                }
            }
        }
    })