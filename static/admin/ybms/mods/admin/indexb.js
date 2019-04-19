var larryTab;
layui.define(["jquery", "configure", "larryTab", "form", "admin"], function(e) {
    var n = layui.$
        , a = layui.configure
        , l = layui.layer
        , r = layui.laytpl
        , o = layui.larryms
        , i = layui.form
        , s = layui.admin
        , c = n(window)
        , u = n("body")
        , f = n("#larry_layout")
        , m = a.basePath + "lib/templets/style/theme.css"
        , d = "lib/templets/themeNoneTab";
    larryTab = layui.larryTab({
        tab_elem: "#larry_tab",
        tabMax: 130,
        spreadOne: false //默认展开所有，为true时只打开一个
    });
    var y = function() {
        if (layui.data("larryms").topMenuSet === undefined) {
            layui.data("larryms", {
                key: "topMenuSet",
                value: true
            })
        }
        larryTab.menuSet({
            type: "POST",
            url: layui.cache.menusUrl,
            data: layui.cache.menuData,
            left_menu: "#larryms_left_menu",
            leftFilter: "LarrySide",
            top_menu: layui.data("larryms").topMenuSet !== false ? "#larryms_top_menu" : false
        });
        larryTab.menu();
        if (larryTab.config.gobal_caches) {
            var e = n("#larry_tab_content").children(".layui-tab-item")
                , a = e.data("group")
                , l = e.data("id");
            if (l !== "larry-undefined") {
                larryTab.navPosition(l, a)
            }
        }
    };
    if (window.top == window.self) {
        y()
    }
    window.onresize = function() {
        s.responeDevice()
    }
    ;
    var p = layui.data("larryms").lockscreen
        , v = layui.data("larryms").systemSet;
    if (p === "locked") {
        b()
    }
    if (v) {
        if (v.fullScreen == true) {
            var h = l.alert("按ESC退出全屏", {
                title: "进入全屏提示信息",
                skin: "layui-layer-lan",
                closeBtn: 0,
                anim: 4,
                offset: "100px"
            }, function() {
                o.fullScreen.entry();
                l.close(h)
            })
        }
    }
    n("#menufold").on("click", function() {
        if (n("#larry_layout").hasClass("larryms-fold")) {
            n("#larry_layout").addClass("larryms-unfold").removeClass("larryms-fold");
            n(this).children("i").addClass("larry-fold7").removeClass("larry-unfold")
        } else {
            n("#larry_layout").addClass("larryms-fold").removeClass("larryms-unfold");
            n(this).children("i").addClass("larry-unfold").removeClass("larry-fold7")
        }
    });
    n("#larryTheme").on("click", function() {
        if (n("#larrymsThemes").length > 0) {
            return false
        }
        var e = l.open({
            type: 1,
            id: "larry_theme_R",
            title: false,
            anim: Math.ceil(Math.random() * 6),
            offset: "r",
            closeBtn: false,
            shade: .2,
            shadeClose: true,
            skin: "layui-anim layui-anim-rl larryms-layer-right",
            area: "320px",
            success: function(e, a) {
                layui.link(m);
                o.htmlRender(d, e)
            }
        })
    });
    var k = false;
    n("#msgBox").on("click", function() {
        if (!k) {
            n(".dropdown-menu-list").show().removeClass("pt-page-moveToTopFade").addClass("pt-page-moveFromTop");
            k = true
        } else {
            g(k);
            k = false
        }
        n("#viewMsg").on("click", function() {
            g(k);
            k = false
        });
        n(".msg-box .msg-item").on("click", function() {
            g(k);
            k = false
        })
    });
    n("#clearMsg").on("click", function() {
        g(k);
        k = false;
        n("#msgNums").text("").hide(800);
        n("#msgNums").removeClass().addClass("larry-badge-dot").show(800);
        o.noticeAllClose()
    });
    function g(e) {
        n(".dropdown-menu-list").removeClass("pt-page-moveFromTop").addClass("pt-page-moveToTopFade").fadeOut(300)
    }
    n("#clearCached").off("click").on("click", function() {
        o.cleanCached.clearAll();
        l.alert("缓存清除完成!本地存储数据也清理成功！", {
            icon: 1,
            title: "系统提示",
            end: function() {
                top.location.reload()
            }
        })
    });
    n("#logout").off("click").on("click", function() {
        var a = n(this).data("url");
        o.confirm("确定退出系统吗?", {}, function(e) {
            top.location.href = a
        }, function() {
            l.msg("成功返回系统", {
                time: 1e3,
                btnAlign: "c"
            })
        })
    });
    n("#lock").mouseover(function() {});
    n("#lock").off("click").on("click", function() {
        b()
    });
    function b() {
        var e = n("#user_photo").attr("src")
            , a = n("#uname").text();
        T({
            Display: "block",
            UserPhoto: e,
            UserName: a
        });
        layui.data("larryms", {
            key: "lockscreen",
            value: "locked"
        });
        _()
    }
    function w() {
        var e = n("#user_photo").attr("src")
            , a = n("#uname").text();
        if (n("#unlock_pass").val() === "larry") {
            T({
                Display: "none",
                UserPhoto: e,
                UserName: a
            })
        } else {
            l.tips("模拟锁屏，输入密码：larry 解锁", n("#unlock"), {
                tips: [2, "#FF5722"],
                time: 1e3
            });
            return
        }
    }
    n(document).keydown(function() {
        return C(arguments[0])
    });
    function C(e) {
        var a;
        if (window.event) {
            a = e.keyCode
        } else if (e.which) {
            a = e.which
        }
        if (e.altKey && a == 76) {
            b()
        }
    }
    function T(e) {
        var a = "larry_lock_screen"
            , l = document.createElement("div")
            , o = r(['<div class="lock-screen" style="display: {{d.Display}};">', '<div class="lock-wrapper" id="lock-screen">', '<div id="time"></div>', '<div class="lock-box">', '<img src="{{d.UserPhoto}}" alt="">', "<h1>{{d.UserName}}</h1>", '<form action="" class="layui-form lock-form">', '<div class="layui-form-item">', '<input type="password" id="unlock_pass" name="lock_password" lay-verify="pass" placeholder="锁屏状态，请输入密码解锁" autocomplete="off" class="layui-input"  autofocus="">', "</div>", '<div class="layui-form-item">', '<span class="layui-btn larry-btn" id="unlock">立即解锁</span>', "</div>", "</form>", "</div>", "</div>", "</div>"].join("")).render(e)
            , t = document.getElementById(a);
        l.id = a;
        l.innerHTML = o;
        t && u[0].removeChild(t);
        if (e.Display !== "none") {
            u[0].appendChild(l)
        } else {
            n("#larry_lock_screen").empty()
        }
        n("#unlock").off("click").on("click", function() {
            w();
            layui.data("larryms", {
                key: "lockscreen",
                value: "unlock"
            })
        });
        n("#unlock_pass").keypress(function(e) {
            if (window.event && window.event.keyCode == 13) {
                n("#unlock").click();
                return false
            }
        })
    }
    function _() {
        var e = new Date;
        var a = e.getHours();
        var l = e.getMinutes();
        var o = e.getSeconds();
        l = l < 10 ? "0" + l : l;
        o = o < 10 ? "0" + o : o;
        n("#time").html(a + ":" + l + ":" + o);
        t = setTimeout(function() {
            _()
        }, 500)
    }
    n(top.document.body).one("click", function() {
        if (!n(this).hasClass("notice-trigger")) {
            //S();yb屏蔽通知
            n(this).addClass("notice-trigger")
        }
    });
    function S() {
        setTimeout(function() {
            o.notice({
                msg: "消息通知：点我在选项卡中打开百度Echarts页面！",
                url: "/html/library/charts/echarts.html"
            }, {
                action: 3,
                navid: 75,
                navgroup: 1,
                navtitle: "百度Echarts",
                navfont: "larry-icon",
                navicon: "larry-moxing"
            })
        }, 5e3);
        setTimeout(function() {
            o.notice({
                msg: "重要消息：点我在新窗口查看，也可以右上角点X无视！",
                url: "https://www.larryms.com/cates/5.html",
                msgtype: "danger"
            }, {
                action: 4
            })
        }, 9e3);
        setTimeout(function() {
            o.notice({
                msg: "您收到1条测试消息，请点击查看!",
                url: "/html/use/notice.html",
                msgtype: "custom",
                color: "#fff",
                bgcolor: "#1E9FFF"
            }, {
                action: 3,
                navid: 89,
                navgroup: 0,
                navtitle: "消息推送功能",
                navfont: "larry-icon",
                navicon: "larry-info",
                font: "fa",
                icon: "fa-flag-checkered"
            })
        }, 13e3);
        setTimeout(function() {
            o.notice({
                msg: "LarryMS框架演示中默认关闭了Tab选项卡的加载动画，Tab选项卡切换刷新等功能，可在浏览一遍之后，通过主题设置中开启默认关闭的设置，对比效果。本月2.0.9版本将是重量级更新【如tree组件、模板系列等】！",
                msgtype: "custom",
                color: "#fff",
                bgcolor: "#01CED1"
            }, {
                hide: "click",
                font: "fa",
                icon: "fa-universal-access"
            })
        }, 18e3);
        setTimeout(function() {
            o.notice({
                msg: "我没有声音，我可以自动隐藏！",
                msgtype: "success"
            }, {
                audio: false
            })
        }, 25e3)
    }
    e("indexb", {})
});
