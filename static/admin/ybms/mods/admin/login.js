layui.define(["larry","form","larryms"],function(i){var a=layui.$,e=layui.larry,r=layui.larryms,l=layui.form;function t(){a.supersized({slide_interval:3e3,transition:1,transition_speed:1e3,performance:1,min_width:0,min_height:0,vertical_center:1,horizontal_center:1,fit_always:0,fit_portrait:1,fit_landscape:0,slide_links:"blank",slides:[{image:layui.cache.imgPath+"1.jpg"},{image:layui.cache.imgPath+"2.jpg"},{image:layui.cache.imgPath+"3.jpg"}]})}r.plugin("jquery.supersized.min.js",t);a("#captchaImg").on("click",function(){a(this).attr("src",layui.cache.captcha+"?time="+Math.random())});r.alert(r.version+'已上线,用户名密码均为larry，将会持续高频更新模式，所有能看到的页面均会对应提供与源码包中;许多实用基础功能可在主题设置开启,兼容所有主流浏览器，<em style="color:#ff5722;">推荐使用chrome浏览器获取最佳体验</em>');l.on("submit(dologin)",function(i){if(i.field.uname=="larry"&&i.field.password=="larry"){layer.msg("登录成功",{icon:1,time:1e3});layui.data("larryms_is_login",{key:"status",value:true});setTimeout(function(){window.location.href="index.html"},1e3)}else{layer.tips("用户名:larry 密码：larry 无需输入验证码",a("#password"),{tips:[3,"#FF5722"]})}return false});i("login",{})});