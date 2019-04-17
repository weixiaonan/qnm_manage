layui.define(["larryms", "form", "larryTab", "laytpl", "element"], function(e) {
	var t = layui.$,
		l = layui.larryms,
		s = layui.form,
		a = t(window),
		i = layui.laytpl,
		m = layui.larryTab(),
		n = t("body");
	var o = function() {
			this.themeColor = {
				defaults: {
					topColor: "#1b8fe6",
					topThis: "#1958A6",
					topBottom: "#01AAED",
					leftColor: "#2f3a4f",
					leftRight: "#258ED8",
					navThis: "#1492DD",
					titBottom: "#1E9FFF",
					footColor: "#245c87",
					name: "defaults"
				},
				deepBlue: {
					topColor: "#1b8fe6",
					topThis: "#1958A6",
					topBottom: "#01AAED",
					leftColor: "#2f3a4f",
					leftRight: "#258ED8",
					navThis: "#1492DD",
					titBottom: "#1E9FFF",
					footColor: "#245c87",
					name: "deepBlue"
				},
				green: {
					topColor: "#2a877b",
					topThis: "#5FB878",
					topBottom: "#50A66F",
					leftColor: "#343742",
					leftRight: "#50A66F",
					navThis: "#56a66c",
					titBottom: "#50A66F",
					footColor: "#3e4e63",
					name: "green"
				},
				navy: {
					topColor: "#2f4056",
					topThis: "#0d51a9",
					topBottom: "#01AAED",
					leftColor: "#393d49",
					leftRight: "#1E9FFF",
					navThis: "#1E9FFF",
					titBottom: "#01AAED",
					footColor: "#343742",
					name: "navy"
				},
				orange: {
					topColor: "#F39C34",
					topThis: "#CD7013",
					topBottom: "#FF5722",
					leftColor: "#1d1f26",
					leftRight: "#FFB800",
					navThis: "#df7700",
					titBottom: "#FFB800",
					footColor: "#f2f2f2",
					footFont: "#666",
					name: "orange"
				}
			}
		};
	o.prototype.theme = function(e) {
		var a = "Larryms_theme_style",
			o = document.createElement("style"),
			r = layui.data("larryms"),
			t = i([".layui-header{background-color:{{d.topColor}} !important;border-bottom:3px solid {{d.topBottom}};}", ".larryms-extend{border-left:1px solid {{d.topThis}} }", ".larryms-nav-bar{background-color:{{d.topBottom}} !important;}", ".larryms-extend .larryms-nav li.larryms-this{background:{{d.topThis}} !important; }", ".larryms-extend .larryms-nav li.larryms-nav-item:hover{background:{{d.topThis}} !important; }", ".larryms-extend .larryms-nav li.larryms-this:hover{background:{{d.topThis}} }", ".larryms-fold .larryms-header .larryms-topbar-left .larryms-switch{border-left:1px solid {{d.topThis}} !important;}", ".larryms-extend  ul.layui-nav li.layui-nav-item:hover{background:{{d.topThis}} !important;}", ".larryms-topbar-right .layui-nav-bar{background-color: {{d.navThis}} !important;}", ".larryms-nav-tree .larryms-this,", ".larryms-nav-tree .larryms-this>a{background-color:{{d.navThis}} !important;}", ".larryms-body .larryms-left{border-right:2px solid {{d.leftRight}} !important;}", ".layui-bg-black{background-color:{{d.leftColor}} !important;}", ".larryms-body .larryms-left{background:{{d.leftColor}} !important;}", "ul.larryms-tab-title .layui-this{background:{{d.navThis}} !important;}", ".larryms-right .larryms-tab .larryms-title-box{border-bottom:1px solid  {{d.titBottom}};}", ".larryms-right .larryms-tab .larryms-title-box .larryms-tab-title{border-bottom:1px solid  {{d.titBottom}};}", ".larryms-layout .larryms-footer{background:{{d.footColor}} !important;color:{{d.footFont}} !important;}"].join("")).render(e),
			l = document.getElementById(a);
		if ("styleSheet" in o) {
			o.setAttribute("type", "text/css");
			o.styleSheet.cssText = t
		} else {
			o.innerHTML = t
		}
		o.id = a;
		l && n[0].removeChild(l);
		n[0].appendChild(o);
		r.theme = r.theme || {};
		layui.each(e, function(e, a) {
			r.theme[e] = a
		});
		layui.data("larryms", {
			key: "theme",
			value: r.theme
		})
	};
	o.prototype.responeDevice = function() {
		var e = this,
			a = l.deviceType();
		if (a.devices == "mobile") {
			n.addClass("larryms-mobile");
			n.removeClass("larryms-pad");
			t("#larry_layout").removeClass("larryms-fold");
			t("#larry_layout").removeClass("larryms-unfold")
		} else if (a.devices == "pad") {
			n.addClass("larryms-pad");
			n.removeClass("larryms-mobile");
			t("#larryms_top_menu").removeClass("pt-page-moveToLeftFade");
			t("#larry_left").addClass("pt-page-moveFromLeft");
			t("#larry_left").removeClass("pt-page-moveToLeftFade");
			t("#larry_layout").removeClass("larryms-mobile-layout");
			t("#larry_layout").addClass("larryms-fold").removeClass("larryms-unfold");
			t("#menufold").children("i.larry-icon").addClass("larry-unfold").removeClass("larry-fold7")
		} else if (a.devices == "pc") {
			n.removeClass("larryms-mobile");
			n.removeClass("larryms-pad");
			t("#larryms_top_menu").removeClass("pt-page-moveToLeftFade");
			t("#larry_left").removeClass("pt-page-moveToLeftFade");
			t("#larry_layout").removeClass("larryms-mobile-layout");
			t("#larry_layout").addClass("larryms-unfold").removeClass("larryms-fold");
			t("#menufold").children("i.larry-icon").addClass("larry-fold7").removeClass("larry-unfold")
		}
	};
	o.prototype.init = function() {
		var e = this,
			a = layui.data("larryms").theme,
			o = layui.data("larryms").systemSet,
			r = layui.data("larryms").mobileTabSwitch;
		e.responeDevice();
		if (a !== undefined) {
			e.theme(a);
			if (a.name == "defaults") {
				t("#Larryms_theme_style").empty()
			}
		}
		if (l.deviceType().devices == "mobile") {
			if (r == false) {
				e.mobileTab()
			} else if (r == undefined) {
				e.mobileTab()
			} else {
				t("#mTabswitch").attr("checked", "checked");
				t("#larryms_body").addClass("tab-box-show");
				s.render()
			}
		}
		if (o !== undefined) {
			m.tabSet({
				tabSession: o.tabCache,
				autoRefresh: o.tabRefresh,
				isPageEffect: o.pageAnim
			});
			t("#larry_footer").data("show", o.footSet)
		} else {
			layui.data("larryms", {
				key: "systemSet",
				value: {
					tabCache: l.configure.tabSession,
					tabRefresh: l.configure.tabRefresh,
					topMenuSet: l.configure.topMenuSet,
					fullScreen: false,
					pageAnim: l.configure.animations,
					footSet: t("#larry_footer").data("show")
				}
			})
		}
		d()
	};
	o.prototype.footInit = function(e) {
		t("#larry_footer").data("show", e);
		d()
	};
	o.prototype.fScreen = function(e) {
		if (e) {
			l.fullScreen.entry()
		} else {
			l.fullScreen.exit()
		}
	};
	o.prototype.pageAnimInit = function(e) {
		var a = this;
		a.init()
	};
	o.prototype.menuInit = function() {
		if (layui.data("larryms").topMenuSet !== undefined) {
			top.location.reload(true)
		}
	};
	o.prototype.mobileTab = function() {
		var e = layui.data("larryms").mobileTabSwitch;
		if (e) {
			t("#mTabswitch").click();
			t("#larryms_body").addClass("tab-box-show");
			s.render()
		} else {
			t("#mTabswitch").removeAttr("checked");
			s.render();
			t("#larryms_body").removeClass("tab-box-show")
		}
	};
	s.on("switch(mTabswitch)", function(e) {
		if (e.elem.checked) {
			layui.data("larryms", {
				key: "mobileTabSwitch",
				value: true
			});
			t("#larryms_body").addClass("tab-box-show")
		} else {
			layui.data("larryms", {
				key: "mobileTabSwitch",
				value: false
			});
			t("#larryms_body").removeClass("tab-box-show")
		}
	});

	function d() {
		if (t("#larry_footer").data("show") !== "on") {
			t("#larry_footer").hide();
			t("#larry_right").css({
				bottom: "0px"
			});
			t(".site-tree-mobile").css({
				bottom: "16px"
			})
		} else {
			t("#larry_footer").show();
			t("#larry_right").css({
				bottom: "40px"
			});
			t(".site-tree-mobile").css({
				bottom: "51px"
			})
		}
	}
	var r = t(".site-tree-mobile"),
		y = t(".site-mobile-shade"),
		f = t("#larrymsMobileMenu"),
		p = t("#larrymsMobileShade"),
		c = t("#rightMenuButton"),
		h = t("#larrymsMobileShadeRmenu");
	r.on("click", function() {
		n.addClass("mobile-side-show");
		t("#larry_left").removeClass("pt-page-moveToLeftFade");
		t("#larry_left").addClass("pt-page-moveFromLeft")
	});
	y.on("click", function() {
		n.removeClass("mobile-side-show");
		t("#larry_left").removeClass("pt-page-moveFromLeft");
		t("#larry_left").addClass("pt-page-moveToLeftFade")
	});
	var u = false;
	f.on("click", function() {
		if (!u) {
			t("#larryms_top_menu").show();
			t("#larryms_top_menu").addClass("pt-page-moveFromTop");
			t("#larryms_top_menu").removeClass("pt-page-moveToLeftFade");
			p.show();
			u = true
		} else {
			t("#larryms_top_menu").removeClass("pt-page-moveFromTop");
			t("#larryms_top_menu").addClass("pt-page-moveToLeftFade");
			p.hide();
			u = false
		}
		if (t("#larryms_top_menu").hasClass("pt-page-moveFromTop")) {
			if (t("#larry_left").hasClass("pt-page-moveFromLeft")) {
				t("#larry_left").removeClass("pt-page-moveFromLeft");
				t("#larry_left").addClass("pt-page-moveToLeftFade");
				t(".site-mobile-shade").click()
			}
		}
	});
	t("#larryms_top_menu").on("click", function() {
		if (u) {
			f.click();
			r.click()
		}
	});
	p.on("click", function() {
		t(this).hide();
		f.click()
	});
	var b = false;
	c.on("click", function() {
		var e = t("#topbarRMenu").height();
		if (!b) {
			t("#topbarR").animate({
				height: e
			});
			b = true;
			h.show()
		} else {
			t("#topbarR").animate({
				height: "50px"
			});
			b = false;
			h.hide()
		}
	});
	h.on("click", function() {
		t(this).hide();
		c.click()
	});
	t("#topbarRMenu li").on("click", function() {
		if (b) {
			c.click()
		}
	});
	var v = new o;
	v.init();

	function C() {
		var e = '<iframe src="' + layui.cache.homeUrl + '" id="ifr-0" data-group="0" data-id="ifr0" lay-id="" name="ifr_0" class="larryms-iframe"></iframe>';
		t("#homePage").attr("data-href", layui.cache.homeUrl);
		t("#homePage").attr("data-id", layui.cache.homeId !== undefined ? layui.cache.homeId : "homeID");
		t("#homePage").append(e)
	}
	if (window.addEventListener) {
		window.addEventListener("load", C())
	} else if (window.attachEvent) {
		C()
	} else {
		window.onload = C()
	}
	t("#larryms_version").text(l.version);
	e("admin", v)
});