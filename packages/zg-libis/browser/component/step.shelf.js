Shelf.define(
    { name: 'step', path: './step.shelf.html' },
    function () {
        return {
            render: function (props) {
                var list = props.list || []
                var targetId = props.target || ''

                list = list.map(function(a){
                    return {
                        id : a.id,
                        title : a.title,
                        status : '' 
                    }
                })

                var target = list.find(function(v){return v.id === targetId})
                if(target){
                    target.status = 'target'
                    list.reduce(function(r,v){
                        if(v===target) return false
                        if(r){v.status = 'done'}
                        return r
                    },true)
                }

                return {
                    list: list
                }
            },
            init: function () {
            },
            outer: {
            }
        }
    })