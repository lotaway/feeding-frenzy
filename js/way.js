+function () {
    'use strict';

//窗体元素变量、窗体宽度、窗体高度、激活的菜单链接
//    var elbody, bodyWidth, bodyHeight, last_secMenuBar;

    window.way = {

        //易动商城搜索栏
        HRsearch: function (btn, target) {
            var btn_search = btn || "btn-search";
            var _target = target || "search";
            btn_search = document.querySelector("." + btn_search);
            _target = document.querySelector("#" + _target);
            if (btn_search != undefined) {
                way.listener.add(btn_search, "click", function () {
                    var div = document.getElementById("search-container");
                    if (div == undefined) {
                        div = document.createElement("div");
                        div.id = "search-container";
                        div.setAttribute("style", "display:none;position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,0.7);z-index:10;pointer-events: all;")
                        way.listener.add(div, "click", function () {
                            this.style.display = "none";
                            document.body.style.overflowY = "auto";
                            _target.removeAttribute("style");
                        });
                        document.body.appendChild(div);
                    }
                    div.style.display = "block";
                    _target.setAttribute("style", "display:block;position:fixed;top:0;left:0;width:96%;padding:5px 2%;background:#fff;z-index:101");
                    document.body.style.overflowY = "hidden";
                    event.preventDefault();
                })
            }
        },
        //touchEvent: {
        //    support: function () {
        //        return (window.Modernizr && Modernizr.touch === true) || !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
        //    },
        //initEvents = function (target,detach) {
        //    var actionDom = detach ? 'off' : 'on';
        //    var action = detach ? 'removeEventListener' : 'addEventListener';
        //    var touchEventsTarget = target ? target : window;
        //    var target = s.support.touch ? touchEventsTarget : document;
        //
        //    var moveCapture = s.params.nested ? true : false;
        //
        //    //Touch Events
        //    if (s.browser.ie) {
        //        touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
        //        target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
        //        target[action](s.touchEvents.end, s.onTouchEnd, false);
        //    }
        //    else {
        //        if (s.support.touch) {
        //            touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
        //            touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
        //            touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false);
        //        }
        //        if (params.simulateTouch && !s.device.ios && !s.device.android) {
        //            touchEventsTarget[action]('mousedown', s.onTouchStart, false);
        //            document[action]('mousemove', s.onTouchMove, moveCapture);
        //            document[action]('mouseup', s.onTouchEnd, false);
        //        }
        //    }
        //},
        //判断是否PC端
        isPC: function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            var flag = true;
            for (var v = 0, l = Agents.length; v < l; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        //点击涟漪效果
        fingerPointActive: function () {
            window.addEventListener("click", function () {
//            var point = document.querySelector(".finger-point");
//            var posX = event.targetTouches[0].pageX;
//            var posY = event.targetTouches[0].pageY;
                var event = event || window.event;
//            var posX = event.screenX;
//            var posY = event.screenY;
                var posX = event.clientX;
                var posY = event.clientY;
                var finger_point = document.createElement("div");
                finger_point.setAttribute("style", "position: absolute;width: 10px;height: 10px;" +
                    "border-radius: 50%;box-shadow: inset 0 0 2px #06b9ca;opacity:1;" +
                    "transition: 0.5s transform ease,1s opacity ease;");
                //finger_point.setAttribute("class", "finger-point");
                document.body.appendChild(finger_point);
                setTimeout(function () {
                    finger_point.style.cssText += "left:" + (posX - finger_point.offsetWidth / 2 + document.body.scrollLeft) + "px;top:" + (posY - finger_point.offsetHeight / 2 + document.body.scrollTop) + "px;transform:scale(10,10);opacity:0;";
                }, 0);
//            point.style.left = posX - point.offsetWidth / 2 + "px";
//            point.style.top = posY - point.offsetHeight / 2 + "px";
//            point.style.animation = "1s diffusion ease;";
                setTimeout(function () {
                    document.body.removeChild(finger_point);
                }, 1000);
            })
        },
        //如果页面过短，则根部修正定位在底部
        footerBottom: function (target) {
            var footer = document.querySelector(target);
            if (footer != undefined) {
                document.body.style.height = "auto";
                if (document.body.scrollHeight > document.body.offsetHeight + footer.offsetHeight) {
                    footer.setAttribute("style", "position:fixed;left:0;bottom:0");
                }
            }
        },
        //写入cookie, name表示写入的变量，Value表示name变量的值，hours表示保存时间。
        setCookie: function (name, value, hours) {
            var expire = "";
            if (hours != null) {
                expire = new Date((new Date()).getTime() + hours * 3600000);
                expire = "; expires=" + expire.toUTCString();
            }
            document.cookie = name + "=" + decodeURI(value) + expire + ";path=/";
//      alert("write on");
        },
        //读取cookie
        getCookie: function (name) {
//        字符串搜索
//        var cookieValue = "";
//        var search = name + "=";
//        if (document.cookie.length > 0) {
//            var offset = document.cookie.indexOf(search);
//            if (offset != -1) {
//                offset += search.length;
//                var end = document.cookie.indexOf(";", offset);
//                if (end == -1) end = document.cookie.length;
//                cookieValue = document.cookie.substring(offset, end);
//                write.innerHTML += "名字：" + name + "；位置：" + offset + "；值：" + cookieValue + "<br/>";
//            }
//        }
//        正则匹配
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return decodeURIComponent(arr[2]);
            else return null;
        },
        //删除cookie（令目标立刻过期）
        removeCookie: function (name) {
            setCookie(name, "", -1);
        },
        //设置监听需要展开收起次级菜单的列表
        //secMenuBar: function secMenuBar(target, active, hidden, expand, iframer) {
        //    var ta = document.getElementsByClassName(target);
        //    var h = hidden;
        //    var e = expand;
        //    var f = iframer;
        //    if (ta.length) {
        //        var list = ta[0].getElementsByTagName("a");
        //        if (list.length) {
        //            for (var i = 0; i < list.length; i++) {
        //                hy.listener.add(list[i], "click", function () {
        //                    //添加激活样式
        //                    hy.classHandle.addClassName(this, active);
        //                    //判断是否需要展开隐藏
        //                    if (!hy.classHandle.hasClassName(this.parentNode, e)) {
        //                        if (hy.classHandle.hasClassName(this.parentNode, h)) {
        //                            hy.classHandle.addClassName(this.parentNode, e);
        //                        }
        //                    }
        //                    else hy.classHandle.removeClassName(this.parentNode, e)
        //                    //移除激活的效果
        //                    if (last_secMenuBar !== undefined) {
        //                        hy.classHandle.removeClassName(last_secMenuBar, active);
        //                    }
        //                    last_secMenuBar = this;
        //                    hy.iAllHeight(f);
        //                });
        //            }
        //        }
        //    }
        //},
        //令iframe无滚动条，高度完全展开
        //iAllHeight: function iAllHeight(e) {
        //    var iframeContent = document.getElementById(e);
        //    if (iframeContent != undefined) {
        //        //先清零，去除最后+10高度的影响
        //        iframeContent.style.height = 0;
        //        var te = iframeContent.contentWindow;
        //        //te.onload = function () {
        //        var height = hy.get.iframeHeight(te);
        //        //+10高度，否则滚动条仍然存在
        //        iframeContent.style.height = height + 150 + "px";
        //
        //},
        //随机数
        //randomNum: function randomNum(Min, Max) {
        //    var Range = Max - Min;
        //    var Rand = Math.random();
        //    return (Min + Math.round(Rand * Range));
        //},
        //添加关闭当前页面的点击事件
        addClosePage: function () {
            var btn_close = document.getElementById("btn_close");
            if (btn_close != undefined) {
                way.listener.add(btn_close, "click", function () {
                    window.close();
                    return false
                })
            }
        },
        //添加返回上一页的点击事件
        addToBack: function () {
            var btn_back = document.getElementById("btn_back");
            if (btn_back != undefined) {
                way.listener.add(btn_back, "click", function () {
                    if (window.history != null) {
                        window.history.back()
                        event.preventDefault()
                    }
                });
            }
        },
        //添加上下快速滚动的点击事件
        addTopBot: function () {
            var btn_to_top = document.getElementById("btn_to_top");
            var btn_to_bot = document.getElementById("btn_to_bot");
            if (document.body.scrollHeight > document.body.clientHeight) {
                way.listener.add(btn_to_top, "click", function () {
                    way.toTop();
                    event.preventDefault()
                });
                way.listener.add(btn_to_bot, "click", function () {
                    way.toBot();
                    event.preventDefault()
                });
                btn_to_top.setAttribute("style", "opacity:0");
                way.supAdd(function () {
                    var scrollTop = document.body.scrollTop;
                    var scrollHeight = document.body.scrollHeight;
                    var clientHeight = document.body.clientHeight;
                    if (scrollTop > 50) {
                        btn_to_top.removeAttribute("style")
                    } else {
                        btn_to_top.setAttribute("style", "opacity:0")
                    }
                    if (scrollTop + clientHeight >= scrollHeight - 10) {
                        btn_to_bot.setAttribute("style", "opacity:0")
                    } else {
                        btn_to_bot.removeAttribute("style")
                    }
                }, null)
            } else {
                btn_to_bot.parentNode.style.display = "none"
            }
        },
        //到顶部事件
        toTop: function () {
            clearTimeout(way.clock);
            var t = way.get.scrollTop();
            var t = t * 0.8;
            if (t > 0) {
                if (t <= 5) {
                    t = 0
                }
                window.scrollTo(0, t);
                way.clock = setTimeout("way.toTop()", 40)
            }
        },
        //到底部事件
        toBot: function () {
            clearTimeout(way.clock);
            var t = way.get.scrollTop();
            var h = way.get.scrollHeight();
            var bh = way.get.bodyHeight();
            var y = (h - t - bh) * 0.2;
            if (y > 0) {
                if (y <= 5) {
                    y = 0;
                    t = h
                }
                window.scrollTo(0, t + y);
                way.clock = setTimeout("way.toBot()", 40)
            }
        },
        //百度分享
        addSharePage: function () {
            var btn_share = document.getElementById("btn_share");
            if (btn_share != undefined) {
                window._bd_share_config = {
                    "common": {
                        "bdSnsKey": {},
                        "bdText": "我有一个很棒的网页要分享给你看",
                        "bdMini": "2",
                        "bdMiniList": false,
                        "bdPic": "http://www.myedon.com/mcbase/sy/images/1/2.png",
                        "bdStyle": "1",
                        "bdSize": "32"
                    }, "share": {}
                };
                document.querySelector("body").appendChild(document.createElement("script")).src = "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" + ~(-new Date() / 3600000);
                way.listener.add(btn_share, "click", function () {
                    way.sharePage("shareBox")
                })
            }
        },
        //侧滑菜单控件初始化
        //menuActive: function () {
        //    var $menu = $("#menu"), $html = $("html, body");
        //    $menu.mmenu({"slidingSubmenus": false, "offCanvas": {"position": "right"}, "onClick": {"close": true}});
        //    var API = $menu.data("mmenu");
        //    API.setSelected($menu.find("a").first());
        //    var closer = null;
        //    $menu.find("a").on("click", function () {
        //        closer = $(this).attr("href")
        //    });
        //    var om_menu = document.getElementById("menu");
        //    var om_menu_a = om_menu.getElementsByTagName("a");
        //    if (om_menu_a.length) {
        //        for (var i = 1; i < om_menu_a.length; i++) {
        //            way.listener.add(om_menu_a[i], "click", function () {
        //                if (!way.classHandle.hasClassName(this, "active") && this.getAttribute("data-target") == null) {
        //                    way.classHandle.addClassName(this, "active");
        //                    if (om_menu.lastClickChild == undefined) {
        //                        om_menu.lastClickChild = om_menu_a[1]
        //                    }
        //                    way.classHandle.removeClassName(om_menu.lastClickChild, "active");
        //                    om_menu.lastClickChild = this
        //                }
        //            })
        //        }
        //    }
        //},
        //弹出分享
        sharePage: function (target) {
            event.preventDefault();
            if (target != undefined) {
                if (this.target == undefined) {
                    this.target = document.getElementById(target);
                    way.listener.add(this.target, "click", function () {
                        way.sharePage(target)
                    })
                }
                if (!way.classHandle.hasClassName(this.target, "active")) {
                    way.classHandle.addClassName(this.target, "active")
                } else {
                    way.classHandle.removeClassName(this.target, "active")
                }
                return false
            }
        },
        //滚动事件超级添加器
        supAdd: function (func, para) {
            if (typeof func == "function") {
                if (typeof window.onscroll != "function") {
                    window.onscroll = func
                } else {
                    var oldEvent = window.onscroll;
                    var p = para || null;
                    window.onscroll = function () {
                        oldEvent();
                        func(p)
                    }
                }
            }
        },
        //样式处理
        classHandle: {
            //样式比对
            hasClassName: function (e, c) {
                return e.className.match(new RegExp("(^|\\s)" + c + "(\\s|$)"))
            },
            //样式添加
            addClassName: function (e, c) {
                if (!way.classHandle.hasClassName(e, c)) {
                    e.className += " " + c
                }
            },
            //样式删除
            removeClassName: function (e, c) {
                if (way.classHandle.hasClassName(e, c)) {
                    e.className = e.className.replace((new RegExp("(^|\\s)" + c)) || (new RegExp(c + "(\\s|$)")), "")
                }
            }
        },
        //监听器
        listener: {
            //添加
            add: function (ob, eve, func, param, cat) {
                this.func = func;
                if (param) {
                    func = function (ob) {
                        func.call(this, param)
                    }
                }
                if (!cat) {
                    this.cat = false
                } else {
                    this.cat = cat
                }
                if (window.addEventListener) {
                    ob.addEventListener(eve, func, this.cat)
                } else {
                    if (window.attachEvent) {
                        ob.attachEvent(eve, func, this.cat)
                    } else {
                        ob.setAttribute("on" + eve, func)
                    }
                }
            },
            //删除
            remove: function (ob, eve, func, cat) {
                if (!cat) {
                    this.cat = false
                } else {
                    this.cat = cat
                }
                if (window.removeEventListener) {
                    ob.removeEventListener(eve, func, this.cat)
                } else {
                    if (window.detachEvent) {
                        ob.detachEvent(eve, func, this.cat)
                    } else {
                        ob.removeAttribute("on" + eve, func)
                    }
                }
            }
        },
        //获取
        get: {
            elbody: function () {
                var elbody;
                if (document.body.clientHeight != 0) {
                    elbody = document.body
                } else {
                    if (document.documentElement.clientHeight != 0) {
                        elbody = document.documentElement
                    }
                }
                return elbody
            },
            bodyHeight: function () {
                return way.get.elbody().clientHeight
            },
            bodyWidth: function () {
                return way.get.elbody().clientWidth
            },
            scrollTop: function () {
                if (document.body.scrollTop != 0) {
                    return document.body.scrollTop
                } else {
                    if (document.documentElement.scrollTop != 0) {
                        return document.documentElement.scrollTop
                    } else {
                        return 0
                    }
                }
            },
            scrollLeft: function () {
                return way.get.elbody().scrollLeft
            },
            scrollHeight: function () {
                return way.get.elbody().scrollHeight
            }
        },
//当元素顶部被窗口超过时，开启修正定位（未完成）。
//        crossTop: function (target, top, className) {
//            //target目标元素，top元素要固定的顶端距离,className要更改的样式
//            var target = document.getElementsByClassName(target);
//            if (target.length) {
//                target.topValue = top || 0;
//                if (target[0].offsetTop < get.bodyHeight() + get.scrollHeight()) {
//                    if (className != undefined) classHandle.addClassName(target[0], className);
//                    target[0].leftValue = target[0].offsetLeft;
//                    target[0].csstxt = target[0].style.cssText;
//                    target[0].style.cssText += "position:fixed;top:" + target.topValue + ";left:" + target[0].leftValue;
//                }
//                else {
//                    if (className != undefined) classHandle.removeClassName(target[0], className);
//                    target[0].style.cssText = target[0].csstxt;
//                }
//            }
//        }
    }
}();