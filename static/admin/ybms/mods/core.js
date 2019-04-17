layui.define(["larryms", "larryMenu", "element"], function(e) {
	var l = layui.$,
		c = layui.larryms,
		d = layui.larryMenu(),
		u = "tabIframe",
		n = layui.element,
		f = "none";
	l("*[lay-tips]").on("mouseenter", function() {
		var e = l(this).attr("lay-tips");
		this.index = c.tips('<div style="padding: 10px; font-size: 14px; color: #eee;">' + e + "</div>", this, {
			time: -1,
			maxWidth: 280,
			tips: [1, "#000"]
		})
	}).on("mouseleave", function() {
		c.close(this.index)
	});
	var t = layui.device();
	if (t.ios) {
		var a = l(window.top).width();
		if (a >= 768 && a < 1200) {
			if (window.top !== window.self) {
				var i = l("#larry_tab_content", window.parent.document).children(".layui-show").children("iframe");
				if (l("table")) {
					l("body").width(i.width() + "px");
					window.onresize = function() {
						l("body").width(i.width() + "px")
					}
				}
			}
		} else if (a < 768) {
			if (l("table")) {
				l("body").width(window.screen.width + "px");
				window.onresize = function() {
					l("body").width(window.screen.width + "px")
				}
			}
		}
	}
	var r = l("#larry_layout"),
		o = "",
		s = [
			[{
				text: "刷新当前页",
				func: function() {
					if (top == self) {
						if (r.length) {
							c.confirm("您确定要重新加载系统吗！", {}, function() {
								top.document.location.reload()
							}, function() {
								return
							})
						} else {
							document.location.reload()
						}
					} else {
						if (layui.cache.layertype !== undefined && layui.cache.layertype == 2) {
							var e = parent.layer.getFrameIndex(window.name),
								t = l("#layui-layer-iframe" + e),
								a = t.context.URL;
							parent.layer.iframeSrc(e, a)
						} else {
							l(".layui-tab-content .layui-tab-item", parent.document).each(function() {
								if (l(this).hasClass("layui-show")) {
									l(this).children("iframe").attr("src", l(this).children("iframe").attr("src"));
									return false
								}
							})
						}
					}
				}
			}, {
				text: "重载主框架",
				func: function() {
					top.document.location.reload()
				}
			}, {
				text: "设置系统主题",
				func: function() {
					if (top.document.getElementById("larryTheme") !== null) {
						top.document.getElementById("larryTheme").click()
					} else {
						c.error("当前页面不支持主题设置或请登陆系统后设置系统主题", c.tit[0], 2)
					}
				}
			}, {
				text: "选项卡常用操作",
				data: [
					[{
						text: "定位当前选项卡",
						func: function() {
							if (top.document.getElementById("tabCtrD") !== null) {
								top.document.getElementById("tabCtrD").click()
							} else {
								c.error("请先登陆系统，此处无选项卡操作", c.tit[0])
							}
						}
					}, {
						text: "关闭当前选项卡",
						func: function() {
							if (top.document.getElementById("tabCtrA") !== null) {
								top.document.getElementById("tabCtrA").click()
							} else {
								c.error("请先登陆系统，此处无选项卡操作", c.tit[0], 2)
							}
						}
					}, {
						text: "关闭其他选项卡",
						func: function() {
							if (top.document.getElementById("tabCtrB") !== null) {
								top.document.getElementById("tabCtrB").click()
							} else {
								c.error("请先登陆系统，此处无选项卡操作", c.tit[0], 2)
							}
						}
					}, {
						text: "关闭全部选项卡",
						func: function() {
							if (top.document.getElementById("tabCtrC") !== null) {
								top.document.getElementById("tabCtrC").click()
							} else {
								c.error("请先登陆系统，此处无选项卡操作", c.tit[0], 2)
							}
						}
					}]
				]
			}, {
				text: "清除缓存",
				func: function() {
					top.document.getElementById("clearCached").click()
				}
			}],
			[{
				text: "访问larryMS官网",
				func: function() {
					top.window.open("https://www.larryms.com")
				}
			}]
		],
		y = [
			[{
				text: "刷新当前页",
				func: function() {
					if (top == self) {
						if (r.length) {
							c.confirm("您确定要重新加载系统吗！", {}, function() {
								top.document.location.reload()
							}, function() {
								return
							})
						} else {
							document.location.reload()
						}
					} else {
						if (layui.cache.layertype !== undefined && layui.cache.layertype == 2) {
							var e = parent.layer.getFrameIndex(window.name),
								t = l("#layui-layer-iframe" + e),
								a = t.context.URL;
							parent.layer.iframeSrc(e, a)
						} else {
							l(".layui-tab-content .layui-tab-item", parent.document).each(function() {
								if (l(this).hasClass("layui-show")) {
									l(this).children("iframe").attr("src", l(this).children("iframe").attr("src"));
									return false
								}
							})
						}
					}
				}
			}, {
				text: "重载主框架",
				func: function() {
					top.document.location.reload()
				}
			}, {
				text: "设置系统主题",
				func: function() {
					if (top.document.getElementById("larryTheme") !== null) {
						top.document.getElementById("larryTheme").click()
					} else {
						c.error("当前页面不支持主题设置或请登陆系统后设置系统主题", c.tit[0], 2)
					}
				}
			}, {
				text: "清除缓存",
				func: function() {
					top.document.getElementById("clearCached").click()
				}
			}],
			[{
				text: "访问larryMS官网",
				func: function() {
					top.window.open("https://www.larryms.com")
				}
			}]
		],
		m = [
			[{
				text: "刷新当前页",
				func: function() {
					if (top == self) {
						if (r.length) {
							c.confirm("您确定要重新加载系统吗！", {}, function() {
								top.document.location.reload()
							}, function() {
								return
							})
						} else {
							document.location.reload()
						}
					} else {
						if (layui.cache.layertype !== undefined && layui.cache.layertype == 2) {
							var e = parent.layer.getFrameIndex(window.name),
								t = l("#layui-layer-iframe" + e),
								a = t.context.URL;
							parent.layer.iframeSrc(e, a)
						} else {
							l(".layui-tab-content .layui-tab-item", parent.document).each(function() {
								if (l(this).hasClass("layui-show")) {
									l(this).children("iframe").attr("src", l(this).children("iframe").attr("src"));
									return false
								}
							})
						}
					}
				}
			}, {
				text: "清除缓存",
				func: function() {
					c.cleanCached.clearAll()
				}
			}],
			[{
				text: "访问larryMS官网",
				func: function() {
					top.window.open("https://www.larryms.com")
				}
			}]
		];
	if (window.top == window.self) {
		if (l("#larry_layout").length > 0) {
			var p = l("#larry_layout").data("layout");
			if (p === "nonetab") {
				o = y;
				u = "nonetabPage"
			} else {
				o = s;
				u = "tabPage"
			}
		} else {
			o = m;
			u = "noneNeed";
			f = "iframeOrPage"
		}
	} else {
		$topLayout = l("#larry_layout", window.parent.document);
		if ($topLayout.length > 0) {
			if ($topLayout.data("layout") == "nonetab") {
				o = y;
				u = "nonetabIframe"
			} else {
				o = s;
				u = "tabIframe"
			}
			f = "iframe"
		}
	}
	var h = function() {
		this.config = {
			menuData: o
		}, this.tabScene = u
	};
	h.prototype.set = function(e) {
		var t = this;
		l.extend(true, t.config, e);
		return t
	};
	h.prototype.rightMenu = function(e) {
		var t = this,
			a = t.config;
		d.ContentMenu(a.menuData, {
			name: "body"
		}, l("body"));
		if (window.top === window.self) {
			var n = l("#larry_tab_content");
			if (n.length !== 0) {
				n.mouseenter(function() {
					d.remove()
				})
			}
		} else {
			if (layui.cache.layertype !== undefined && layui.cache.layertype == 2) {
				l("iframe", parent.document).mouseout(function() {
					d.remove()
				})
			}
			var i = l("#larry_tab_content", window.parent.document);
			i.mouseout(function() {
				d.remove()
			})
		}
	};
	h.prototype.tab = {
		addTab: function(e, t) {
			if (window.top == window.self) {
				if (t == "page") {
					larryTab.tabAdd(e)
				}
			} else {
				if (t == "iframe") {
					top.larryTab.tabAdd(e)
				}
			}
		},
		noneTabOpen: function(e, t) {
			if (c.typeFn.isString(e.id) && e.id !== "homeID") {
				e.id = e.id.indexOf("larry-") !== -1 ? e.id : "larry-" + e.id
			} else {
				e.id = "larry-" + e.id
			}
			top.larryTab.noneTabOpen(e);
			if (e.id !== "larry-undefined") {
				top.larryTab.navPosition(e.id, e.group)
			}
		}
	};
	h.prototype.tabOperate = function(e, t, a) {
		var n = this,
			t = t || u;
		if (t == "nonetabIframe" || t == "nonetabPage") {
			n.tab.noneTabOpen(e, a)
		} else {
			n.tab.addTab(e, a)
		}
	};
	h.prototype.crumbs = function() {
		var e = this,
			t = false;
		if (layui.cache.pageCrumbs == undefined) {
			t = c.configure.pageCrumbs
		} else {
			t = layui.cache.pageCrumbs
		}
		if (t) {
			if (layui.cache.separator) {
				var a = top.larryTab.crumbs(layui.cache.separator)
			} else {
				var a = top.larryTab.crumbs()
			}
			l("body").prepend(a);
			n.render("breadcrumb", "larrymsCrumbs")
		} else {}
	};
	h.prototype.init = function() {
		var i = this,
			e = i.config;
		i.tabScene = u;
		if (u !== "noneNeed") {
			if (u == "nonetabIframe") {
				var t = l("#larry_tab_content", window.parent.document).children(".layui-tab-item"),
					a = l("#larryms_left_menu .larryms-this", window.parent.document).children("a").data("id"),
					n = t.attr("data-id") == "larry-undefined" ? "homeID" : t.attr("data-id"),
					r = t.attr("data-group") == "undefined" ? 0 : t.attr("data-group");
				if (n != "homeID") {
					if (a !== n) {
						top.larryTab.navPosition(n, r)
					}
				}
			}
			l("[larry-tab]").on("click", function() {
				var e = l(this).attr("larry-tab");
				var t = (new Date).getTime();
				t = t + "-" + Math.floor(Math.random() * 10 + 1);
				if (e !== undefined && e !== "") {
					var a;
					if (l(this).data("group") !== undefined) {
						a = l(this).data("group")
					} else {
						a = "larry-temp"
					}
					if (e == "page") {
						var n = {
							href: l(this).data("url"),
							id: l(this).data("id") != undefined ? l(this).data("id") : "larry-" + t,
							font: l(this).children("i").data("font"),
							icon: l(this).children("i").data("icon"),
							group: a,
							title: l(this).children("cite").text() || l(this).data("text"),
							addType: "page"
						};
						if (u === "tabPage") {
							i.tab.addTab(n, "page")
						} else if (u === "nonetabPage") {
							i.tab.noneTabOpen(n, "page")
						}
					} else if (e == "iframe") {
						var n = {
							href: l(this).data("url"),
							id: l(this).data("id") != undefined ? l(this).data("id") : "larry-" + t,
							font: l(this).data("font"),
							icon: l(this).data("icon"),
							group: a,
							title: l(this).find("cite").text() || l(this).data("text"),
							addType: "iframe"
						};
						if (u === "tabIframe") {
							i.tab.addTab(n, "iframe")
						} else if (u === "nonetabIframe") {
							i.tab.noneTabOpen(n, "iframe")
						}
					} else {
						c.error("请检查页面中含有larry-tab属性的元素，未正确设置参数格式：目前仅支持：page|iframe两种类别", c.tit[1], 2)
					}
				} else {
					c.error("请检查页面中含有larry-tab属性的元素，未设置任何值：目前仅支持：page|iframe两种类别", c.tit[1], 2)
				}
			})
		}
		var o = c.configure.rightMenu;
		if (layui.cache.rightMenu !== undefined) {
			o = layui.cache.rightMenu
		}
		if (o == "none" || o == false) {
			d.remove();
			d = null
		} else if (o == true) {
			i.rightMenu(e.menuData)
		} else if (o == "custom") {
			i.rightMenu(e.menuData)
		}
		if (f !== "none") {
			i.crumbs()
		}
	};
	var _hmt = _hmt || [];

	var b = new h;
	b.init();
	e("core", function(e) {
		return b.set(e)
	})
});