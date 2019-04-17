<?php /*a:2:{s:65:"D:\phpStudy\WWW\qnm_manage\application\admin\view\menu\index.html";i:1554193551;s:59:"D:\phpStudy\WWW\qnm_manage\application\admin\view\main.html";i:1555483979;}*/ ?>
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

<!--<?php if(auth("admin/menu/add")): ?>-->
<button data-modal='<?php echo url("add"); ?>' data-title="添加菜单" class='layui-btn layui-btn-sm layui-btn-primary'>添加菜单</button>
<!--<?php endif; ?>-->

<!--<?php if(auth("admin/menu/del")): ?>-->
<button data-action='<?php echo url("del"); ?>' data-csrf="<?php echo systoken('admin/menu/del'); ?>" data-rule="id#{key}" class='layui-btn layui-btn-sm layui-btn-primary'>删除菜单</button>
<!--<?php endif; ?>-->

</div>
    </div>
    <?php endif; ?>
    <div class="layui-card-body layui-anim layui-anim-fadein">
<!--<?php if(empty($list) || (($list instanceof \think\Collection || $list instanceof \think\Paginator ) && $list->isEmpty())): ?>-->
<blockquote class="layui-elem-quote">没 有 记 录 哦！</blockquote>
<!--<?php else: ?>-->
<input type="hidden" value="resort" name="action">
<table class="layui-table" lay-skin="line">
    <thead>
    <tr>
        <th class='list-table-check-td think-checkbox'>
            <input data-auto-none data-check-target='.list-check-box' type='checkbox'>
        </th>
        <th class='list-table-sort-td'>
            <button type="button" data-reload class="layui-btn layui-btn-xs">刷 新</button>
        </th>
        <th class='text-center' style="width:30px"></th>
        <th style="width:180px"></th>
        <th class='layui-hide-xs' style="width:180px"></th>
        <th style="width:100px"></th>
        <th></th>
    </tr>
    </thead>
    <tbody>
    <!--<?php foreach($list as $key=>$vo): ?>-->
    <tr data-dbclick>
        <td class='list-table-check-td think-checkbox'>
            <input class="list-check-box" value='<?php echo htmlentities($vo['ids']); ?>' type='checkbox'>
        </td>
        <td class='list-table-sort-td'>
            <input data-action-blur="<?php echo request()->url(); ?>" data-value="id#<?php echo htmlentities($vo['id']); ?>;action#sort;sort#{value}" data-loading="false" value="<?php echo htmlentities($vo['sort']); ?>" class="list-sort-input">
        </td>
        <td class='text-center'><i class="<?php echo htmlentities($vo['icon']); ?> font-s18"></i></td>
        <td class="nowrap"><span class="color-desc"><?php echo $vo['spl']; ?></span><?php echo htmlentities($vo['title']); ?></td>
        <td class='layui-hide-xs'><?php echo htmlentities($vo['url']); ?></td>
        <td class='text-center nowrap'><?php if($vo['status'] == '0'): ?><span class="layui-badge">已禁用</span><?php else: ?><span class="layui-badge layui-bg-green">使用中</span><?php endif; ?></td>
        <td class='text-center nowrap notselect'>

            <?php if(auth("admin/menu/add")): ?>
            <span class="text-explode">|</span>
            <!--<?php if($vo['spt']<2): ?>-->
            <a class="layui-btn layui-btn-xs layui-btn-primary" data-tips-text="添加子菜单" data-modal='<?php echo url("add"); ?>?pid=<?php echo htmlentities($vo['id']); ?>'>添 加</a>
            <!--<?php else: ?>-->
            <a class="layui-btn layui-btn-xs layui-btn-disabled">添 加</a>
            <!--<?php endif; ?>-->
            <?php endif; if(auth("admin/menu/edit")): ?>
            <a data-dbclick class="layui-btn layui-btn-xs" data-title="编辑菜单" data-modal='<?php echo url("admin/menu/edit"); ?>?id=<?php echo htmlentities($vo['id']); ?>'>编 辑</a>
            <?php endif; if($vo['status'] == 1 and auth("admin/menu/forbid")): ?>
            <a class="layui-btn layui-btn-warm layui-btn-xs" data-action="<?php echo url('forbid'); ?>" data-value="id#<?php echo htmlentities($vo['ids']); ?>;status#0" data-csrf="<?php echo systoken('admin/menu/forbid'); ?>">禁 用</a>
            <?php elseif(auth("admin/menu/resume")): ?>
            <a class="layui-btn layui-btn-warm layui-btn-xs" data-action="<?php echo url('resume'); ?>" data-value="id#<?php echo htmlentities($vo['ids']); ?>;status#1" data-csrf="<?php echo systoken('admin/menu/resume'); ?>">启 用</a>
            <?php endif; if(auth("admin/menu/del")): ?>
            <a class="layui-btn layui-btn-danger layui-btn-xs" data-confirm="确定要删除数据吗?" data-action="<?php echo url('del'); ?>" data-value="id#<?php echo htmlentities($vo['ids']); ?>" data-csrf="<?php echo systoken('admin/menu/del'); ?>">删 除</a>
            <?php endif; ?>

        </td>
    </tr>
    <!--<?php endforeach; ?>-->
    </tbody>
</table>
<!--<?php endif; ?>-->
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
