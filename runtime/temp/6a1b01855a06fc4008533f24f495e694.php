<?php /*a:2:{s:66:"D:\phpStudy\WWW\qnm_manage\application\admin\view\config\info.html";i:1554193551;s:59:"D:\phpStudy\WWW\qnm_manage\application\admin\view\main.html";i:1555483979;}*/ ?>
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

    
    <script>window.ROOT_URL = '/qnm_manage';</script>
    <script src="/qnm_manage/static/plugs/jquery/pace.min.js"></script>


</head>

<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin layui-layout-left-hide">
    <!-- 主体内容 开始 -->
    <div class="layui-body">

<div class="layui-card">

    <?php if(!(empty($title) || (($title instanceof \think\Collection || $title instanceof \think\Paginator ) && $title->isEmpty()))): ?>
    <div class="layui-card-header layui-anim layui-anim-fadein notselect">
        <span class="layui-icon font-s10 color-desc margin-right-5">&#xe65b;</span><b><?php echo htmlentities((isset($title) && ($title !== '')?$title:'')); ?></b>
        <div class="pull-right"></div>
    </div>
    <?php endif; ?>
    <div class="layui-card-body layui-anim layui-anim-fadein">

<form onsubmit="return false;" data-auto="true" method="post" class='layui-form layui-card' autocomplete="off">
    <div class="layui-card-body">
        <div class="layui-form-item">
            <label class="layui-form-label">Name<br><span class="nowrap color-desc">程序名称</span></label>
            <div class="layui-input-block">
                <input name="app_name" required placeholder="请输入程序名称" value="<?php echo sysconf('app_name'); ?>" class="layui-input">
                <p class="help-block">当前程序名称，在后台主标题上显示</p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">Version<br><span class="nowrap color-desc">程序版本</span></label>
            <div class="layui-input-block">
                <input name="app_version" placeholder="请输入程序版本" value="<?php echo sysconf('app_version'); ?>" class="layui-input">
                <p class="help-block">当前程序版本号，在后台主标题上标显示</p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">Website<br><span class="nowrap color-desc">网站名称</span></label>
            <div class="layui-input-block">
                <input name="site_name" required placeholder="请输入网站名称" value="<?php echo sysconf('site_name'); ?>" class="layui-input">
                <p class="help-block">网站名称，显示在浏览器标签上</p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">Copyright<br><span class="nowrap color-desc">版权信息</span></label>
            <div class="layui-input-block">
                <input name="site_copy" required placeholder="请输入版权信息" value="<?php echo sysconf('site_copy'); ?>" class="layui-input">
                <p class="help-block">程序的版权信息设置，在后台登录页面显示</p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">Browser<br><span class="nowrap color-desc">浏览器图标</span></label>
            <div class="layui-input-block">
                <img data-tips-image style="height:auto;max-height:32px;min-width:32px" src="<?php echo sysconf('site_icon'); ?>"/>
                <input type="hidden" name="site_icon" onchange="$(this).prev('img').attr('src', this.value)" value="<?php echo sysconf('site_icon'); ?>" class="layui-input">
                <a class="margin-left-10" data-file="btn" data-uptype="local" data-type="ico,png" data-field="site_icon">上传图片</a>
                <p class="help-block">建议上传ICO图标的尺寸为128x128px，此图标用于网站标题前，<a href="http://www.favicon-icon-generator.com/" target="_blank">ICON在线制作</a></p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">Miitbeian<br><span class="nowrap color-desc">网站备案</span></label>
            <div class="layui-input-block">
                <input name="miitbeian" placeholder="请输入网站备案号" value="<?php echo sysconf('miitbeian'); ?>" class="layui-input">
                <p class="help-block">网站备案号，可以在<a target="_blank" href="http://www.miitbeian.gov.cn">备案管理中心</a>查询获取</p>
            </div>
        </div>
        <div class="hr-line-dashed margin-left-40"></div>
        <div class="layui-form-item text-center">
            <div class="layui-row">
                <div class="layui-col-sm8 layui-col-md6">
                    <button class="layui-btn" type="submit">保存配置</button>
                </div>
            </div>
        </div>
    </div>
</form>
</div>

</div>

    </div>
    <!-- 主体内容 结束 -->
</div>
<script src="/qnm_manage/static/plugs/layui/layui.all.js"></script>
<script src="/qnm_manage/static/plugs/require/require.js"></script>
<script src="/qnm_manage/static/admin.js"></script>


</body>

</html>
