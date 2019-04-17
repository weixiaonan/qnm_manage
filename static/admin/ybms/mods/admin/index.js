var larryTab;
layui.define(["jquery", "configure", "larryTab", "form", "admin", "element"], function(e) {
	var r = layui.$,
		a = layui.configure,
		l = layui.layer,
		n = layui.laytpl,
		o = layui.larryms,
		i = layui.admin,
		s = layui.form,
		c = r(window),
		u = r("body"),
		f = r("#larry_layout"),
		m = a.basePath + "lib/templets/style/theme.css",
		d = "lib/templets/theme";
	larryTab = layui.larryTab({
		tab_elem: "#larry_tab",
		tabMax: 130,
		spreadOne: true
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
			var e = layui.data("larryms").systemSet === undefined ? false : layui.data("larryms").systemSet.tabCache;
			if (e) {
				larryTab.session(function(e) {
					if (e.getItem("tabMenu")) {
						r("#larry_tab_title li.layui-this").trigger("click")
					}
				})
			}
		};
	if (window.top == window.self) {
		y()
	}
	window.onresize = function() {
		i.responeDevice()
	};
	var p = layui.data("larryms").lockscreen,
		v = layui.data("larryms").systemSet;
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
	r("#menufold").on("click", function() {
		if (r("#larry_layout").hasClass("larryms-fold")) {
			r("#larry_layout").addClass("larryms-unfold").removeClass("larryms-fold");
			r(this).children("i").addClass("larry-fold7").removeClass("larry-unfold")
		} else {
			r("#larry_layout").addClass("larryms-fold").removeClass("larryms-unfold");
			r(this).children("i").addClass("larry-unfold").removeClass("larry-fold7")
		}
	});
	r("#larryTheme").on("click", function() {
		if (r("#larrymsThemes").length > 0) {
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
	r("#msgBox").on("click", function() {
		if (!k) {
			r(".dropdown-menu-list").show().removeClass("pt-page-moveToTopFade").addClass("pt-page-moveFromTop");
			k = true
		} else {
			g(k);
			k = false
		}
		r("#viewMsg").on("click", function() {
			g(k);
			k = false
		});
		r(".msg-box .msg-item").on("click", function() {
			g(k);
			k = false
		})
	});
	r("#clearMsg").on("click", function() {
		g(k);
		k = false;
		r("#msgNums").text("").hide(800);
		r("#msgNums").removeClass().addClass("larry-badge-dot").show(800);
		o.noticeAllClose()
	});

	function g(e) {
		r(".dropdown-menu-list").removeClass("pt-page-moveFromTop").addClass("pt-page-moveToTopFade").fadeOut(300)
	}
	r("#clearCached").off("click").on("click", function() {
		o.cleanCached.clearAll();
		l.alert("缓存清除完成!本地存储数据也清理成功！", {
			icon: 1,
			title: "系统提示",
			end: function() {
				top.location.reload()
			}
		})
	});
	r("#logout").off("click").on("click", function() {
		var a = r(this).data("url");
		o.confirm("确定退出系统吗?", {}, function(e) {
			top.location.href = a
		}, function() {
			l.msg("成功返回系统", {
				time: 1e3,
				btnAlign: "c"
			})
		})
	});
	r("#lock").mouseover(function() {});
	r("#lock").off("click").on("click", function() {
		b()
	});

	function b() {
		var e = r("#user_photo").attr("src"),
			a = r("#uname").text();
		_({
			Display: "block",
			UserPhoto: e,
			UserName: a
		});
		layui.data("larryms", {
			key: "lockscreen",
			value: "locked"
		});
		T()
	}
	function w() {
		var e = r("#user_photo").attr("src"),
			a = r("#uname").text();
		if (r("#unlock_pass").val() === "larry") {
			_({
				Display: "none",
				UserPhoto: e,
				UserName: a
			})
		} else {
			l.tips("模拟锁屏，输入密码：larry 解锁", r("#unlock"), {
				tips: [2, "#FF5722"],
				time: 1e3
			});
			return
		}
	}
	r(document).keydown(function() {
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
	function _(e) {
		var a = "larry_lock_screen",
			l = document.createElement("div"),
			t = n(['<div class="lock-screen" style="display: {{d.Display}};">', '<div class="lock-wrapper" id="lock-screen">', '<div id="time"></div>', '<div class="lock-box">', '<img src="{{d.UserPhoto}}" alt="">', "<h1>{{d.UserName}}</h1>", '<form action="" class="layui-form lock-form">', '<div class="layui-form-item">', '<input type="password" id="unlock_pass" name="lock_password" lay-verify="pass" placeholder="锁屏状态，请输入密码解锁" autocomplete="off" class="layui-input"  autofocus="">', "</div>", '<div class="layui-form-item">', '<span class="layui-btn larry-btn" id="unlock">立即解锁</span>', "</div>", "</form>", "</div>", "</div>", "</div>"].join("")).render(e),
			o = document.getElementById(a);
		l.id = a;
		l.innerHTML = t;
		o && u[0].removeChild(o);
		if (e.Display !== "none") {
			u[0].appendChild(l)
		} else {
			r("#larry_lock_screen").empty()
		}
		r("#unlock").off("click").on("click", function() {
			w();
			layui.data("larryms", {
				key: "lockscreen",
				value: "unlock"
			})
		});
		r("#unlock_pass").keypress(function(e) {
			if (window.event && window.event.keyCode == 13) {
				r("#unlock").click();
				return false
			}
		})
	}
	function T() {
		var e = new Date;
		var a = e.getHours();
		var l = e.getMinutes();
		var o = e.getSeconds();
		l = l < 10 ? "0" + l : l;
		o = o < 10 ? "0" + o : o;
		r("#time").html(a + ":" + l + ":" + o);
		t = setTimeout(function() {
			T()
		}, 500)
	}
	r(top.document.body).one("click", function() {
		if (!r(this).hasClass("notice-trigger")) {
			//S();屏蔽通知
			r(this).addClass("notice-trigger")
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
		}, 3000);
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
	e("index", {})
});