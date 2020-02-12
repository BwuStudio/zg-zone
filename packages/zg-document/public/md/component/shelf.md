# shelf 自研组件

## 下拉按钮（menuBtn）
<div class="ifr" data-src="/widget/shelf/menuBtn.html" style="height:160px"></div>

实例化代码：

    var menuBtn = Shelf.get('menuBtn')(
        document.getElementById('output_btn'), {
        // 按钮 text
        text: '下拉弹出列表', 
        // 下拉列表数据
        list: [
            { id: "dsf12312321", text: '案说法' },
            { id: "fds12312321", text: '范德萨' },
            { id: "asd12312321", text: '格勒恩' }
        ],
        // 列表点击事件
        itemClick: function (item) {
            console.log(item.id)
        },
        // 列表宽度
        width: 100,
        // 列表位置偏移量
        offset: { top: 5 }
    })

## 下拉选择按钮（menuCheck）
<div class="ifr" data-src="/widget/shelf/menuCheck.html" style="height:160px"></div>

实例化代码：

    var menuCheck = Shelf.get('menuCheck')(
        document.getElementById('output_btn'), {
        // 按钮 text
        text: '下拉弹出选择列表',
        // 按钮数据
        list: [
            { id: "dsf12312321", text: '案说法' },
            { id: "fds12312321", text: '范德萨' },
            { id: "asd12312321", text: '格勒恩' }
        ],
        // 列表数据 change 事件
        onChange: function () {
            // 获取用户选中元素
            console.log(menuCheck.emit('getChecked'))
        },
        // 列表宽度
        width: 100,
        // 列表位置偏移量
        offset: { top: 5 }
    })

## 标签页（simpleTab）
<div class="ifr" data-src="/widget/shelf/simpleTab.html"></div>

实例化代码：

    Shelf.get('simpleTabs')(
        $('#panel_0').get(0), {
        // 标签页样式 'line' / 'fill' / null
        theme: 'line',
        // 标签页内容
        pages: [{
            // 显示的标题
            title: '标签页1',
            // 一个唯一的 id
            id: 'bwh',
            // 标签页内容
            target: $('#panel_1').get(0),
        }, {
            title: '标签页2',
            id: 'cuh',
            target: $('#panel_2').get(0),
        }, {
            title: '标签页3',
            id: 'ccc',
            target: $('#panel_3').get(0),
        }]
    })