
(function () {

    var alertQueue = []
    var isAlerting = false

    function dealAlertQueue() {
        if (alertQueue.length === 0) {
            isAlerting = false
            return
        }
        else {
            isAlerting = true
            var item = alertQueue.shift()
            var msg = item.msg
            var type = item.type
            var call = item.call

            var root = Shelf.get('info')(null, {
                content: msg || '',
                type: type
            }).regist('close', function (e) {
                if (call) call(e)
                dealAlertQueue()
            }).root

            root.style.position = 'fixed'
            root.style.zIndex = '9001'
            root.style.display = 'table'
            root.style.height = '100%'
            root.style.width = '100%'
            root.style.top = '0'
            root.style.left = '0'

            window.top.document.body.appendChild(root)
        }

    }

    Shelf.define({
        name: 'info',
        path: './info.shelf.html',
        static: {
            alert: function (str) {
                return new Promise(function (res) {
                    alertQueue.push({
                        msg: str,
                        type: 'alert',
                        call: res
                    })
                    if (!isAlerting) dealAlertQueue()
                })
            },
            confirm: function (str) {
                return new Promise(function (res) {
                    alertQueue.push({
                        msg: str,
                        type: 'confirm',
                        call: res
                    })
                    if (!isAlerting) dealAlertQueue()
                })
            },
            warn: function (msg) {
                var msgStyle = {

                    padding: '12px 16px 12px 40px',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease',
                    margin: '7px 0',

                    lineHeight: '26px;',
                    overflow:'hidden',
                    transform: "translate(-50%,0)",
                    width: 'auto',
                    position: 'relative',
                    left: '50%',
                    display: 'inline-block',
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: '4px',
                    boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                    zIndex: 9999,
                }
                var iconStyle = {

                    height: '22px',
                    width: '22px',
                    lineHeight: '22px',
                    borderRadius: '50%',

                    textAlign: 'center',
                    background: "#64c864",
                    color: "#fff",

                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",

                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    zIndex: 9999,
                }
                var cntr = $(window.top.document.body).find('.shelf_warn_msg_cnter').get(0)

                if (!cntr) {
                    window.top.document.body.appendChild(Dom('<div class="shelf_warn_msg_cnter"></div>', function (v) {
                        $.extend(v.style, {
                            position: 'fixed',
                            height: 0,
                            left: 0,
                            top: "10px",
                            boxSizing: 'border-box',
                            right: 0,
                            zIndex: 9999
                        })
                    }))

                    var cntr = $(window.top.document.body).find('.shelf_warn_msg_cnter').get(0)
                }

                var msg = Dom('<div></div>', function (v) {
                    v.appendChild(Dom("<i>!</i>", function (v) {
                        $.extend(v.style, iconStyle)
                    }))

                    v.appendChild(Dom("<span>!</span>", function (v) {
                        v.innerHTML = msg || ''
                    }))

                    $.extend(v.style, msgStyle,{opacity:0})
                    setTimeout(function(){$.extend(v.style, msgStyle,{opacity:1})}, 0);
                })

                var br = Dom('<div></div>',function(v){v.style.marginTop="-10px"})
            
                cntr.appendChild(br)
                cntr.appendChild(msg)

                setTimeout(function(){ $.extend(msg.style, {
                    opacity:0,
                    height:0,
                    margin:0,
                    padding:0,
                    borderWidth:0,
                    boxShadow:'0 2px 4px rgba(0,0,0,0)'
                })}, 5000);

                setTimeout(function(){
                    $(msg).remove()
                    $(br).remove()
                }, 5500);


            }
        }
    }, function () {
        var content = ''
        var type = ''
        function destroy() { }

        return {
            events: ['close'],
            render: function (props) {
                content = props.content || 'alert'
                type = props.type || 'confirm'

            },
            init: function () {
                var _this = this
                $(this.root).find('.msg-info-content').get().forEach(function (v) {
                    v.innerHTML = content
                })

                $(this.root).find('.cancel_btn,.iconfont.icon-guanbi').get().forEach(function (v) {  
                    v.onclick = function () {
                        _this.send('close', [false])
                        _this.destroy()
                    }
                })

                
                $(this.root).find('.cancel_btn').get().forEach(function (v) {  
                    if (type === 'alert') v.innerText = '确定'
                })

                $(this.root).find('.confirm_btn').get().forEach(function (v) {
                    if (type === 'alert') {
                        v.style.display = 'none'
                    } else {
                        v.onclick = function () {
                            _this.send('close', [true])
                            _this.destroy()
                        }
                    }

                })

            },
            outer: {
                destroy: function () {
                },
                hide: function () {
                    this.root.display = 'none'
                }
            }
        }
    })
})()
