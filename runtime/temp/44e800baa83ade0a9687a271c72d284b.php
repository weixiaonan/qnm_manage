<?php /*a:3:{s:64:"D:\phpStudy\WWW\qnm_manage\application\admin\view\log\index.html";i:1555484222;s:59:"D:\phpStudy\WWW\qnm_manage\application\admin\view\main.html";i:1555483979;s:71:"D:\phpStudy\WWW\qnm_manage\application\admin\view\log\index_search.html";i:1555484215;}*/ ?>
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
        <div class="pull-right">

<?php if(auth("admin/log/del")): ?>
<button data-action='<?php echo url("del"); ?>' data-rule="id#{key}" data-csrf="<?php echo systoken('admin/log/del'); ?>" data-confirm="确定要删除日志吗？" class='layui-btn layui-btn-sm layui-btn-primary'>删除日志</button>
<?php endif; ?>

</div>
    </div>
    <?php endif; ?>
    <div class="layui-card-body layui-anim layui-anim-fadein">
<table class="layui-table" lay-skin="">
    <caption class="margin-bottom-10 text-left"><fieldset>

    <legend class="layui-bg-cyan">条件搜索</legend>

    <form class="layui-form layui-form-pane form-search" action="<?php echo request()->url(); ?>" onsubmit="return false" method="get" autocomplete="off">

        <div class="layui-form-item layui-inline">
            <label class="layui-form-label">操作账号</label>
            <div class="layui-input-inline">
                <input name="username" value="<?php echo htmlentities((app('request')->get('username') ?: '')); ?>" placeholder="请输入操作账号" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item layui-inline">
            <label class="layui-form-label">操作节点</label>
            <div class="layui-input-inline">
                <input name="node" value="<?php echo htmlentities((app('request')->get('node') ?: '')); ?>" placeholder="请输入操作节点" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item layui-inline">
            <label class="layui-form-label">操作行为</label>
            <div class="layui-input-inline">
                <input name="action" value="<?php echo htmlentities((app('request')->get('action') ?: '')); ?>" placeholder="请输入操作行为" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item layui-inline">
            <label class="layui-form-label">操作描述</label>
            <div class="layui-input-inline">
                <input name="content" value="<?php echo htmlentities((app('request')->get('content') ?: '')); ?>" placeholder="请输入操作内容" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item layui-inline">
            <label class="layui-form-label">位置地址</label>
            <div class="layui-input-inline">
                <input name="geoip" value="<?php echo htmlentities((app('request')->get('geoip') ?: '')); ?>" placeholder="请输入位置地址" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item layui-inline">
            <label class="layui-form-label">操作时间</label>
            <div class="layui-input-inline">
                <input data-date-range name="create_at" value="<?php echo htmlentities((app('request')->get('create_at') ?: '')); ?>" placeholder="请选择操作时间" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item layui-inline">
            <button class="layui-btn layui-btn-primary"><i class="layui-icon">&#xe615;</i> 搜 索</button>
        </div>
    </form>

</fieldset>
</caption>

    <?php if(!(empty($list) || (($list instanceof \think\Collection || $list instanceof \think\Paginator ) && $list->isEmpty()))): ?>
    <thead>
    <tr>
        <th class='list-table-check-td think-checkbox'>
            <input data-auto-none data-check-target='.list-check-box' type='checkbox'>
        </th>
        <th class='text-left nowrap' width="45%">操作</th>
        <th class='text-left nowrap' width="20%">权限</th>
        <th class='text-left nowrap' width="20%">位置</th>
        <th class='text-left nowrap' width="10%">操作时间</th>
        <th></th>
    </tr>
    </thead>
    <tbody>
    <!--<?php foreach($list as $key=>$vo): ?>-->
    <tr data-dbclick>
        <td class='list-table-check-td think-checkbox'>
            <input class="list-check-box" value='<?php echo htmlentities($vo['id']); ?>' type='checkbox'>
        </td>
        <td title="<?php echo htmlentities((isset($vo['content']) && ($vo['content'] !== '')?$vo['content']:'--')); ?>" class='text-left nowrap'>
            行为：<strong><?php echo htmlentities((isset($vo['action']) && ($vo['action'] !== '')?$vo['action']:'--')); ?></strong><br>
            描述：<?php echo htmlentities(cut_str((isset($vo['content']) && ($vo['content'] !== '')?$vo['content']:'--'),50)); ?>
        </td>
        <td class='text-left nowrap'>
            账号：<?php echo htmlentities((isset($vo['username']) && ($vo['username'] !== '')?$vo['username']:'--')); ?><br>
            节点：<?php echo htmlentities((isset($vo['node']) && ($vo['node'] !== '')?$vo['node']:'--')); ?>
        </td>
        <td class='text-left nowrap'>
            地址：<?php echo htmlentities((isset($vo['geoip']) && ($vo['geoip'] !== '')?$vo['geoip']:'--')); ?><br>
            位置：<?php echo htmlentities((isset($vo['isp']) && ($vo['isp'] !== '')?$vo['isp']:'--')); ?>
        </td>
        <td class='text-left nowrap'>
            日期：<?php echo str_replace(' ','<br>时间：',format_datetime($vo['create_at'])); ?>
        </td>
        <td class='text-left nowrap'>
            <?php if(auth("admin/log/del")): ?>
            <a data-dbclick class="layui-btn layui-btn-sm layui-btn-danger" data-confirm="确定要删除该日志吗？" data-action="<?php echo url('del'); ?>" data-value="id#<?php echo htmlentities($vo['id']); ?>" data-csrf="<?php echo systoken('admin/log/del'); ?>">删 除</a>
            <?php endif; ?>
        </td>
    </tr>
    <!--<?php endforeach; ?>-->
    </tbody>
    <?php endif; ?>
</table>

<?php if(empty($list) || (($list instanceof \think\Collection || $list instanceof \think\Paginator ) && $list->isEmpty())): ?><span class="notdata">没有记录哦</span><?php else: ?><?php echo (isset($pagehtml) && ($pagehtml !== '')?$pagehtml:''); ?><?php endif; ?>

</div>

</div>

    </div>
    <!-- 主体内容 结束 -->
</div>
<script src="/qnm_manage/static/plugs/layui/layui.all.js"></script>
<script src="/qnm_manage/static/plugs/require/require.js"></script>
<script src="/qnm_manage/static/admin.js"></script>


<script>window.form.render()</script>

</body>

</html>
