<?php /*a:2:{s:66:"D:\phpStudy\WWW\qnm_manage\application\admin\view\login\index.html";i:1555470852;s:73:"D:\phpStudy\WWW\qnm_manage\application\admin\view\index\single_index.html";i:1555483919;}*/ ?>
<!DOCTYPE html>
<html lang="zh">

<head>
    <title><?php echo htmlentities((isset($title) && ($title !== '')?$title:'')); if(!empty($title)): ?> · <?php endif; ?><?php echo sysconf('site_name'); ?></title>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=0.4">
    <link rel="shortcut icon" href="../../../../index.php">
    <link rel="stylesheet" href="/qnm_manage/static/plugs/awesome/fonts.css?<?php echo date('md'); ?>">
    <link rel="stylesheet" href="/qnm_manage/static/plugs/layui/css/layui.css?<?php echo date('md'); ?>">
    <link rel="stylesheet" href="/qnm_manage/static/theme/css/console.css?<?php echo date('md'); ?>">

    
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<script>if (location.href.indexOf('#') > -1) location.replace(location.href.split('#')[0])</script>
<link rel="stylesheet" href="/qnm_manage/static/theme/css/login.css">

    <script>window.ROOT_URL = '/qnm_manage';</script>
    <script src="/qnm_manage/static/plugs/jquery/pace.min.js"></script>


</head>

<body class="layui-layout-body">

<div class="login-container full-height" data-supersized="/qnm_manage/static/theme/img/login/bg1.png,/qnm_manage/static/theme/img/login/bg.jpg">
    <div class="header notselect layui-hide-xs">
        <a href="<?php echo url('@'); ?>" class="title"><?php echo sysconf('app_name'); ?> <span class="padding-left-5 font-s10"><?php echo sysconf('app_version'); ?></span></a>
        <ul>
            <li class="layui-hide"><a target="_blank" href="http://document.framework.thinkadmin.top">在线帮助</a></li>
            <li><a target="_blank" href="http://soft.ftsm-shop.com/19/3911.html">推荐使用谷歌浏览器</a></li>
        </ul>
    </div>
    <form data-login-form onsubmit="return false;" method="post" class="layui-anim layui-anim-upbit" autocomplete="off">
        <h2 class="notselect">系统管理</h2>
        <ul>
            <li class="username">
                <label>
                    <i class="layui-icon layui-icon-username"></i>
                    <input class="layui-input" required pattern="^\S{2,}$" name="username" autofocus autocomplete="off" placeholder="请输入账号">
                </label>
            </li>
            <li class="password">
                <label>
                    <i class="layui-icon layui-icon-password"></i>
                    <input class="layui-input" required pattern="^\S{4,}$" name="password" maxlength="32" type="password" autocomplete="off" placeholder="请输入密码">
                </label>
            </li>
            <li class="text-center padding-top-20">
                <input type="hidden" name="skey" value="<?php echo htmlentities((isset($skey) && ($skey !== '')?$skey:'')); ?>">
                <button type="submit" class="layui-btn layui-disabled full-width" data-form-loaded="立即登入">正在载入</button>
            </li>
        </ul>
    </form>
    <div class="footer notselect">
        <?php echo sysconf('site_copy'); if(sysconf('miitbeian')): ?><span>&nbsp;|&nbsp;</span><a target="_blank" href="http://www.miitbeian.gov.cn"><?php echo sysconf('miitbeian'); ?></a><?php endif; ?>
    </div>
</div>

<script src="/qnm_manage/static/plugs/layui/layui.all.js"></script>
<script src="/qnm_manage/static/plugs/require/require.js"></script>
<script src="/qnm_manage/static/admin.js"></script>


<script src="/qnm_manage/static/plugs/supersized/supersized.3.2.7.min.js"></script>

</body>

</html>