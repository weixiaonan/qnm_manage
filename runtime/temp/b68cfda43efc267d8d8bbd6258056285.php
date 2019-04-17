<?php /*a:5:{s:66:"D:\phpStudy\WWW\qnm_manage\application\admin\view\config\file.html";i:1554193551;s:59:"D:\phpStudy\WWW\qnm_manage\application\admin\view\main.html";i:1555483979;s:70:"D:\phpStudy\WWW\qnm_manage\application\admin\view\config\file_oss.html";i:1554193551;s:72:"D:\phpStudy\WWW\qnm_manage\application\admin\view\config\file_local.html";i:1554193551;s:72:"D:\phpStudy\WWW\qnm_manage\application\admin\view\config\file_qiniu.html";i:1554193551;}*/ ?>
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

<form class="layui-card layui-form">
    <div class="layui-card-body">
        <div class="layui-form-item">
            <label class="layui-form-label">Storage<br><span class="nowrap color-desc">存储类型</span></label>
            <div class="layui-input-block">
                <?php foreach(['local'=>'本地服务器存储','oss'=>'阿里云OSS存储','qiniu'=>'七牛云存储'] as $k=>$v): ?>
                <input type="radio" data-storagetype="<?php echo htmlentities($k); ?>" name="storage_type" value="<?php echo htmlentities($k); ?>" title="<?php echo htmlentities($v); ?>" lay-filter="storage_type">
                <?php endforeach; ?>
                <p class="help-block">请选择文件存储类型，其它云储存需要配置正确的参数才可以上传文件哦！</p>
            </div>
        </div>
    </div>
</form>

<div data-type="oss"><form onsubmit="return false;" data-auto="true" method="post" class='layui-form layui-card' autocomplete="off">
    <div class="layui-card-body padding-0">
        <div class="color-blue padding-left-40 padding-bottom-20">
            文件将上传到阿里云OSS空间，需要配置OSS公开访问及跨域策略（目前已实现自动创建空间及配置访问策略）。
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">
                Protocol<br><span class="nowrap color-desc">访问协议</span>
            </label>
            <div class="layui-input-block">
                <!--<?php foreach(['http','https','auto'] as $pro): ?>-->
                <label class="think-radio">
                    <!--<?php if(sysconf('storage_oss_is_https') == $pro): ?>-->
                    <input checked type="radio" name="storage_oss_is_https" value="<?php echo htmlentities($pro); ?>" lay-ignore> <?php echo htmlentities($pro); ?>
                    <!--<?php else: ?>-->
                    <input type="radio" name="storage_oss_is_https" value="<?php echo htmlentities($pro); ?>" lay-ignore> <?php echo htmlentities($pro); ?>
                    <!--<?php endif; ?>-->
                </label>
                <!--<?php endforeach; ?>-->
                <p class="help-block">阿里云对象存储访问协议（http、https、auto），其中 https 需要配置证书才能使用，auto 为相对协议自动根据域名切换http与https。</p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">
                Bucket<br><span class="nowrap color-desc">空间名称</span>
            </label>
            <div class="layui-input-block">
                <input type="text" name="storage_oss_bucket" required value="<?php echo sysconf('storage_oss_bucket'); ?>" placeholder="请输入OSS Bucket (空间名称)" class="layui-input">
                <p class="help-block">填写OSS存储空间名称，如：think-admin-oss（需要是全区唯一的值，不存在时会自动创建）</p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">
                EndPoint<br><span class="nowrap color-desc">数据中心</span>
            </label>
            <div class="layui-input-block">
                <select required name="storage_oss_endpoint" class="layui-select">
                    <?php foreach($point as $k=>$p): ?>
                    <!--<?php if(sysconf('storage_oss_endpoint') == $k): ?>-->
                    <option selected value="<?php echo htmlentities($k); ?>"><?php echo htmlentities($p); ?> <span class="font-s10 color-desc">(<?php echo htmlentities($k); ?>)</span></option>
                    <!--<?php else: ?>-->
                    <option value="<?php echo htmlentities($k); ?>"><?php echo htmlentities($p); ?> <span class="font-s10 color-desc">(<?php echo htmlentities($k); ?>)</span></option>
                    <!--<?php endif; ?>-->
                    <?php endforeach; ?>
                </select>
                <p class="help-block">请选择OSS数据中心访问节点，有效值如：oss-cn-shenzhen.aliyuncs.com</p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">
                AccessKey<br><span class="nowrap color-desc">访问密钥</span>
            </label>
            <div class="layui-input-block">
                <input type="text" name="storage_oss_keyid" required value="<?php echo sysconf('storage_oss_keyid'); ?>" maxlength="16" placeholder="请输入OSS AccessKey (访问密钥)" class="layui-input">
                <p class="help-block">可以在 [ 阿里云 > 个人中心 ] 设置并获取到访问密钥。</p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">
                SecretKey<br><span class="nowrap color-desc">安全密钥</span>
            </label>
            <div class="layui-input-block">
                <input type="text" name="storage_oss_secret" required value="<?php echo sysconf('storage_oss_secret'); ?>" maxlength="30" placeholder="请输入OSS SecretKey (安全密钥)" class="layui-input">
                <p class="help-block">可以在 [ 阿里云 > 个人中心 ] 设置并获取到安全密钥。</p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">
                Domain<br><span class="nowrap color-desc">访问域名</span>
            </label>
            <div class="layui-input-block">
                <input type="text" name="storage_oss_domain" value="<?php echo sysconf('storage_oss_domain'); ?>" placeholder="请输入OSS存储 Domain (访问域名)" class="layui-input">
                <p class="help-block">填写OSS存储外部访问域名，如：think-admin-oss.oss-cn-shenzhen.aliyuncs.com（正常情况下是自动获取的）</p>
            </div>
        </div>
        <div class="hr-line-dashed margin-left-40"></div>
        <div class="layui-form-item text-center">
            <div class="layui-row">
                <div class="layui-col-sm8 layui-col-md6">
                    <input type="hidden" name="storage_type" value="oss">
                    <button class="layui-btn" type="submit">保存配置</button>
                </div>
            </div>
        </div>
    </div>
</form>
</div>
<div data-type="local"><form onsubmit="return false;" data-auto="true" method="post" class='layui-form layui-card padding-0' autocomplete="off">
    <div class="layui-card-body padding-0">
        <div class="color-blue padding-left-40 padding-bottom-20">
            文件将存储在本地服务器，需确保服务器的 public/upload 目录有写入权限，还需要有足够的存储空间。
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">
                AllowExts<br><span class="nowrap color-desc">允许上传文件</span>
            </label>
            <div class="layui-input-block">
                <input type="text" name="storage_local_exts" required value="<?php echo sysconf('storage_local_exts'); ?>" placeholder="请输入系统文件上传后缀" class="layui-input">
                <p class="help-block">设置系统允许上传文件的后缀，多个以英文逗号隔开。如：png,jpg,rar,doc</p>
            </div>
        </div>
        <div class="hr-line-dashed margin-left-40"></div>
        <div class="layui-form-item text-center">
            <div class="layui-row">
                <div class="layui-col-sm8 layui-col-md6">
                    <input type="hidden" name="storage_type" value="local">
                    <button class="layui-btn" type="submit">保存配置</button>
                </div>
            </div>
        </div>
    </div>
</form></div>
<div data-type="qiniu"><form onsubmit="return false;" data-auto="true" method="post" class='layui-form layui-card' autocomplete="off">
    <div class="layui-card-body padding-0">
        <div class="color-blue padding-left-40 padding-bottom-20">
            文件将上传到七牛云空间（<a target="_blank" href="https://portal.qiniu.com/signup?code=3lhz6nmnwbple">点击这里免费申请10G存储</a>），申请成功后添加公开bucket并配置接口密钥。
        </div>
        <div class="layui-form-item" data-storage-type="qiniu">
            <label class="layui-form-label">
                Protocol<br><span class="nowrap color-desc">访问协议</span>
            </label>
            <div class="layui-input-block">
                <!--<?php foreach(['http','https','auto'] as $pro): ?>-->
                <label class="think-radio">
                    <!--<?php if(sysconf('storage_qiniu_is_https') == $pro): ?>-->
                    <input checked type="radio" name="storage_qiniu_is_https" value="<?php echo htmlentities($pro); ?>" lay-ignore> <?php echo htmlentities($pro); ?>
                    <!--<?php else: ?>-->
                    <input type="radio" name="storage_qiniu_is_https" value="<?php echo htmlentities($pro); ?>" lay-ignore> <?php echo htmlentities($pro); ?>
                    <!--<?php endif; ?>-->
                </label>
                <!--<?php endforeach; ?>-->
                <p class="help-block">七牛云存储访问协议（http、https、auto），其中 https 需要配置证书才能使用，auto 为相对协议自动根据域名切换http与https。</p>
            </div>
        </div>
        <div class="layui-form-item" data-storage-type="qiniu">
            <label class="layui-form-label">
                Region<br><span class="nowrap color-desc">存储区域</span>
            </label>
            <div class="layui-input-block">
                <?php foreach(['华东','华北','华南','北美'] as $area): ?>
                <label class="think-radio">
                    <!--<?php if(sysconf('storage_qiniu_region') == $area): ?>-->
                    <input checked type="radio" name="storage_qiniu_region" value="<?php echo htmlentities($area); ?>" lay-ignore>
                    <!--<?php else: ?>-->
                    <input type="radio" name="storage_qiniu_region" value="<?php echo htmlentities($area); ?>" lay-ignore>
                    <!--<?php endif; ?>-->
                    <?php echo htmlentities($area); ?>
                </label>
                <?php endforeach; ?>
                <p class="help-block">七牛云存储空间所在区域，需要严格对应储存所在区域才能上传文件。</p>
            </div>
        </div>
        <div class="layui-form-item" data-storage-type="qiniu">
            <label class="layui-form-label">
                Bucket<br><span class="nowrap color-desc">空间名称</span>
            </label>
            <div class="layui-input-block">
                <input type="text" name="storage_qiniu_bucket" required value="<?php echo sysconf('storage_qiniu_bucket'); ?>" placeholder="请输入七牛云存储 Bucket (空间名称)" class="layui-input">
                <p class="help-block">填写七牛云存储空间名称，如：static</p>
            </div>
        </div>
        <div class="layui-form-item" data-storage-type="qiniu">
            <label class="layui-form-label">
                Domain<br><span class="nowrap color-desc">访问域名</span>
            </label>
            <div class="layui-input-block">
                <input type="text" name="storage_qiniu_domain" required value="<?php echo sysconf('storage_qiniu_domain'); ?>" placeholder="请输入七牛云存储 Domain (访问域名)" class="layui-input">
                <p class="help-block">填写七牛云存储访问域名，如：static.ctolog.cc</p>
            </div>
        </div>
        <div class="layui-form-item" data-storage-type="qiniu">
            <label class="layui-form-label">
                AccessKey<br><span class="nowrap color-desc">访问密钥</span>
            </label>
            <div class="layui-input-block">
                <input type="text" name="storage_qiniu_access_key" required value="<?php echo sysconf('storage_qiniu_access_key'); ?>" placeholder="请输入七牛云 AccessKey (访问密钥)" class="layui-input">
                <p class="help-block">可以在 [ 七牛云 > 个人中心 ] 设置并获取到访问密钥。</p>
            </div>
        </div>
        <div class="layui-form-item" data-storage-type="qiniu">
            <label class="layui-form-label">
                SecretKey<br><span class="nowrap color-desc">安全密钥</span>
            </label>
            <div class="layui-input-block">
                <input type="text" name="storage_qiniu_secret_key" required value="<?php echo sysconf('storage_qiniu_secret_key'); ?>" maxlength="43" placeholder="请输入七牛云 SecretKey (安全密钥)" class="layui-input">
                <p class="help-block">可以在 [ 七牛云 > 个人中心 ] 设置并获取到安全密钥。</p>
            </div>
        </div>
        <div class="hr-line-dashed margin-left-40"></div>
        <div class="layui-form-item text-center">
            <div class="layui-row">
                <div class="layui-col-sm8 layui-col-md6">
                    <input type="hidden" name="storage_type" value="qiniu">
                    <button class="layui-btn" type="submit">保存配置</button>
                </div>
            </div>
        </div>
    </div>
</form>
</div>

</div>

</div>

    </div>
    <!-- 主体内容 结束 -->
</div>
<script src="/qnm_manage/static/plugs/layui/layui.all.js"></script>
<script src="/qnm_manage/static/plugs/require/require.js"></script>
<script src="/qnm_manage/static/admin.js"></script>


<script>
    $(function () {
        apply('<?php echo sysconf("storage_type"); ?>');
        window.form.render();

        window.form.on('radio(storage_type)', function (data) {
            apply(data.value);
        });

        function apply(value) {
            var $active = $("[data-storagetype='" + value + "']").trigger('click');
            if ($active.size() < 1) $("[data-storagetype]:first").trigger('click');
            $('[data-type="' + value + '"]').show().siblings('[data-type]').hide();
        }
    });
</script>

</body>

</html>
