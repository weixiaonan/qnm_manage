<?php /*a:1:{s:73:"D:\phpStudy\WWW\qnm_manage\application\admin\view\index\no_tab_index.html";i:1555662184;}*/ ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>TP版本号：<?php echo htmlentities(app()->version()); ?></title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="Author" content="larry" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <link rel="Shortcut Icon" href="/qnm_manage/static/admin/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/qnm_manage/static/admin/ybms/larry/css/larry.css" media="all">
    <link rel="stylesheet" type="text/css" href="/qnm_manage/static/admin/ybms/css/global.css" media="all">
    <link rel="stylesheet" type="text/css" href="/qnm_manage/static/admin/ybms/css/admin/larryms.css" media="all">
    <!-- load css -->
</head>


<body id="larrymsBody">
<!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
<!--[if lt IE 9]>
<script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
<script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<div class="layui-layout layui-layout-admin layui-fluid larryms-layout larryms-layout-nonetab" data-layout="nonetab" id="larry_layout">
    <!-- 顶部导航 -->
    <div class="layui-header larryms-header" id="larry_head">
        <div class="larryms-topbar-left" id="topbarL">
            <span class="mini-logo"><img src="/qnm_manage/static/admin/ybms/images/logo_mini.png" alt=""></span>
            <a class="layui-logo larryms-logo"><?php echo sysconf('site_name'); ?></a>
            <span class="larryms-switch larryms-icon-fold" id="menufold"><i class="larry-icon larry-fold7"></i></span>
            <div class="larryms-mobile-menu" id="larrymsMobileMenu"><i class="larry-icon larry-caidan1"></i></div>
            <div class="larryms-mobile-tab layui-hide-sm layui-hide-md layui-hide-lg layui-show-xs layui-form pt-page-moveFromLeft" id="larrymsMobileTab">
                <input type="checkbox" id="mTabswitch" lay-filter="mTabswitch" lay-skin="switch" value="1">
            </div>
        </div>
        <div class="larryms-extend" id="larrymsTopExtend">
            <div class="larryms-topbar-menu larryms-hide-xs clearfix">
                <ul class="larryms-nav clearfix fl" id="larryms_top_menu" lay-filter='TopMenu'>
                    <!-- 若开启顶部菜单，此处动态生成 -->
                </ul>
                <div class="dropdown extend-show" id="larryms_topSubMenu">
                    <i class="submenubtn larry-icon larry-sandianshu" id="subMenuButton"></i>
                    <ul class="dropdown-menu larryms-nav" id="dropdown">
                    </ul>
                </div>
                <!-- 移动端支持 -->
                <div class="larryms-mobile-shade" id="larrymsMobileShade"></div>
            </div>
            <!-- 右侧常用菜单 -->
            <div class="larryms-topbar-right" id="topbarR">
                <ul class="layui-nav clearfix" id="topbarRMenu">
                    <li class="layui-nav-item layout-switch">
                        <a href="javascript:;" class="pi20"><i class="larry-icon larry-yingyongzhongxin"></i><span class="layui-badge-dot" style="margin: -3px 0px 0px -32px;"></span><cite>布局切换</cite></a>
                        <dl class="layui-nav-child">
                            <dd><a data-href="<?php echo url('admin/index/index'); ?>" data-text="选项卡式布局">选项卡式布局</a></dd>
                            <dd class="layui-this"><a data-href="<?php echo url('admin/index/no_tab_index'); ?>" data-text="无选项卡布局">无选项卡布局</a></dd>
                            <dd><a data-href="" data-text="">顶部选项卡布局</a></dd>
                            <dd><a data-href="" data-text="">左双菜单排列</a></dd>
                            <dd><a data-href="" data-text="">阿里系风格布局</a></dd>
                        </dl>
                    </li>
                    <li class="layui-nav-item msg-tpl" lay-unselect>
                        <a class="message" larry-tpl="msg" id="msgBox">
                            <i class="larry-icon larry-xiaoxi2" data-icon="larry-xiaoxi2" data-font="larry-icon"></i>
                            <cite>消息</cite>
                            <span class="larry-badge" id="msgNums">6</span>
                        </a>
                        <div class="dropdown-menu-list">
                            <h5>消息<span class="msg-clear-all" id="clearMsg">清除所有</span></h5>
                            <div class="slimScrollDiv">
                                <div class="msg-box slimscroll noti-scroll">
                                    <div class="msg-item" larry-tab="page" data-url="../html/admin/panel/message.html?aid=1" data-id="12" data-group="0" data-icon="larry-xiaoxi2">
                                        <div class="msg-icon larry-bg-warning"><i class="larry-icon larry-youjian"></i></div>
                                        <div class="msg-detail">
                                            <h6>您有来自月亮的1封未读邮件！</h6>
                                            <cite>1分钟前</cite>
                                        </div>
                                    </div>
                                    <div class="msg-item" larry-tab="page" data-url="../html/admin/panel/message.html?aid=2" data-id="12" data-group="0" data-icon="larry-xiaoxi2">
                                        <div class="msg-icon larry-bg-blue"><i class="larry-icon larry-guanliyuan"></i></div>
                                        <div class="msg-detail">
                                            <h6>新用户注册！</h6>
                                            <cite>30分钟前</cite>
                                        </div>
                                    </div>
                                    <div class="msg-item" larry-tab="page" data-url="../html/admin/panel/message.html?aid=3" data-id="12" data-group="0" data-icon="larry-xiaoxi2">
                                        <div class="msg-icon larry-bg-dark"><i class="larry-icon larry-xitong10"></i></div>
                                        <div class="msg-detail">
                                            <h6>您有1件待审批事项！</h6>
                                            <cite>5小时前</cite>
                                        </div>
                                    </div>
                                    <div class="msg-item" larry-tab="page" data-url="../html/admin/panel/message.html?aid=4" data-id="12" data-group="0" data-icon="larry-xiaoxi2">
                                        <div class="msg-icon larry-bg-info"><i class="larry-icon larry-listpress"></i></div>
                                        <div class="msg-detail">
                                            <h6>larryms社区通知</h6>
                                            <cite>8小时前</cite>
                                        </div>
                                    </div>
                                    <div class="msg-item" larry-tab="page" data-url="../html/admin/panel/message.html?aid=5" data-id="12" data-group="0" data-icon="larry-xiaoxi2">
                                        <div class="msg-icon larry-bg-success"><i class="larry-icon larry-qizhi"></i></div>
                                        <div class="msg-detail">
                                            <h6>larryms2.0.9发布更新</h6>
                                            <cite>1天前</cite>
                                        </div>
                                    </div>
                                    <div class="msg-item" larry-tab="page" data-url="../html/admin/panel/message.html?aid=6" data-id="12" data-group="0" data-icon="larry-xiaoxi2">
                                        <div class="msg-icon larry-bg-danger"><i class="larry-icon larry-xitong10"></i></div>
                                        <div class="msg-detail">
                                            <h6>系统消息！</h6>
                                            <cite>3天前</cite>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="fix-look" larry-tab="page" data-group='0' data-url='../html/admin/panel/message.html' data-id='12' id="viewMsg">
                                <i class="larry-icon larry-xiaoxi2 layui-hide" data-icon="larry-xiaoxi2" data-font="larry-icon"></i>
                                <cite class="layui-hide">消息中心</cite>
                                查看全部
                            </div>
                        </div>
                    </li>
                    <li class="layui-nav-item" lay-unselect>
                        <a id="lock"><i class="larry-icon larry-diannao1"></i><cite>锁屏</cite></a>
                    </li>
                    <li class="layui-nav-item" lay-unselect>
                        <a id="clearCached"><i class="larry-icon larry-qingchuhuancun1"></i><cite>清除缓存</cite></a>
                    </li>
                    <li class="layui-nav-item" lay-unselect>
                        <a id="larryTheme"><i class="larry-icon larry-zhutishezhi-"></i><cite>主题设置</cite></a>
                    </li>
                    <li class="layui-nav-item exit" lay-unselect>
                        <a id="logout" data-url='../html/login.html'><i class="larry-icon larry-exit"></i><cite>退出</cite></a>
                    </li>
                </ul>
                <div class="mobile-select" id="rightMenuButton">
                    <i class="submenubtn larry-icon larry-sandianshu"></i>
                </div>
            </div>
            <div class="larryms-mobile-shade-rmenu" id="larrymsMobileShadeRmenu"></div>
        </div>
    </div>
    <!-- 内容主体 -->
    <div class="larryms-body" id="larryms_body">
        <!-- 左侧导航区域 -->
        <div class="layui-side pos-a larryms-left layui-bg-black" id="larry_left">
            <div class="layui-side-scroll">
                <!-- 管理员信息      -->
                <div class="user-info">
                    <div class="photo">
                        <img src="/qnm_manage/static/admin/ybms/images/user2.jpg" id="user_photo" alt="">
                    </div>
                    <p><span id="uname">larry</span>您好！欢迎登录</p>
                </div>
                <!-- 系统菜单 -->
                <div class="sys-menu-box">
                    <ul class="larryms-nav larryms-nav-tree" id="larryms_left_menu" lay-filter="LarrySide" data-group='0'>
                        <!-- 此次动态生成 -->
                    </ul>
                </div>
            </div>
        </div>
        <!-- 右侧框架内容区域 -->
        <div class="layui-body pos-a larryms-right" id="larry_right">
            <div class="layui-tab larryms-tab" id="larry_tab" lay-filter="larryTab">
                <!-- tab title end -->
                <div class="layui-tab-content larryms-tab-content" id="larry_tab_content">
                    <div class="layui-tab-item layui-show pt-page-scaleUp" id="homePage"></div>
                </div>
                <!-- tab content end -->
            </div>
        </div>
    </div>
    <!-- 底部固定区域 -->
    <div class="layui-footer larryms-footer" data-show='on' id="larry_footer">
        <div class="copyright inline-block pos-al">Author larry © <a href="http://www.larryms.com/" target="_blank">larryms.com</a></div>
        <p class="block">商业使用购买授权(保留对源码盗卖转售法律追诉权利)</p>
        <div class="larryms-info inline-block pos-ar">当前版本：<span id="larryms_version"></span><a href="http://www.larryms.com/" target="_blank"><i class="layui-icon">&#xe67c;</i></a></div>
    </div>
</div>
<div class="layui-hide fa"></div>
<div class="site-tree-mobile layui-hide">
    <i class="layui-icon"></i>
</div>
<div class="site-mobile-shade"></div>
<!-- 加载js文件-->
<script type="text/javascript" src="/qnm_manage/static/admin/ybms/layui/layui.js"></script>
<script type="text/javascript">
    layui.cache.sysName = "<b>【<?php echo sysconf('site_name'); ?>】</b>";//提示框title
    layui.config({
        version: "2.1.0",
        base: '/qnm_manage/static/admin/ybms/',
        homeUrl: "<?php echo url('admin/index/user'); ?>",
        menusUrl: "<?php echo url('admin/index/_getMenus'); ?>",
        page: 'switchs,indexb'
    }).extend({
        larry: 'js/base'
    }).use('larry');
</script>
</body>

</html>