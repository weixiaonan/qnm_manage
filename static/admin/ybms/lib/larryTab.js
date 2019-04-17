layui.define(["larryms", "larryElem"], function(e) {
	var h = layui.$,
		y = layui.larryElem,
		v = layui.larryms,
		u = layui.layer,
		a = "larryTab",
		b = {},
		C = 0,
		t = new Array,
		r = function() {
			this.config = {
				data: undefined,
				url: undefined,
				type: "POST",
				cached: true,
				top_menu: "#larryms_top_menu",
				spreadOne: false,
				topFilter: "TopMenu",
				left_menu: "#larryms_left_menu",
				leftFilter: "LarrySide",
				tab_elem: "#larry_tab",
				tabFilter: "larryTab",
				tabSession: true,
				closed: true,
				tabMax: 25,
				autoRefresh: true,
				contextMenu: true,
				tabShow: true,
				pageEffect: v.pageAnim,
				isPageEffect: false,
				gobal_caches: "undefined"
			}, this.larrymsCache = {
				navHtml: undefined,
				tab: undefined
			}
		},
		f = function() {
			h("body").on("selectstart", function() {
				return false
			});
			h("#buttonRCtrl").find("dd").each(function() {
				h(this).on("click", function() {
					var e = h(this).children("a").attr("data-eName");
					c.tabCtrl(e)
				})
			});
			h("#larryms_refresh").off("click").on("click", function() {
				var e = h("#larry_tab_content").children(".layui-show").children("iframe");
				if (h(this).hasClass("refreshThen")) {
					h(this).removeClass("refreshThen");
					e.attr("src", e.attr("src"));
					setTimeout(function() {
						h("#larryms_refresh").addClass("refreshThen")
					}, 500)
				} else {
					v.msg("您在半秒内连续点击速度过快，为降低服务器压力，请稍后再试")
				}
			})
		},
		p = {
			larryMenuClick: function() {
				var e = "#larryms_top_menu",
					a = h(e).find("li.larryms-this").children("a").data("group");
				var t = a !== undefined ? a : "0";
				c.on("click(LarrySide)", t, function(e) {
					c.tabAdd(e.field)
				})
			},
			larryMenuClickNoneTab: function() {
				var e = "#larryms_top_menu",
					a = h(e).find("li.larryms-this").children("a").data("group");
				var t = a !== undefined ? a : "0";
				c.on("click(LarrySide)", t, function(e) {
					c.noneTabOpen(e.field)
				})
			}
		};
	r.prototype.set = function(e) {
		var a = this;
		h.extend(true, a.config, e);
		return a
	};
	r.prototype.menuSet = function(e) {
		var a = this;
		if (!e.hasOwnProperty("url") && !e.hasOwnProperty("data")) {
			return v.error("数据源解析出错：请设置data或url参数，否则导航菜单无法正常初始化！", v.tit[1])
		}
		var t = ["data", "url", "type", "cached", "spreadOne", "top_menu", "topFilter", "left_menu", "leftFilter"];
		var r = v.configFilter(e, t);
		a.set(r)
	};
	r.prototype.menu = function() {
		var r = this,
			e = r.config;
		if (e.url === undefined && e.data === undefined) {
			return v.error("请为菜单项配置数据源[data || url]", v.tit[1])
		}
		if (e.data !== undefined && typeof e.data === "object") {
			r.larryCompleteMenu(e.data.data);
			y.render()
		} else {
			if (e.url !== undefined) {
				var a = h.ajax({
					type: e.type,
					url: e.url,
					async: false,
					dataType: "json",
					success: function(e, a, t) {
						r.larryCompleteMenu(e.data)
					},
					error: function(e, a, t) {
						return v.error("larryMS Error:" + t, v.tit[1])
					},
					complete: function() {
						y.render()
					}
				})
			}
		}
		return r
	};
	r.prototype.larryCompleteMenu = function(e) {
		var a = this,
			t = a.config,
			r = v.elemCheck(t.top_menu, "top_menu"),
			i = v.elemCheck(t.left_menu, "left_menu");
		if (i !== "error" && t.top_menu !== false) {
			if (r != "undefined") {
				var n = o(e, "on");
				layui.data("larry_menu", {
					key: "navHtml",
					value: n
				});
				r.html(n.top);
				i.html(n.left[0]);
				t.top_menu = r;
				t.left_menu = i
			}
		} else {
			var n = o(e, "off");
			layui.data("larry_menu", {
				key: "navHtml",
				value: n
			});
			i.html(n);
			t.left_menu = i
		}
	};
	r.prototype.on = function(e, a, s) {
		var t = this,
			r = t.config,
			i = v.eventsCheck(e),
			d = a !== undefined ? a : "0";
		if (i.eventName === "click" && i.filter === r.topFilter) {
			r.left_menu.empty();
			r.left_menu.attr("data-group", d);
			r.left_menu.html(layui.data("larry_menu").navHtml.left[d]);
			y.render("nav");
			return "success"
		}
		if (i.eventName === "click" && i.filter === r.leftFilter) {
			var n = r.left_menu.find("li");
			n.each(function() {
				var l = h(this),
					e = l.find("dl"),
					a = l.find(".grandson");
				if (r.spreadOne) {
					l.on("click", function() {
						if (l.hasClass("larryms-nav-itemed")) {
							l.siblings().removeClass("larryms-nav-itemed")
						}
					})
				}
				if (e.length > 0) {
					e.children("dd").each(function() {
						var l = h(this);
						h(this).on("click", function() {
							if (!l.hasClass("grandson")) {
								var e = h(this).children("a"),
									a = e.data("id"),
									t = e.data("url"),
									r = e.children("i:first").data("font"),
									i = e.children("i:first").data("icon"),
									n = e.children("cite").text(),
									o = {
										elem: e,
										field: {
											id: a,
											href: t,
											font: r,
											icon: i,
											title: n,
											group: d,
											addType: "nav"
										}
									};
								s(o)
							}
						})
					})
				} else {
					l.on("click", function() {
						var e = l.children("a"),
							a = e.data("id"),
							t = e.data("url"),
							r = e.children("i:first").data("font"),
							i = e.children("i:first").data("icon"),
							n = e.children("cite").text(),
							o = {
								elem: e,
								field: {
									id: a,
									href: t,
									font: r,
									icon: i,
									title: n,
									group: d,
									addType: "nav"
								}
							};
						s(o)
					})
				}
			})
		}
	};
	r.prototype.tabInit = function() {
		var e = this,
			a = e.config;
		$container = v.elemCheck(a.tab_elem, "tab_elem");
		a.tab_elem = $container;
		b.titleBox = $container.children("#larryms_title").children("ul.larryms-tab-title");
		b.contentBox = $container.children(".larryms-tab-content");
		b.tabFilter = $container.attr("lay-filter");
		b.tabCtrBox = $container.find("#buttonRCtrl");
		return e
	};
	r.prototype.tabSet = function(e) {
		var a = this,
			t = ["tab_elem", "tabFilter", "tabSession", "closed", "tabMax", "autoRefresh", "tabShow", "pageEffect", "isPageEffect"];
		var r = v.configFilter(e, t);
		h.extend(a.config, r);
		return a
	};
	r.prototype.exists = function(l, s, d, f) {
		var p = -1,
			e = b.titleBox === undefined ? this.tabInit() : this;
		b.titleBox.find("li").each(function(e, a) {
			var t = h(this).children("cite"),
				r = h(this).data("id"),
				i = h(this).attr("id"),
				n = h(this).data("url"),
				o = h(this).attr("lay-id");
			if (v.typeFn.isString(s)) {
				s = s.indexOf("larry-") !== -1 ? s : "larry-" + s
			} else {
				s = "larry-" + s
			}
			if (d !== undefined) {
				if (s !== undefined) {
					if (s === r) {
						if (f = "iframe") {
							if (t.text() === l && d !== n) {
								p = -2;
								return false
							}
						}
						if (t.text() === l) {
							p = e;
							return false
						} else if (d === n && (t.text().indexOf(l) !== -1 || l.indexOf(t.text()) !== -1)) {
							p = e;
							return false
						}
					} else {
						if (r === "larryms_home") {
							if (t.text() === l) {
								p = 0;
								return false
							}
						} else {
							if (t.text() === l && d === n) {
								p = e;
								return false
							} else if (d === n && (t.text().indexOf(l) !== -1 || l.indexOf(t.text()) !== -1)) {
								p = e;
								return false
							}
						}
					}
				} else {
					if (t.text() === l && d === n) {
						p = e;
						return false
					}
				}
			} else {
				if (s === r && t.text() === l) {
					p = e;
					return false
				}
			}
		});
		return p
	};
	r.prototype.getCurrentTabId = function() {
		var e = this,
			a = e.config;
		return h(a.tab_elem).find("ul.larryms-tab-title").children("li.layui-this").attr("lay-id")
	};
	r.prototype.getCurrentGroup = function() {
		var e = this,
			a = e.config;
		return h(a.top_menu).children("li.larryms-this").children("a").data("group")
	};
	r.prototype.getTabId = function(n, o, l) {
		var s = -1,
			e = b.titleBox === undefined ? this.tabInit() : this;
		b.titleBox.find("li").each(function(e, a) {
			var t = h(this).data("id"),
				r = h(this).data("url"),
				i = h(this).children("cite");
			if (l !== undefined) {
				if (o !== undefined) {
					if (t === o) {
						if (i.text() === n) {
							s = h(this).attr("lay-id");
							return false
						} else if (i.text().indexOf(n) !== -1 || n.indexOf(i.text()) !== -1) {
							s = h(this).attr("lay-id");
							return false
						}
					} else {
						if (t === "larryms_home") {
							if (i.text() === n) {
								s = 0;
								return false
							} else if (l === r && (i.text().indexOf(n) !== -1 || n.indexOf(i.text()) !== -1)) {
								s = 0;
								return false
							}
						}
					}
				} else {
					if (o === t && i.text() === n) {
						s = h(this).attr("lay-id");
						return false
					}
				}
			}
		});
		return s
	};
	r.prototype.noneTabOpen = function(t) {
		var e = this,
			a = e.config,
			r = "";
		if (v.typeFn.isString(t.id)) {
			t.id = t.id.indexOf("larry-") !== -1 ? t.id : "larry-" + t.id
		} else {
			t.id = "larry-" + t.id
		}
		if (!a.gobal_caches) {
			C++
		}
		r = '<iframe src="' + t.href + '" id="ifrtopMenu" data-id="' + t.id + '" lay-id="' + C + '" name="ifr_' + C + '" class="larryms-iframe"></iframe>';
		var i = h(".layui-tab[lay-filter='larryTab']"),
			n = i.children(".layui-tab-content");
		iframeContents = '<div class="layui-tab-item layui-show" data-href="' + t.href + '" data-group="' + t.group + '"  data-id="' + t.id + '" lay-id="' + C + '">' + (r || "") + "</div>";
		n.html(iframeContents);
		if (a.gobal_caches) {
			e.session(function(e) {
				var a = {
					href: t.href,
					group: t.group,
					id: t.id
				};
				e.setItem("iframePages", JSON.stringify(a))
			})
		}
	};
	r.prototype.tabAdd = function(r) {
		var e = this,
			n = e.config,
			a = "",
			t = "",
			o = r.addType === undefined ? "nav" : r.addType;
		if (v.typeFn.isString(r.id)) {
			r.id = r.id.indexOf("larry-") !== -1 ? r.id : "larry-" + r.id
		} else {
			r.id = "larry-" + r.id
		}
		var l = e.exists(r.title, r.id, r.href, o);
		if (l === -1) {
			if (n.tabMax !== "undefined") {
				var s = b.titleBox.children("li").length,
					d = n.tabMax.tipMsg || "为了保障系统流畅运行，当前默认只允许同时打开：" + n.tabMax + "个选项卡，可先关闭已打开的选项卡再继续浏览或请设置允许新增选项卡的最大个数";
				if (typeof n.tabMax === "number") {
					if (s === n.tabMax) {
						return v.error(d, v.tit[1], 2)
					}
				}
				if (typeof n.tabMax === "object" || typeof n.tabMax === "string") {
					if (s === n.tabMx.max) {
						return v.error(d, v.tit[1], 2)
					}
				}
			}
			if (!n.tabSession) {
				C++
			} else {
				e.session(function(e) {
					var a = JSON.parse(e.getItem("tabMenu"));
					if (a) {
						var t = new Array;
						for (i = 0; i < a.length; i++) {
							t[i] = a[i]["id"]
						}
						C = Math.max.apply(null, t);
						C++
					} else {
						C++
					}
				})
			}
			function f() {
				if (n.closed) {
					t += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + C + '">&#x1006;</i>'
				}
				a = '<iframe src="' + r.href + '" id="ifr' + C + '" data-group="' + r.group + '" data-id="' + r.id + '" lay-id="' + C + '" name="ifr_' + C + '" class="larryms-iframe"></iframe>';
				y.tabAdd(b.tabFilter, {
					title: t,
					content: a,
					id: C,
					larryID: r.id,
					url: r.href,
					group: r.group,
					flag: "nav"
				})
			}
			function p() {
				if (n.closed) {
					t += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + r.id + '">&#x1006;</i>'
				}
				a = '<iframe src="' + r.href + '" id="ifr' + C + '" data-group="' + r.group + '" data-id="' + r.id + '" lay-id="' + C + '" name="ifr_' + C + '" class="larryms-iframe"></iframe>';
				y.tabAdd(b.tabFilter, {
					title: t,
					content: a,
					id: C,
					larryID: r.id,
					url: r.href,
					group: r.group,
					flag: "navNone"
				})
			}
			if (r.font !== undefined) {
				if (r.icon !== undefined) {
					t += '<i class="' + r.font + " " + r.icon + '" data-icon="' + r.icon + '"></i>'
				}
			} else {
				t += '<i class="larry-icon ' + r.icon + '" data-icon="' + r.icon + '"></i>'
			}
			t += "<cite>" + r.title + "</cite>";
			var c;
			if (o === "nav") {
				c = "nav";
				f()
			} else {
				if (e.getNavTab(r.id, r.group)) {
					c = "nav";
					f()
				} else {
					if (r.group === "larry-temp") {
						var u = e.getCurrentGroup();
						r.group = u;
						if (r.id.indexOf("undefined") !== -1) {
							r.id = "larry-temp-" + C
						}
						c = "navNone";
						p()
					}
				}
			}
			e.tabChange(C, "off", "navNone", true);
			e.pageEffect(C, n.pageEffect);
			if (n.tabSession) {
				e.session(function(e) {
					var a = JSON.parse(e.getItem("tabMenu")) || [];
					var t = {
						title: r.title,
						href: r.href,
						font: r.font,
						icon: r.icon,
						closed: n.closed,
						group: r.group,
						id: C,
						larryID: r.id,
						addType: c
					};
					a.push(t);
					e.setItem("tabMenu", JSON.stringify(a));
					e.setItem("currentTabMenu", JSON.stringify(t))
				})
			}
		} else if (l == -2) {
			var g = e.getTabId(r.title, r.id, r.href),
				m = b.contentBox.find("iframe[lay-id='" + g + "']");
			m.attr("src", r.href);
			if (e.getNavTab(r.id, r.group)) {
				e.tabChange(g)
			} else {
				e.tabChange(g)
			}
			e.pageEffect(C, n.pageEffect)
		} else {
			var g = e.getTabId(r.title, r.id, r.href);
			if (e.getNavTab(r.id, r.group)) {
				e.tabChange(g)
			} else {
				e.tabChange(g)
			}
			e.pageEffect(C, n.pageEffect)
		}
	};
	r.prototype.getNavTab = function(i, e) {
		var a = this,
			t = h(a.config.top_menu),
			n = false;
		if (v.typeFn.isString(i)) {
			i = i.indexOf("larry-") !== -1 ? i : "larry-" + i
		} else {
			i = "larry-" + i
		}
		if (e < t.children("li").length) {
			t.children("li").eq(e).click()
		}
		var r = h(a.config.left_menu),
			o = r.find("a");
		h.each(o, function(e, a) {
			var t = h(a).data("id"),
				r = h(".larryms-nav-tree");
			if (t !== undefined && t === i) {
				r.find(".larryms-this").removeClass("larryms-this");
				r.find(".larryms-nav-itemed").removeClass("larryms-nav-itemed");
				r.find(".grandsoned").removeClass("grandsoned");
				if (h(a).parents("dd").hasClass("grandson")) {
					h(a).parents("li").addClass("larryms-nav-itemed");
					h(a).parents("dd.grandson").addClass("grandsoned");
					h(a).parent("dd").addClass("larryms-this")
				} else if (!h(a).parents("dd").hasClass("grandson") && h(a).parent("dd").length) {
					h(a).parents("li").addClass("larryms-nav-itemed");
					h(a).parent("dd").addClass("larryms-this")
				} else {
					h(a).parent("li").addClass("larryms-this")
				}
				n = true;
				return false
			}
		});
		return n
	};
	r.prototype.tabChange = function(i, e, a, t) {
		var r = this,
			e = e || "off",
			a = a || "navNone",
			t = t || false;
		if (r.config.tabSession) {
			r.session(function(e) {
				if (e.getItem("currentTabMenu") !== "undefined") {
					var a = JSON.parse(e.getItem("currentTabMenu"));
					if (!a) return false
				} else {
					return false
				}
				if (a.id != i) {
					var t = JSON.parse(e.getItem("tabMenu"));
					for (var r = 0; r < t.length; r++) {
						if (t[r].id == i) {
							e.setItem("currentTabMenu", JSON.stringify(t[r]));
							break
						}
					}
				}
			})
		}
		if (e === "on") {
			if (a === "nav") {
				var n = h(r.config.top_menu),
					o = h('#larry_tab_title li[lay-id="' + i + '"]'),
					l = o.data("id"),
					s = o.data("group");
				if (s < n.children("li").length) {
					n.children("li").eq(s).click()
				}
				var d = h(r.config.left_menu),
					f = d.find("a");
				if (l !== "larryms_home") {
					h.each(f, function(e, a) {
						var t = h(a).data("id"),
							r = h(".larryms-nav-tree");
						if (t !== undefined && t === l) {
							r.find(".larryms-this").removeClass("larryms-this");
							r.find(".larryms-nav-itemed").removeClass("larryms-nav-itemed");
							r.find(".grandsoned").removeClass("grandsoned");
							if (h(a).parents("dd").hasClass("grandson")) {
								h(a).parents("li").addClass("larryms-nav-itemed");
								h(a).parents("dd.grandson").addClass("grandsoned");
								h(a).parent("dd").addClass("larryms-this")
							} else if (!h(a).parents("dd").hasClass("grandson") && h(a).parent("dd").length) {
								h(a).parents("li").addClass("larryms-nav-itemed");
								h(a).parent("dd").addClass("larryms-this")
							} else {
								h(a).parent("li").addClass("larryms-this")
							}
							e = f.length - 1;
							return false
						}
					})
				}
			} else {}
		}
		y.tabChange(r.config.tabFilter, i, a).render();
		if (r.config.autoRefresh) {
			if (t !== true) {
				r.autoRefresh()
			}
		}
		r.tabAuto()
	};
	r.prototype.tabChangeBefore = function(e, a) {
		var t = this,
			a = a || Math.ceil(Math.random() * 67),
			r = b.contentBox.children(".layui-show")
	};
	r.prototype.autoRefresh = function() {
		var e = this;
		if (e.config.autoRefresh) {
			if (h("#homePage").children("iframe").length !== 0) {
				var a = b.contentBox.children(".layui-show").children("iframe");
				a.attr("src", a.attr("src"))
			}
		}
	};
	r.prototype.crumbs = function(e) {
		var a = this,
			t = a.config;
		var e = e || ">";
		var r = h(a.config.left_menu);
		var i = r.find(".larryms-this"),
			n = i.children("a");
		var o = {
			url: n.data("url"),
			id: n.data("id"),
			group: n.data("group"),
			text: n.children("cite").text()
		},
			l = {},
			s = {},
			d = {};
		var f = i[0].tagName;
		f = v.stringFn.changeCase(f);
		if (f !== "li") {
			if (f == "dd") {
				var p = i.parent().parent(),
					c = p[0].tagName;
				c = v.stringFn.changeCase(c);
				if (c == "dd") {
					d = {
						url: "none",
						id: p.children("a").data("id"),
						group: p.children("a").data("group"),
						text: p.children("a").children("cite").text()
					};
					$parentPrev = p.parent().parent();
					s = {
						url: "none",
						id: $parentPrev.children("a").data("id"),
						group: $parentPrev.children("a").data("group"),
						text: $parentPrev.children("a").children("cite").text()
					};
					l = u(l)
				} else if (c == "li") {
					s = {
						url: "none",
						id: p.children("a").data("id"),
						group: p.children("a").data("group"),
						text: p.children("a").children("cite").text()
					};
					l = u(l)
				}
			}
		} else {
			l = u(l)
		}
		function u(e) {
			$parentTopA = h(a.config.top_menu).children("li").eq(o.group).children("a");
			e = {
				url: "none",
				id: $parentTopA.data("id"),
				group: $parentTopA.data("group"),
				text: $parentTopA.text()
			};
			return e
		}
		var g = "";
		if (l.text != "") {
			g = '<a data-url="' + l.url + '" data-group="' + l.group + '" data-id="' + l.id + '">' + l.text + "</a>"
		}
		var g = '<a data-url="' + l.url + '" data-group="' + l.group + '" data-id="' + l.id + '">' + l.text + "</a>";
		if (JSON.stringify(s) !== "{}") {
			g += '<a larry-tab="iframe" data-url="' + s.url + '" data-group="' + s.group + '" data-id="' + s.id + '">' + s.text + "</a>"
		}
		if (JSON.stringify(d) !== "{}") {
			g += '<a larry-tab="iframe" data-url="' + d.url + '" data-group="' + d.group + '" data-id="' + d.id + '">' + d.text + "</a>"
		}
		g += '<a data-url="' + o.url + '" data-group="' + o.group + '" data-id="' + o.id + '">' + o.text + "</a>";
		var m = '<div class="larryms-crumbs"><span style="color:#888;font-size:14px;padding-right:3px;line-height:24px;">当前位置：</span><span class="larryms-crumb-nav layui-breadcrumb" lay-filter="larrymsCrumbs" lay-separator="' + e + '">' + g + "</span></div>";
		return m
	};
	r.prototype.pageEffect = function(e, a) {
		var t = this;
		var a = a || Math.ceil(Math.random() * 67),
			r = b.contentBox.children(".layui-show");
		if (t.config.isPageEffect == true) {
			var i = n(a);
			r.addClass(i.inClass)
		} else {
			r.removeClass().addClass("layui-tab-item layui-show")
		}
	};
	r.prototype.tabDelete = function(i) {
		var e = this;
		if (e.config.tabSession) {
			e.session(function(e) {
				var a = JSON.parse(e.getItem("tabMenu"));
				for (var t = 0; t < a.length; t++) {
					if (a[t].id == i) {
						a.splice(t, 1)
					}
				}
				e.setItem("tabMenu", JSON.stringify(a));
				var r = JSON.parse(e.getItem("currentTabMenu"));
				if (r.id == i) {
					e.setItem("currentTabMenu", JSON.stringify(a.pop()))
				}
			})
		}
		var a = y.tabDelete(e.config.tabFilter, i).render();
		e.tabChange(a.larryElem.LarryLayID, "on");
		e.tabAuto()
	};
	r.prototype.tabAuto = function(c) {
		var e = this;
		h("#larryms_title").each(function() {
			var l = h(this),
				s = l.children(".larryms-tab-title"),
				d = s.find(".layui-this"),
				e = s.children("#larryms_home"),
				f = l.find(".larryms-btn-default"),
				p = 0;
			s.find("li").each(function(e, a) {
				p += parseInt(h(a).outerWidth(true))
			});
			if (!s.find("li")[0]) return;
			h(window).off("resize").on("resize", function() {
				var a = parseInt(l.outerWidth(true) - 264),
					t = parseInt(d.outerWidth(true)),
					e = parseInt(d.position().left + 1),
					r = parseInt(s.css("marginLeft")),
					i = e + r,
					n = a - p;
				if (p > a) {
					f.removeClass("hide");
					l.addClass("larryms-tab-auto");
					if (r + e <= 0) {
						n = 0 - e
					} else {
						var o = a + Math.abs(r) - e - t;
						if (o <= 0) {
							n = a - e - t
						} else {
							n = a - e - t;
							if (c == 0) {
								if (n > 0) {
									n = 0
								}
							} else {
								if (n > 0) {
									n = 0
								}
							}
						}
					}
					s.css({
						marginLeft: n
					})
				} else {
					f.addClass("hide");
					l.removeClass("larryms-tab-auto");
					s.css({
						marginLeft: 0
					})
				}
				h(".larryms-btn-default").off("click").on("click", function() {
					if (p > a) {
						var e = parseInt(s.css("marginLeft"));
						if (h(this).attr("id") === "goLeft") {
							if (Math.abs(e) !== 0) {
								if (e + a < 0) {
									s.css({
										marginLeft: e + a
									})
								} else {
									s.css({
										marginLeft: 0
									})
								}
							} else {
								u.tips("已滚动到最左侧了", h(this), {
									tips: [1, "#FF5722"]
								})
							}
						}
						if (h(this).attr("id") === "goRight") {
							if (Math.abs(e) !== p - a) {
								if (Math.abs(e) + a >= p - t) {
									s.css({
										marginLeft: a - p
									})
								} else {
									s.css({
										marginLeft: e - a / 2
									})
								}
							} else {
								u.tips("已滚动到最右侧了", h(this), {
									tips: [1, "#FF5722"]
								})
							}
						}
					}
				})
			}).resize()
		})
	};
	r.prototype.navPosition = function(i, e) {
		var a = this,
			t = a.config;
		var r = h(a.config.top_menu);
		if (e < r.children("li").length) {
			r.children("li").eq(e).click()
		}
		var n = h(a.config.left_menu),
			o = n.find("a");
		if (i !== "homeID") {
			h.each(o, function(e, a) {
				var t = h(a).data("id"),
					r = h(".larryms-nav-tree");
				if (t !== undefined && t === i) {
					r.find(".larryms-this").removeClass("larryms-this");
					r.find(".larryms-nav-itemed").removeClass("larryms-nav-itemed");
					r.find(".grandsoned").removeClass("grandsoned");
					if (h(a).parents("dd").hasClass("grandson")) {
						h(a).parents("li").addClass("larryms-nav-itemed");
						h(a).parents("dd.grandson").addClass("grandsoned");
						h(a).parent("dd").addClass("larryms-this")
					} else if (!h(a).parents("dd").hasClass("grandson") && h(a).parent("dd").length) {
						h(a).parents("li").addClass("larryms-nav-itemed");
						h(a).parent("dd").addClass("larryms-this")
					} else {
						h(a).parent("li").addClass("larryms-this")
					}
					e = o.length - 1;
					return false
				}
			})
		} else {
			n.find("a:first").parent().addClass("larryms-this")
		}
	};
	r.prototype.recoveryNoneTabOpen = function(e) {
		var a = this,
			t = a.config;
		a.noneTabOpen(e)
	};
	r.prototype.recoveryTab = function(e) {
		var a = this,
			t = a.config;
		var r = e.addType === undefined ? "nav" : e.addType;
		if (v.typeFn.isString(e.LarryID)) {
			e.LarryID = e.LarryID.indexOf("larry") !== -1 ? e.LarryID : "larry-" + e.LarryID
		} else {
			e.LarryID = "larry-" + e.LarryID
		}
		var i = a.exists(e.title, e.LarryID, e.href);
		if (i === -1) {
			var n = "";
			if (e.font !== undefined) {
				if (e.icon !== undefined) {
					n += '<i class="' + e.font + " " + e.icon + '" data-icon="' + e.icon + '"></i>'
				}
			} else {
				n += '<i class="larry-icon ' + e.icon + '" data-icon="' + e.icon + '"></i>'
			}
			n += "<cite>" + e.title + "</cite>";
			if (t.closed) {
				n += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + e.id + '">&#x1006;</i>'
			}
			var o = '<iframe src="' + e.href + '" id="ifr' + e.id + '" data-group="' + e.group + '" data-id="' + e.LarryID + '" lay-id="' + e.id + '" name="ifr_' + e.id + '" class="larryms-iframe"></iframe>';
			y.tabAdd(b.tabFilter, {
				title: n,
				content: o,
				id: e.id,
				larryID: e.larryID,
				url: e.href,
				group: e.group,
				font: e.font,
				icon: e.icon,
				closed: e.closed,
				flag: r
			})
		} else {}
	};
	r.prototype.session = function(e) {
		if (!window.sessionStorage) {
			return false
		}
		e(window.sessionStorage)
	};
	r.prototype.tabCtrl = function(e) {
		var t = this,
			a = t.config,
			r = t.getCurrentTabId();
		switch (e) {
		case "positionCurrent":
			var i = h(a.tab_elem).find("ul.layui-tab-title").children("li.layui-this"),
				n = h(a.tab_elem).find('iframe[lay-id="' + r + '"]').attr("src"),
				o = i.children("i:first").data("font"),
				l = i.children("i:first").data("icon"),
				s = i.data("group"),
				d = i.data("id"),
				f = {
					title: i.children("cite").text(),
					href: n,
					font: o,
					icon: l,
					group: s,
					id: d
				};
			t.tabAdd(f);
			t.tabAuto(0);
			break;
		case "closeCurrent":
			if (r > 0) {
				t.tabDelete(r)
			} else {
				v.error("默认首页不能关闭的哦！", v.tit[0], 2)
			}
			break;
		case "closeOther":
			var p = h(a.tab_elem).find("ul.layui-tab-title").children("li"),
				c = p.length;
			if (c > 2) {
				p.each(function() {
					var e = h(this),
						a = e.attr("lay-id");
					if (a !== r && a !== undefined && a !== "0") {
						t.tabDelete(a)
					}
				})
			} else if (c == 2) {
				v.error("【默认首页】不能关闭，当前暂无其他可关闭选项卡！", v.tit[0], 2)
			} else {
				v.error("当前暂无其他可关闭选项卡！", v.tit[0], 2)
			}
			break;
		case "closeAll":
			var p = h(a.tab_elem).find("ul.layui-tab-title").children("li"),
				c = p.length;
			if (c > 1) {
				p.each(function() {
					var e = h(this),
						a = e.attr("lay-id");
					if (a > 0) {
						t.tabDelete(a)
					}
				})
			} else {
				v.error("当前暂无其他可关闭选项卡！", v.tit[0], 2)
			}
			break;
		case "refreshAdmin":
			v.confirm("您确定要重新加载系统吗！", function() {
				location.reload()
			}, function() {
				return
			});
			break
		}
	};
	r.prototype.render = function() {
		var o = this,
			t = o.config,
			e = t.top_menu !== undefined ? t.top_menu : "#larryms_top_menu",
			r = t.left_menu !== undefined ? t.left_menu : "#larryms_left_menu";
		if (h(".larryms-layout").data("layout") !== "nonetab") {
			if (t.top_menu !== undefined) {
				h(e).on("click", "li", function() {
					var e = h(this),
						a = e.children("a").data("group");
					c.on("click(" + t.topFilter + ")", a);
					h(r).off("mouseenter", p.larryMenuClick).one("mouseenter", p.larryMenuClick)
				})
			}
			h(r).one("mouseenter", p.larryMenuClick);
			h("#larry_tab").on("click", "#larry_tab_title li", function() {
				var e = h(this).attr("lay-id"),
					a = h(this).data("flag");
				o.tabChange(e, "on", a)
			});
			var a = layui.data("larryms").systemSet === undefined ? true : layui.data("larryms").systemSet.tabCache;
			if (!a) {
				t.tabSession = a;
				sessionStorage.removeItem("tabMenu");
				sessionStorage.removeItem("currentTabMenu")
			}
			var i = layui.data("larryms").systemSet === undefined ? false : layui.data("larryms").systemSet.tabCache;
			if (i) {
				o.session(function(e) {
					if (e.getItem("tabMenu")) {
						var a = JSON.parse(e.getItem("tabMenu"));
						h.each(a, function(e, a) {
							o.recoveryTab(a)
						});
						if (e.getItem("currentTabMenu") !== "undefined") {
							var t = JSON.parse(e.getItem("currentTabMenu"))
						} else {
							var t = {
								id: "0"
							}
						}
						if (t) {
							o.tabChange(t.id, "on");
							o.tabAuto(1)
						} else {
							o.tabChange(a[0].id, "on");
							o.tabAuto(1)
						}
						C = a.length
					} else {
						var r = h("#larry_tab_title li").eq(0);
						if (r.length) {
							var i = JSON.parse(e.getItem("tabMenu")) || [];
							var n = {
								font: r.children("i").data("font"),
								icon: r.children("i").data("icon"),
								title: r.find("cite").text() != undefined ? r.find("cite").text() : "后台首页",
								href: r.data("url"),
								id: r.attr("lay-id"),
								LarryID: r.data("id"),
								closed: false
							};
							i.push(n);
							e.setItem("tabMenu", JSON.stringify(i));
							e.setItem("currentTabMenu", JSON.stringify(n))
						}
					}
				})
			}
			h("#larry_tab").on("click", "#larry_tab_title li i.layui-tab-close", function() {
				if (t.closed) {
					o.tabDelete(h(this).parent("li").attr("lay-id"))
				}
			})
		} else {
			if (t.top_menu !== undefined) {
				h(e).on("click", "li", function() {
					var e = h(this),
						a = e.children("a").data("group");
					c.on("click(" + t.topFilter + ")", a);
					h(r).off("mouseenter", p.larryMenuClickNoneTab).one("mouseenter", p.larryMenuClickNoneTab)
				})
			}
			h(r).one("mouseenter", p.larryMenuClickNoneTab);
			var n = "",
				l = t.tabSession,
				s = v.configure.tabSession,
				d = layui.data("larryms").systemSet;
			if (d !== undefined) {
				n = d.tabCache
			} else {
				if (s !== "undefined") {
					n = s
				} else {
					n = l
				}
			}
			t.gobal_caches = n;
			if (n) {
				o.session(function(e) {
					if (e.getItem("iframePages")) {
						var a = JSON.parse(e.getItem("iframePages"));
						o.recoveryNoneTabOpen(a)
					} else {
						var t = h("#larry_tab_content").children(".layui-tab-item");
						if (t.attr("id") === "homePage") {
							var r = {
								href: layui.cache.homeUrl,
								LarryID: layui.cache.homeId !== undefined ? layui.cache.homeId : "homeID"
							};
							e.setItem("iframePages", JSON.stringify(r))
						}
					}
				})
			} else {}
		}
		f()
	};

	function o(e, a) {
		if (a == "on") {
			var t = {
				top: "",
				left: []
			};
			for (var r = 0; r < e.length; r++) {
				if (r == 0) {
					t.top += '<li class="larryms-nav-item larryms-this">'
				} else {
					t.top += '<li class="larryms-nav-item">'
				}
				t.top += '<a data-group="' + r + '" data-id="larry-' + e[r].id + '">';
				t.top += '<i class="' + e[r].font + " " + e[r].icon + '" data-icon="' + e[r].icon + '" data-font="' + e[r].font + '"></i>';
				t.top += "<cite>" + e[r].title + "</cite>";
				t.top += "</a>";
				t.top += "</li>";
				if (e[r].children !== undefined && e[r].children !== null && e[r].children.length > 0) {
					t.left[r] = "";
					var i = "";
					for (var n = 0; n < e[r].children.length; n++) {
						i = e[r].children[n];
						if (r == 0 && n == 0) {
							if (i.children !== undefined && i.children !== null && i.children.length > 0) {
								t.left[r] += '<li class="larryms-nav-item larryms-nav-itemed">'
							} else {
								t.left[r] += '<li class="larryms-nav-item larryms-this">'
							}
						} else if (i.spread && n != 0) {
							t.left[r] += '<li class="larryms-nav-item larryms-nav-itemed">'
						} else {
							t.left[r] += '<li class="larryms-nav-item">'
						}
						if (i.children !== undefined && i.children !== null && i.children.length > 0) {
							t.left[r] += '<a data-group="' + r + '" data-id="larry-' + i.id + '">';
							if (i.icon !== undefined && i.icon !== "") {
								if (i.font !== undefined && i.font !== "") {
									t.left[r] += '<i class="' + i.font + " " + i.icon + '" data-icon="' + i.icon + '" data-font="' + i.font + '"></i>'
								} else {
									t.left[r] += '<i class="larry-icon" data-icon="' + i.icon + '" data-font="larry-icon"></i>'
								}
							}
							t.left[r] += "<cite>" + i.title + "</cite>";
							t.left[r] += '<span class="larryms-nav-more"></span>';
							t.left[r] += "</a>";
							t.left[r] += '<dl class="larryms-nav-child">';
							var o = "";
							for (d = 0; d < i.children.length; d++) {
								o = i.children[d];
								if (o.children !== undefined && o.children !== null && o.children.length > 0) {
									t.left[r] += '<dd class="grandson">';
									t.left[r] += '<a data-group="' + r + '" data-id="larry-' + o.id + '">';
									if (o.icon !== undefined && o.icon !== "") {
										if (o.font !== undefined && o.font !== "") {
											t.left[r] += '<i class="' + o.font + " " + o.icon + '" data-icon="' + o.icon + '" data-font="' + o.font + '"></i>'
										} else {
											t.left[r] += '<i class="larry-icon" data-icon="' + o.icon + '" data-font="larry-icon"></i>'
										}
									}
									t.left[r] += "<cite>" + o.title + "</cite>";
									t.left[r] += '<span class="larryms-nav-more"></span>';
									t.left[r] += "</a>";
									t.left[r] += '<dl class="larryms-nav-child">';
									var l = "";
									for (var s = 0; s < o.children.length; s++) {
										l = o.children[s];
										t.left[r] += "<dd>";
										t.left[r] += l.url !== undefined && l.url !== "" ? '<a data-group="' + r + '" data-url="' + l.url + '" data-id="larry-' + l.id + '">' : '<a data-group="' + r + '" data-id="larry-' + l.id + '">';
										if (l.icon !== undefined && l.icon !== "") {
											if (l.font !== undefined && l.font !== "") {
												t.left[r] += '<i class="' + l.font + " " + l.icon + '" data-icon="' + l.icon + '" data-font="' + l.font + '"></i>'
											} else {
												t.left[r] += '<i class="larry-icon" data-icon="' + l.icon + '" data-font="larry-icon"></i>'
											}
										}
										t.left[r] += "<cite>" + l.title + "</cite>";
										t.left[r] += "</a>"
									}
									t.left[r] += "</dl>"
								} else {
									t.left[r] += "<dd>";
									t.left[r] += o.url !== undefined && o.url !== "" ? '<a data-group="' + r + '" data-url="' + o.url + '" data-id="larry-' + o.id + '">' : '<a data-group="' + r + '" data-id="larry-' + o.id + '">';
									if (o.icon !== undefined && o.icon !== "") {
										if (o.font !== undefined && o.font !== "") {
											t.left[r] += '<i class="' + o.font + " " + o.icon + '" data-icon="' + o.icon + '" data-font="' + o.font + '"></i>'
										} else {
											t.left[r] += '<i class="larry-icon" data-icon="' + o.icon + '" data-font="larry-icon"></i>'
										}
									}
									t.left[r] += "<cite>" + o.title + "</cite>";
									t.left[r] += "</a>"
								}
								t.left[r] += "</dd>"
							}
							t.left[r] += "</dl>"
						} else {
							t.left[r] += i.url !== undefined && i.url !== "" ? '<a data-group="' + r + '" data-url="' + i.url + '" data-id="larry-' + i.id + '">' : '<a data-group="' + r + '" data-id=larry-' + i.id + '">';
							if (i.icon !== undefined && i.icon !== "") {
								if (i.font !== undefined && i.font !== "") {
									t.left[r] += '<i class="' + i.font + " " + i.icon + '" data-icon="' + i.icon + '" data-font="' + i.font + '"></i>'
								} else {
									t.left[r] += '<i class="larry-icon" data-icon="' + i.icon + '" data-font="larry-icon"></i>'
								}
							}
							t.left[r] += "<cite>" + i.title + "</cite>";
							t.left[r] += "</a>"
						}
						t.left[r] += "</li>"
					}
				}
			}
		} else {
			var t = "";
			for (var r = 0; r < e.length; r++) {
				if (r == 0) {
					t += '<li class="larryms-nav-item">'
				} else {
					t += '<li class="larryms-nav-item">'
				}
				if (e[r].children !== undefined && e[r].children !== null && e[r].children.length > 0) {
					t += '<a data-id="larry-' + e[r].id + '">';
					if (e[r].icon !== undefined && e[r].icon !== null) {
						if (e[r].font !== undefined && e[r].font !== null) {
							t += '<i class="' + e[r].font + " " + e[r].icon + '" data-icon="' + e[r].icon + '" data-font="' + e[r].font + '"></i>'
						} else {
							t += '<i class="larry-icon" data-icon="' + e[r].icon + '" data-font="larry-icon"></i>'
						}
					}
					t += "<cite>" + e[r].title + "</cite>";
					t += '<span class="larryms-nav-more"></span>';
					t += "</a>";
					t += '<dl class="larryms-nav-child">';
					var i = "";
					for (var n = 0; n < e[r].children.length; n++) {
						i = e[r].children[n];
						if (i.children !== undefined && i.children !== null && i.children.length > 0) {
							t += '<dd class="grandson">';
							t += '<a data-id="larry-' + i.id + '">';
							if (i.icon !== undefined && i.icon !== "") {
								if (i.font !== undefined && i.font !== "") {
									t += '<i class="' + i.font + " " + i.icon + '" data-icon="' + i.icon + '" data-font="' + i.font + '"></i>'
								} else {
									t += '<i class="larry-icon" data-icon="' + i.icon + '" data-font="larry-icon"></i>'
								}
							}
							t += "<cite>" + i.title + "</cite>";
							t += '<span class="larryms-nav-more"></span>';
							t += "</a>";
							t += '<dl class="larryms-nav-child">';
							var o = "";
							for (var d = 0; d < i.children.length; d++) {
								o = i.children[d];
								t += "<dd>";
								t += o.url !== undefined && o.url !== "" ? '<a data-url="' + o.url + '" data-id="larry-' + o.id + '">' : '<a data-id="larry-' + o.id + '">';
								if (o.icon !== undefined && o.icon !== "") {
									if (o.font !== undefined && o.font !== "") {
										t += '<i class="' + o.font + " " + o.icon + '" data-icon="' + o.icon + '" data-font="' + o.font + '"></i>'
									} else {
										t += '<i class="larry-icon" data-icon="' + o.icon + '" data-font="larry-icon"></i>'
									}
								}
								t += "<cite>" + o.title + "</cite>";
								t += "</a>";
								t += "</dd>"
							}
							t += "</dl>"
						} else {
							t += "<dd>";
							t += i.url !== undefined && i.url !== "" ? '<a data-url="' + i.url + '" data-id="larry-' + i.id + '">' : '<a data-id="larry-' + i.id + '">';
							if (i.icon !== undefined && i.icon !== "") {
								if (i.font !== undefined && i.font !== "") {
									t += '<i class="' + i.font + " " + i.icon + '" data-icon="' + i.icon + '" data-font="' + i.font + '"></i>'
								} else {
									t += '<i class="larry-icon" data-icon="' + i.icon + '" data-font="larry-icon"></i>'
								}
							}
							t += "<cite>" + i.title + "</cite>";
							t += "</a>"
						}
						t += "</dd>"
					}
					t += "</dl>"
				} else {
					t += e[r].url !== undefined && e[r].url !== "" ? '<a data-url="' + e[r].url + '" data-id="larry-' + e[r].id + '">' : '<a data-id="larry-' + e[r].id + '">';
					if (e[r].icon !== undefined && e[r].icon !== "") {
						if (e[r].font !== undefined && e[r].font !== "") {
							t += '<i class="' + e[r].font + " " + e[r].icon + '" data-icon="' + e[r].icon + '" data-font="' + e[r].font + '"></i>'
						} else {
							t += '<i class="larry-icon" data-icon="' + e[r].icon + '" data-font="larry-icon"></i>'
						}
					}
					t += "<cite>" + e[r].title + "</cite>";
					t += "</a>"
				}
				t += "</li>"
			}
		}
		return t
	}
	function n(e) {
		var a = {},
			t = "",
			r = "";
		switch (e) {
		case 1:
			t = "pt-page-moveToLeft";
			r = "pt-page-moveFromRight";
			break;
		case 2:
			t = "pt-page-moveToRight";
			r = "pt-page-moveFromLeft";
			break;
		case 3:
			t = "pt-page-moveToTop";
			r = "pt-page-moveFromBottom";
			break;
		case 4:
			t = "pt-page-moveToBottom";
			r = "pt-page-moveFromTop";
			break;
		case 5:
			t = "pt-page-fade";
			r = "pt-page-moveFromRight pt-page-ontop";
			break;
		case 6:
			t = "pt-page-fade";
			r = "pt-page-moveFromLeft pt-page-ontop";
			break;
		case 7:
			t = "pt-page-fade";
			r = "pt-page-moveFromBottom pt-page-ontop";
			break;
		case 8:
			t = "pt-page-fade";
			r = "pt-page-moveFromTop pt-page-ontop";
			break;
		case 9:
			t = "pt-page-moveToLeftFade";
			r = "pt-page-moveFromRightFade";
			break;
		case 10:
			t = "pt-page-moveToRightFade";
			r = "pt-page-moveFromLeftFade";
			break;
		case 11:
			t = "pt-page-moveToTopFade";
			r = "pt-page-moveFromBottomFade";
			break;
		case 12:
			t = "pt-page-moveToBottomFade";
			r = "pt-page-moveFromTopFade";
			break;
		case 13:
			t = "pt-page-moveToLeftEasing pt-page-ontop";
			r = "pt-page-moveFromRight";
			break;
		case 14:
			t = "pt-page-moveToRightEasing pt-page-ontop";
			r = "pt-page-moveFromLeft";
			break;
		case 15:
			t = "pt-page-moveToTopEasing pt-page-ontop";
			r = "pt-page-moveFromBottom";
			break;
		case 16:
			t = "pt-page-moveToBottomEasing pt-page-ontop";
			r = "pt-page-moveFromTop";
			break;
		case 17:
			t = "pt-page-scaleDown";
			r = "pt-page-moveFromRight pt-page-ontop";
			break;
		case 18:
			t = "pt-page-scaleDown";
			r = "pt-page-moveFromLeft pt-page-ontop";
			break;
		case 19:
			t = "pt-page-scaleDown";
			r = "pt-page-moveFromBottom pt-page-ontop";
			break;
		case 20:
			t = "pt-page-scaleDown";
			r = "pt-page-moveFromTop pt-page-ontop";
			break;
		case 21:
			t = "pt-page-scaleDown";
			r = "pt-page-scaleUpDown pt-page-delay300";
			break;
		case 22:
			t = "pt-page-scaleDownUp";
			r = "pt-page-scaleUp pt-page-delay300";
			break;
		case 23:
			t = "pt-page-moveToLeft pt-page-ontop";
			r = "pt-page-scaleUp";
			break;
		case 24:
			t = "pt-page-moveToRight pt-page-ontop";
			r = "pt-page-scaleUp";
			break;
		case 25:
			t = "pt-page-moveToTop pt-page-ontop";
			r = "pt-page-scaleUp";
			break;
		case 26:
			t = "pt-page-moveToBottom pt-page-ontop";
			r = "pt-page-scaleUp";
			break;
		case 27:
			t = "pt-page-scaleDownCenter";
			r = "pt-page-scaleUpCenter pt-page-delay400";
			break;
		case 28:
			t = "pt-page-rotateRightSideFirst";
			r = "pt-page-moveFromRight pt-page-delay200 pt-page-ontop";
			break;
		case 29:
			t = "pt-page-rotateLeftSideFirst";
			r = "pt-page-moveFromLeft pt-page-delay200 pt-page-ontop";
			break;
		case 30:
			t = "pt-page-rotateTopSideFirst";
			r = "pt-page-moveFromTop pt-page-delay200 pt-page-ontop";
			break;
		case 31:
			t = "pt-page-rotateBottomSideFirst";
			r = "pt-page-moveFromBottom pt-page-delay200 pt-page-ontop";
			break;
		case 32:
			t = "pt-page-flipOutRight";
			r = "pt-page-flipInLeft pt-page-delay500";
			break;
		case 33:
			t = "pt-page-flipOutLeft";
			r = "pt-page-flipInRight pt-page-delay500";
			break;
		case 34:
			t = "pt-page-flipOutTop";
			r = "pt-page-flipInBottom pt-page-delay500";
			break;
		case 35:
			t = "pt-page-flipOutBottom";
			r = "pt-page-flipInTop pt-page-delay500";
			break;
		case 36:
			t = "pt-page-rotateFall pt-page-ontop";
			r = "pt-page-scaleUp";
			break;
		case 37:
			t = "pt-page-rotateOutNewspaper";
			r = "pt-page-rotateInNewspaper pt-page-delay500";
			break;
		case 38:
			t = "pt-page-rotatePushLeft";
			r = "pt-page-moveFromRight";
			break;
		case 39:
			t = "pt-page-rotatePushRight";
			r = "pt-page-moveFromLeft";
			break;
		case 40:
			t = "pt-page-rotatePushTop";
			r = "pt-page-moveFromBottom";
			break;
		case 41:
			t = "pt-page-rotatePushBottom";
			r = "pt-page-moveFromTop";
			break;
		case 42:
			t = "pt-page-rotatePushLeft";
			r = "pt-page-rotatePullRight pt-page-delay180";
			break;
		case 43:
			t = "pt-page-rotatePushRight";
			r = "pt-page-rotatePullLeft pt-page-delay180";
			break;
		case 44:
			t = "pt-page-rotatePushTop";
			r = "pt-page-rotatePullBottom pt-page-delay180";
			break;
		case 45:
			t = "pt-page-rotatePushBottom";
			r = "pt-page-rotatePullTop pt-page-delay180";
			break;
		case 46:
			t = "pt-page-rotateFoldLeft";
			r = "pt-page-moveFromRightFade";
			break;
		case 47:
			t = "pt-page-rotateFoldRight";
			r = "pt-page-moveFromLeftFade";
			break;
		case 48:
			t = "pt-page-rotateFoldTop";
			r = "pt-page-moveFromBottomFade";
			break;
		case 49:
			t = "pt-page-rotateFoldBottom";
			r = "pt-page-moveFromTopFade";
			break;
		case 50:
			t = "pt-page-moveToRightFade";
			r = "pt-page-rotateUnfoldLeft";
			break;
		case 51:
			t = "pt-page-moveToLeftFade";
			r = "pt-page-rotateUnfoldRight";
			break;
		case 52:
			t = "pt-page-moveToBottomFade";
			r = "pt-page-rotateUnfoldTop";
			break;
		case 53:
			t = "pt-page-moveToTopFade";
			r = "pt-page-rotateUnfoldBottom";
			break;
		case 54:
			t = "pt-page-rotateRoomLeftOut pt-page-ontop";
			r = "pt-page-rotateRoomLeftIn";
			break;
		case 55:
			t = "pt-page-rotateRoomRightOut pt-page-ontop";
			r = "pt-page-rotateRoomRightIn";
			break;
		case 56:
			t = "pt-page-rotateRoomTopOut pt-page-ontop";
			r = "pt-page-rotateRoomTopIn";
			break;
		case 57:
			t = "pt-page-rotateRoomBottomOut pt-page-ontop";
			r = "pt-page-rotateRoomBottomIn";
			break;
		case 58:
			t = "pt-page-rotateCubeLeftOut pt-page-ontop";
			r = "pt-page-rotateCubeLeftIn";
			break;
		case 59:
			t = "pt-page-rotateCubeRightOut pt-page-ontop";
			r = "pt-page-rotateCubeRightIn";
			break;
		case 60:
			t = "pt-page-rotateCubeTopOut pt-page-ontop";
			r = "pt-page-rotateCubeTopIn";
			break;
		case 61:
			t = "pt-page-rotateCubeBottomOut pt-page-ontop";
			r = "pt-page-rotateCubeBottomIn";
			break;
		case 62:
			t = "pt-page-rotateCarouselLeftOut pt-page-ontop";
			r = "pt-page-rotateCarouselLeftIn";
			break;
		case 63:
			t = "pt-page-rotateCarouselRightOut pt-page-ontop";
			r = "pt-page-rotateCarouselRightIn";
			break;
		case 64:
			t = "pt-page-rotateCarouselTopOut pt-page-ontop";
			r = "pt-page-rotateCarouselTopIn";
			break;
		case 65:
			t = "pt-page-rotateCarouselBottomOut pt-page-ontop";
			r = "pt-page-rotateCarouselBottomIn";
			break;
		case 66:
			t = "pt-page-rotateSidesOut";
			r = "pt-page-rotateSidesIn pt-page-delay200";
			break;
		case 67:
			t = "pt-page-rotateSlideOut";
			r = "pt-page-rotateSlideIn";
			break
		}
		a.inClass = r;
		a.outClass = t;
		return a
	}
	var c = new r;
	c.render();
	e(a, function(e) {
		return c.set(e)
	})
});