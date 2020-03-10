(function () {
    var html = [
        // 弹出下拉列表
        'shelf-popList',
        // 下拉列表按钮
        'shelf-menuBtn',
        // 标签页组件
        'shelf-simpleTabs',
        // 弹出组件
        'shelf-modal',
        // 代码表选择组件
        'shelf-detailSelect',
        // 提醒插件
        'shelf-info',
    ].map(function (v) {
        var name = v
        var s = name.replace('shelf-','')
        var url = '/browser/component/' + s + '.shelf.js'
        return '<script src="${url}" class="${name}"></script>'.replace('${url}', url).replace('${name}', name)
    }).join('\n')

    document.write(html)
})()