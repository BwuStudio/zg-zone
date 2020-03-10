(function () {

    function containerStyleInit(dom) {

        dom.style.position = "fixed"
        dom.style.top = "0"
        dom.style.left = "0"
        dom.style.right = "0"
        dom.style.bottom = "0"
        dom.style.background = ""
        dom.style.zIndex = '100'

    }

    function setWindowSize(win, op) {
        win.style.height = op.height + 'px'
        win.style.width = op.width + 'px'
        win.style.marginLeft = op.width * (-0.5) + 'px'
        win.style.marginTop = op.height * (-0.5) + 'px'
    }

    function moveAble(dv, mov, mask) {
        var x = 0;
        var y = 0;
        var l = 0;
        var t = 0;
        //鼠标按下事件
        dv.onmousedown = function (ev) {
            var e = ev || event
            mask.style.display = 'block'
            //获取x坐标和y坐标
            x = e.clientX;
            y = e.clientY;

            //获取左部和顶部的偏移量
            l = parseFloat(mov.style.marginLeft);
            t = parseFloat(mov.style.marginTop);
            //开关打开
            isDown = true;
            //设置样式  
            dv.style.cursor = 'move';

            //鼠标移动
            document.body.onmousemove = function (ev) {
                //获取x和y
                var e = ev || event
                var nx = e.clientX;
                var ny = e.clientY;
                //计算移动后的左偏移量和顶部的偏移量
                var nl = nx - (x - l);
                var nt = ny - (y - t);

                mov.style.marginLeft = nl + 'px';
                mov.style.marginTop = nt + 'px';
            }

            //鼠标抬起事件
            document.body.onmouseup = function () {

                safeMove(mov)

                mask.style.display = 'none'
                dv.style.cursor = 'default';

                document.body.onmouseup = null
                document.body.onmousemove = null
            }
        }



    }
    function safeMove(mov) {
        var l = parseFloat(mov.style.marginLeft);
        var t = parseFloat(mov.style.marginTop);
        var w = $(mov).width()
        var h = 32 // 标题栏高度

        var ww = $(window).width()
        var wh = $(window).height()

        var resLeft // 结果的高度
        var resTop  // 结果高度

        if ((ww * 0.5 + l) > (ww - 60)) {
            resLeft = ww * 0.5 - 60
        } else if ((ww * 0.5 + l + w) < 60) {
            resLeft = 60 - (ww * 0.5 + w)
        } else {
            resLeft = l
        }

        if ((wh * 0.5 + t) > (wh - 30)) {
            resTop = wh * 0.5 - 30
        } else if ((wh * 0.5 + t) < 0) {
            resTop = wh * (- 0.5)
        } else {
            resTop = t
        }

        mov.style.marginLeft = resLeft + 'px'
        mov.style.marginTop = resTop + 'px'



    }


    Shelf.define({
        name: 'modal', path: './modal.shelf.html', static: {
            open: function (element, option) {
                var op = $.extend({}, option)
                var onClose = op.onClose
                var win = null
                op.onClose = function () {
                    if (onClose) onClose();
                    setTimeout(function () {
                        if (win && win.destroy) win.destroy()
                    })
                }

                win = Shelf.get('modal')(Dom('<div style=""></div>'), {})

                try {
                    window.top.document.body.appendChild(win.root)
                    win.emit('open', [element, op])
                    return win
                } catch (e) {
                    console.warn(e)
                    window.document.body.appendChild(win.root)
                    win.emit('open', [element, op])
                    return win
                }
            },
            openUrl: function (url, option) {
                var op = $.extend({}, option)
                var win = Shelf.get('modal')(Dom('<div style=""></div>'), {})

                var m = Msger.pair()
                var c0 = m[0],
                    c1 = m[1]

                c1.hook('close',function(fn,args){
                    c1.cancel('close')
                    fn.apply(null,args)
                    c1.emit('close')
                    setTimeout(function () { if (win && win.destroy) win.destroy() })
                })

                c0.hook('close',function(fn,args){
                    c0.cancel('close')
                    fn.apply(null,args)
                    c0.emit('close')
                })

                op.onClose = function () {
                    c1.emit('close')
                }

                try {
                    window.top.document.body.appendChild(win.root)
                    win.emit('open', [url, op ,c1])
                    
                    return c0
                } catch (e) {
                    console.warn(e)
                    window.document.body.appendChild(win.root)
                    win.emit('open', [url, op, c1])
                    
                    return c0
                }
            }
        }
    }, function () {

        var onClose = function () { }
        var main = null
        var win = null
        var body = null

        return {
            render: function (props) {
                return { title: '', el: null }
            },
            init: function (cont) {
                containerStyleInit(cont)
                cont.style.display = 'none'
                $(cont).find('.sf-modal-window-close').get(0).onclick = function () {
                    if (onClose) onClose()
                    cont.style.display = 'none'
                }
                win = $(cont).find('.sf-modal-window').get(0)
                body = $(cont).find('.sf-modal-window-body').get(0)
                main = cont

                title = $(cont).find('.sf-modal-window-title').get(0)
                header = $(cont).find('.sf-modal-window-header').get(0)
                movMask = $(cont).find('.sf-modal-window-move-mask').get(0)

                movMask.style.display = 'none'

                moveAble(header, win, movMask)
            },
            outer: {
                open: function (element, option, msger) {
                    var el = element
                    var _this = this

                    if (typeof el === 'string') {
                        var ifr = document.createElement('iframe')
                        ifr.src = el
                        ifr.style.height = '100%'
                        ifr.style.width = '100%'
                        el = ifr
                    }

                    var op = $.extend({
                        width: 800,
                        height: 450,
                        title: '',
                        onClose: function () { }
                    }, option ? option : {})

                    onClose = op.onClose
                    this.data.title = op.title

                    this.update().then(function () {
                        setWindowSize(win, op)
                        main.style.display = 'block'
                        body.innerHTML = ''
                        if (el) body.appendChild(el)
                        $(_this.root).find('iframe').get().forEach(function (v) {
                            v.contentWindow.above = {
                                Msger: function(){return msger  || null}
                            }
                        })
                    })
                },
                close: function () {
                    if (onClose) onClose()
                    main.style.display = 'none'
                }
            }
        }
    })
})()