layui.define(["jquery", "larryms", "echarts"], function(e) {
	var s = layui.$,
		d = layui.larryms,
		t = layui.util,
		a = layui.device(),
		r = layui.echarts;
	d.panel();
	s(".versionT").text(d.version);
	if (a.ie) {
		s("body").addClass("ie-bug")
	} else {
		s("body").removeClass("ie-bug")
	}
	if (layui.cache.identified == "main") {
		var o = r.init(document.getElementById("larryCount"), layui.echartStyle("larry"));
		var l = {
			title: {
				text: "今日流量趋势",
				x: "center",
				textStyle: {
					fontSize: 14
				}
			},
			tooltip: {
				trigger: "axis"
			},
			legend: {
				data: ["", ""]
			},
			xAxis: [{
				type: "category",
				boundaryGap: false,
				data: ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]
			}],
			yAxis: [{
				type: "value"
			}],
			series: [{
				name: "PV",
				type: "line",
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: "default"
						}
					}
				},
				data: [21010, 4444, 1200, 888, 555, 666, 3333, 33333, 55555, 66666, 33333, 3333, 6666, 11888, 11116, 33333, 56666, 42222, 39999, 28888, 17777, 9666, 6555, 5555, 3333, 2222, 3111, 6999, 13333, 26666, 33333, 999, 888, 777]
			}, {
				name: "UV",
				type: "line",
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: "default"
						}
					}
				},
				data: [3333, 555, 33, 44, 55, 66, 333, 3333, 5555, 12666, 3333, 333, 666, 1188, 2666, 3888, 6666, 4222, 3999, 2888, 1777, 966, 655, 555, 333, 222, 311, 699, 888, 2666, 166, 99, 88, 77]
			}]
		};
		o.setOption(l);
		window.onresize = function() {
			o.resize()
		};
		layui.use(["qrcode", "countup"], function() {
			var e = layui.qrcode,
				t = layui.countup,
				a = top.location.href;
			var r = new t("artNums", 0, s("#artNums").text()),
				o = new t("msgNums", 0, s("#msgNums").text()),
				l = new t("userNums", 0, s("#userNums").text());
			r.start();
			o.start();
			l.start();
			var i = new e(s("#qrcode")[0], {
				width: 300,
				height: 300,
				text: d.utf16to8("LarryMS框架"),
				foreground: "#5FB878"
			});
			i.makeCode(a);
			s("#wapQrcode").on("click", function() {
				var e = s("#qrcodeBox").html();
				var t = top.layer.open({
					type: 1,
					title: "使用手机扫二维码查看移动端演示",
					skin: "larry-green",
					area: ["320px", "360px"],
					shadeClose: true,
					shade: .6,
					content: e,
					end: function() {
						layer.closeAll()
					}
				})
			});
			s("#remarkLarryMS").on("click", function() {
				var e = top.layer.open({
					type: 2,
					title: "关于LarryMS预览版说明",
					area: ["600px", "350px"],
					shadeClose: true,
					shade: .6,
					content: "msg.html",
					end: function() {
						layer.closeAll()
					}
				})
			})
		})
	} else if (layui.cache.identified == "data") {
		var o = r.init(document.getElementById("larryCount"), layui.echartStyle("chalk"));
		var i = {
			backgroundColor: "#504F88",
			tooltip: {
				formatter: "{a} <br/>{c} {b}"
			},
			toolbox: {
				show: true,
				feature: {
					mark: {
						show: true
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			series: [{
				name: "带宽",
				type: "gauge",
				min: 0,
				max: 100,
				splitNumber: 10,
				axisLine: {
					lineStyle: {
						color: [
							[.09, "lime"],
							[.82, "#1e90ff"],
							[1, "#ff4500"]
						],
						width: 3,
						shadowColor: "#fff",
						shadowBlur: 10
					}
				},
				axisLabel: {
					textStyle: {
						fontWeight: "bolder",
						color: "#fff",
						shadowColor: "#fff",
						shadowBlur: 10
					}
				},
				axisTick: {
					length: 15,
					lineStyle: {
						color: "auto",
						shadowColor: "#fff",
						shadowBlur: 10
					}
				},
				splitLine: {
					length: 25,
					lineStyle: {
						width: 3,
						color: "#fff",
						shadowColor: "#fff",
						shadowBlur: 10
					}
				},
				pointer: {
					shadowColor: "#fff",
					shadowBlur: 5
				},
				title: {
					textStyle: {
						fontWeight: "bolder",
						fontSize: 20,
						fontStyle: "italic",
						color: "#fff",
						shadowColor: "#fff",
						shadowBlur: 10
					}
				},
				detail: {
					backgroundColor: "rgba(30,144,255,0.8)",
					borderWidth: 1,
					borderColor: "#fff",
					shadowColor: "#fff",
					shadowBlur: 5,
					offsetCenter: [0, "50%"],
					textStyle: {
						fontWeight: "bolder",
						color: "#fff"
					}
				},
				data: [{
					value: 10,
					name: "Mb/s"
				}]
			}, {
				name: "CPU利用率",
				type: "gauge",
				center: ["15%", "50%"],
				radius: "70%",
				min: 0,
				max: 100,
				endAngle: 0,
				splitNumber: 10,
				axisLine: {
					lineStyle: {
						color: [
							[.29, "lime"],
							[.86, "#1e90ff"],
							[1, "#ff4500"]
						],
						width: 2,
						shadowColor: "#fff",
						shadowBlur: 10
					}
				},
				axisLabel: {
					textStyle: {
						fontWeight: "bolder",
						color: "#fff",
						shadowColor: "#fff",
						shadowBlur: 10
					}
				},
				axisTick: {
					length: 12,
					lineStyle: {
						color: "auto",
						shadowColor: "#fff",
						shadowBlur: 10
					}
				},
				splitLine: {
					length: 20,
					lineStyle: {
						width: 3,
						color: "#fff",
						shadowColor: "#fff",
						shadowBlur: 10
					}
				},
				pointer: {
					width: 5,
					shadowColor: "#fff",
					shadowBlur: 5
				},
				title: {
					offsetCenter: [0, "-30%"],
					textStyle: {
						fontWeight: "bolder",
						fontStyle: "italic",
						color: "#fff",
						shadowColor: "#fff",
						shadowBlur: 10
					}
				},
				detail: {
					borderColor: "#fff",
					shadowColor: "#fff",
					shadowBlur: 5,
					width: 80,
					height: 30,
					offsetCenter: [25, "20%"],
					textStyle: {
						fontWeight: "bolder",
						color: "#fff"
					},
					formatter: "{value}%"
				},
				data: [{
					value: 1.5,
					name: "CPU"
				}]
			}, {
				name: "业务指标",
				type: "gauge",
				center: ["85%", "55%"],
				radius: "75%",
				tooltip: {
					formatter: "{a} <br/>{b} : {c}%"
				},
				toolbox: {
					feature: {
						restore: {},
						saveAsImage: {}
					}
				},
				title: {
					offsetCenter: [0, "-30%"],
					textStyle: {
						fontWeight: "bolder",
						color: "#fff",
						shadowColor: "#fff",
						shadowBlur: 10
					}
				},
				detail: {},
				data: [{
					value: 50,
					name: "完成率"
				}]
			}]
		};
		clearInterval(n);
		var n = setInterval(function() {
			i.series[0].data[0].value = (Math.random() * 50).toFixed(2) - 0;
			i.series[1].data[0].value = (Math.random() * 30).toFixed(2) - 0;
			i.series[2].data[0].value = (Math.random() * 30).toFixed(2) - 0;
			o.setOption(i, true)
		}, 2e3);
		o.setOption(i);
		var u = r.init(document.getElementById("mounths"), layui.echartStyle("larry"));
		var f = r.init(document.getElementById("weath"), layui.echartStyle("larry"));
		var y = {
			title: {
				text: "本月流量趋势",
				x: "center",
				textStyle: {
					fontSize: 14
				}
			},
			tooltip: {
				trigger: "axis"
			},
			legend: {
				data: ["", ""]
			},
			xAxis: [{
				type: "category",
				boundaryGap: false,
				data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
			}],
			yAxis: [{
				type: "value"
			}],
			series: [{
				name: "PV",
				type: "line",
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: "default"
						}
					}
				},
				data: [8e4, 44440, 1200, 6e4, 55554, 8888, 33376, 7777, 88898, 66665, 33333, 3333, 6666, 11888, 11116, 33333, 56666, 42222, 39999, 28888, 17777, 9666, 6555, 5555, 3333, 2222, 3111, 6999, 13333, 26666, 33333]
			}, {
				name: "UV",
				type: "line",
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: "default"
						}
					}
				},
				data: [33330, 1766, 555, 6888, 5555, 5555, 4444, 3333, 5555, 42666, 3333, 333, 666, 1188, 2666, 3888, 6666, 4222, 3999, 2888, 1777, 966, 655, 555, 333, 222, 311, 699, 888, 2666, 166]
			}]
		},
			c = {
				title: {
					text: "本周流量趋势",
					x: "10%",
					textStyle: {
						fontSize: 14
					}
				},
				tooltip: {
					trigger: "axis"
				},
				legend: {
					data: ["PV", "UV"]
				},
				grid: {
					left: "8%",
					right: "4%",
					bottom: "3%",
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: [{
					type: "category",
					boundaryGap: false,
					data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
				}],
				yAxis: [{
					type: "value"
				}],
				series: [{
					name: "PV",
					type: "line",
					data: [1e4, 30003, 8e3, 26e3, 55e3, 3e3, 43e3]
				}, {
					name: "UV",
					type: "line",
					data: [1e3, 6802, 500, 9e3, 6e3, 100, 12e3]
				}]
			};
		var h = r.init(document.getElementById("day"), layui.echartStyle("walden"));
		var m = {
			title: {
				text: "今日流量趋势",
				x: "center",
				textStyle: {
					fontSize: 14
				}
			},
			tooltip: {
				trigger: "axis"
			},
			legend: {
				data: ["", ""]
			},
			xAxis: [{
				type: "category",
				boundaryGap: false,
				data: ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]
			}],
			yAxis: [{
				type: "value"
			}],
			series: [{
				name: "PV",
				type: "line",
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: "default"
						}
					}
				},
				data: [21010, 4444, 1200, 888, 555, 666, 3333, 33333, 55555, 66666, 33333, 3333, 6666, 11888, 11116, 33333, 56666, 42222, 39999, 28888, 17777, 9666, 6555, 5555, 3333, 2222, 3111, 6999, 13333, 26666, 33333, 999, 888, 777]
			}, {
				name: "UV",
				type: "line",
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: "default"
						}
					}
				},
				data: [3333, 555, 33, 44, 55, 66, 333, 3333, 5555, 12666, 3333, 333, 666, 1188, 2666, 3888, 6666, 4222, 3999, 2888, 1777, 966, 655, 555, 333, 222, 311, 699, 888, 2666, 166, 99, 88, 77]
			}]
		};
		var p = r.init(document.getElementById("counts"), layui.echartStyle("larry"));
		var x = {
			title: {
				text: "用户访问来源",
				subtext: "纯属虚构",
				x: "center"
			},
			tooltip: {
				trigger: "item",
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: "vertical",
				left: "left",
				data: ["Chrome", "Firefox", "IE", "百度", "360", "QQ浏览器"]
			},
			series: [{
				name: "访问来源",
				type: "pie",
				radius: "43%",
				center: ["55%", "72%"],
				data: [{
					value: 6036,
					name: "Chrome"
				}, {
					value: 3566,
					name: "Firefox"
				}, {
					value: 3001,
					name: "IE"
				}, {
					value: 1560,
					name: "百度"
				}, {
					value: 1236,
					name: "360"
				}, {
					value: 900,
					name: "QQ浏览器"
				}],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)"
					}
				}
			}]
		};
		u.setOption(y);
		f.setOption(c);
		h.setOption(m);
		p.setOption(x);
		window.onresize = function() {
			o.resize();
			u.resize();
			f.resize();
			h.resize();
			p.resize()
		}
	} else if (layui.cache.identified == "general") {
		option = {
			legend: {},
			title: {
				text: "（ 5、6、7、8月份汇总 ）",
				x: "center",
				y: "90%",
				textStyle: {
					fontSize: 14
				}
			},
			tooltip: {},
			dataset: {
				source: [
					["product", "5月", "6月", "7月", "8月"],
					["线上", 41.1, 30.4, 65.1, 53.3],
					["线下", 86.5, 92.1, 85.7, 83.1],
					["品牌", 24.1, 67.2, 79.5, 86.4]
				]
			},
			xAxis: [{
				type: "category"
			}],
			yAxis: [{}],
			grid: [{
				bottom: "20%"
			}, {
				top: "55%"
			}],
			series: [{
				type: "bar",
				seriesLayoutBy: "row"
			}, {
				type: "bar",
				seriesLayoutBy: "row"
			}, {
				type: "bar",
				seriesLayoutBy: "row"
			}]
		};
		var o = r.init(document.getElementById("icome"), layui.echartStyle("layui"));
		o.setOption(option);
		window.onresize = function() {
			o.resize()
		};
		layui.use(["countup", "table"], function() {
			var a = layui.countup,
				e = layui.table;
			var t = new a("UVcounter", 0, s("#UVcounter").text());
			var r = new a("incomeCounter", 0, s("#incomeCounter").text());
			var o = new a("orderCounter", 0, s("#orderCounter").text());
			var l = new a("userCounter", 0, s("#userCounter").text());
			o.start();
			r.start();
			t.start();
			l.start();
			s(".countup").on("click", function() {
				var e = s(this).children(".right").children(".p").children("h3").attr("id");
				var t = new a(e, 0, s("#" + e).text().replace(/,/g, ""));
				t.start()
			});
			var i = s("#historyOrder").data("url"),
				n = e.render({
					elem: "#historyOrder",
					id: "historyOrder",
					cellMinWidth: 95,
					url: i,
					method: "post",
					height: "530",
					page: true,
					limits: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
					limit: 10,
					cols: [
						[{
							type: "checkbox",
							fixed: "left",
							width: 40
						}, {
							field: "order_id",
							title: "订单号",
							minWidth: 80,
							align: "center"
						}, {
							field: "names",
							title: "产品名称",
							minWidth: 70,
							align: "center"
						}, {
							field: "sum",
							title: "金额",
							minWidth: 70,
							align: "center"
						}, {
							field: "status",
							title: "交易状态",
							minWidth: 90,
							align: "center",
							templet: function(e) {
								if (e.status == "1") {
									return '<input type="checkbox" name="zzz" lay-skin="switch" lay-text="成功|失败" checked>'
								} else {
									return '<input type="checkbox" name="zzz" lay-skin="switch" lay-text="成功|失败">'
								}
							}
						}, {
							field: "time",
							title: "交易时间",
							minWidth: 80,
							align: "center"
						}]
					]
				});
			d.photos({
				photos: "#larrymsDynamicPic"
			})
		})
	}
	e("console", {})
});