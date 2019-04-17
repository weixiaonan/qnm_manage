<?php /*a:3:{s:65:"D:\phpStudy\WWW\qnm_manage\application\admin\view\auth\index.html";i:1554193551;s:59:"D:\phpStudy\WWW\qnm_manage\application\admin\view\main.html";i:1555483979;s:72:"D:\phpStudy\WWW\qnm_manage\application\admin\view\auth\index_search.html";i:1554193551;}*/ ?>
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
<!--<?php if(auth("admin/auth/add")): ?>-->
<button data-modal='<?php echo url("add"); ?>' data-title="添加权限" class='layui-btn layui-btn-sm layui-btn-primary'>添加权限</button>
<!--<?php endif; ?>-->

<!--<?php if(auth("admin/auth/del")): ?>-->
<button data-action='<?php echo url("del"); ?>' data-rule="id#{key}" data-csrf="<?php echo systoken('admin/auth/del'); ?>" data-confirm="确定要删除这些权限吗？" class='layui-btn layui-btn-sm layui-btn-primary'>删除权限</button>
<!--<?php endif; ?>-->
</div>
    </div>
    <?php endif; ?>
    <div class="layui-card-body layui-anim layui-anim-fadein">

<table class="layui-table" lay-skin="line">
    <caption class="margin-bottom-10 text-left"><fieldset>
    <legend class="layui-bg-cyan">条件搜索</legend>
    <form class="layui-form layui-form-pane form-search" action="<?php echo request()->url(); ?>" onsubmit="return false" method="get" autocomplete="off">
        <div class="layui-form-item layui-inline">
            <label class="layui-form-label">权限名称</label>
            <div class="layui-input-inline">
                <input name="title" value="<?php echo htmlentities((app('request')->get('title') ?: '')); ?>" placeholder="请输入权限名称" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item layui-inline">
            <label class="layui-form-label">权限描述</label>
            <div class="layui-input-inline">
                <input name="desc" value="<?php echo htmlentities((app('request')->get('desc') ?: '')); ?>" placeholder="请输入权限描述" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item layui-inline">
            <label class="layui-form-label">使用状态</label>
            <div class="layui-input-inline">
                <select class="layui-select" name="status">
                    <?php foreach([''=>'-- 全部 --','0'=>'已禁用的权限','1'=>'使用中的权限'] as $k=>$v): if(app('request')->get('status') == $k.""): ?>
                    <option selected value="<?php echo htmlentities($k); ?>"><?php echo htmlentities($v); ?></option>
                    <?php else: ?>
                    <option value="<?php echo htmlentities($k); ?>"><?php echo htmlentities($v); ?></option>
                    <?php endif; ?>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>
        <div class="layui-form-item layui-inline">
            <label class="layui-form-label">创建时间</label>
            <div class="layui-input-inline">
                <input data-date-range name="create_at" value="<?php echo htmlentities((app('request')->get('create_at') ?: '')); ?>" placeholder="请选择创建时间" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item layui-inline">
            <button class="layui-btn layui-btn-primary"><i class="layui-icon">&#xe615;</i> 搜 索</button>
        </div>
    </form>
</fieldset>

<script>form.render()</script></caption>
    <!--<?php if(!(empty($list) || (($list instanceof \think\Collection || $list instanceof \think\Paginator ) && $list->isEmpty()))): ?>-->
    <thead>
    <tr>
        <th class='list-table-check-td think-checkbox'>
            <input data-auto-none data-check-target='.list-check-box' type='checkbox'>
        </th>
        <th class='text-left nowrap'>名称</th>
        <th class='text-left nowrap'>描述</th>
        <th class='text-center nowrap'>创建时间</th>
        <th class="text-center">状态</th>
        <th></th>
    </tr>
    </thead>
    <!--<?php endif; ?>-->
    <tbody>
    <!--<?php foreach($list as $key=>$vo): ?>-->
    <tr data-dbclick>
        <td class='list-table-check-td think-checkbox'><input class="list-check-box" value='<?php echo htmlentities($vo['id']); ?>' type='checkbox'></td>
        <td class='text-left'><?php echo htmlentities($vo['title']); ?></td>
        <td class='text-left'><?php echo htmlentities((isset($vo['desc']) && ($vo['desc'] !== '')?$vo['desc']:"<span class='color-desc'>没有写描述哦！</span>")); ?></td>
        <td class="text-center nowrap"><?php echo htmlentities(format_datetime($vo['create_at'])); ?></td>
        <td class='text-center nowrap'><?php if($vo['status'] == '0'): ?><span class="layui-badge">已禁用</span><?php else: ?><span class="layui-badge layui-bg-green">使用中</span><?php endif; ?></td>
        <td class='text-center nowrap'>

            <?php if(auth("admin/auth/edit")): ?>
            <span class="text-explode">|</span>
            <a data-dbclick class="layui-btn layui-btn-xs" data-title="编辑权限" data-modal='<?php echo url("admin/auth/edit"); ?>?id=<?php echo htmlentities($vo['id']); ?>'>编 辑</a>
            <?php endif; if(auth("admin/auth/apply")): ?>
            <a class="layui-btn layui-btn-normal layui-btn-xs" data-open='<?php echo url("admin/auth/apply"); ?>?id=<?php echo htmlentities($vo['id']); ?>'>授 权</a>
            <?php endif; if($vo['status'] == 1 and auth("admin/auth/forbid")): ?>
            <a class="layui-btn layui-btn-warm layui-btn-xs" data-action="<?php echo url('forbid'); ?>" data-value="id#<?php echo htmlentities($vo['id']); ?>;status#0" data-csrf="<?php echo systoken('admin/auth/forbid'); ?>">禁 用</a>
            <?php elseif(auth("admin/auth/resume")): ?>
            <a class="layui-btn layui-btn-warm layui-btn-xs" data-action="<?php echo url('resume'); ?>" data-value="id#<?php echo htmlentities($vo['id']); ?>;status#1" data-csrf="<?php echo systoken('admin/auth/resume'); ?>">启 用</a>
            <?php endif; if(auth("admin/auth/del")): ?>
            <a class="layui-btn layui-btn-danger layui-btn-xs" data-confirm="确定要删除数据吗?" data-action="<?php echo url('del'); ?>" data-value="id#<?php echo htmlentities($vo['id']); ?>" data-csrf="<?php echo systoken('admin/auth/del'); ?>">删 除</a>
            <?php endif; ?>

        </td>
    </tr>
    <!--<?php endforeach; ?>-->
    </tbody>
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


</body>

</html>
