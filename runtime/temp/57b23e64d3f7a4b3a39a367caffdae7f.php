<?php /*a:2:{s:65:"D:\phpStudy\WWW\qnm_manage\application\admin\view\node\index.html";i:1554193551;s:59:"D:\phpStudy\WWW\qnm_manage\application\admin\view\main.html";i:1555483979;}*/ ?>
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

    
<style>
    .layui-table tr:last-child td {
        border: none
    }

    .layui-table label {
        margin-top: 0;
        cursor: pointer
    }

    .layui-table .title-input {
        width: auto;
        height: 28px;
        line-height: 28px
    }
</style>

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
<!--<?php if(auth("admin/node/clear")): ?>-->
<button data-load='<?php echo url("clear"); ?>' class='layui-btn layui-btn-sm layui-btn-primary'>清理无效记录</button>
<!--<?php endif; ?>-->
</div>
    </div>
    <?php endif; ?>
    <div class="layui-card-body layui-anim layui-anim-fadein">
<div class="layui-tab layui-tab-card layui-box">
    <ul class="layui-tab-title">
        <?php foreach($groups as $key=>$group): ?>
        <li data-type='<?php echo htmlentities($key); ?>'>
            <?php echo (isset($group['node']['title']) && ($group['node']['title'] !== '')?$group['node']['title']:'<span class="color-desc">未配置名称</span>'); ?>（<?php echo htmlentities($key); ?>）
        </li>
        <?php endforeach; ?>
    </ul>
    <div class="layui-tab-content">
        <?php foreach($groups as $key=>$group): ?>
        <div class="layui-tab-item">
            <table class="layui-table border-0 block layui-elip" lay-skin="line">
                <!--<?php if(empty($nodes) || (($nodes instanceof \think\Collection || $nodes instanceof \think\Paginator ) && $nodes->isEmpty())): ?>-->
                <p class="help-block text-center well">没 有 记 录 哦！</p>
                <!--<?php else: ?>-->
                <!--<?php foreach($group['list'] as $key=>$vo): ?>-->
                <tr>
                    <td class='text-left nowrap'>
                        <span class="color-desc"><?php echo $vo['spl']; ?></span> <?php echo htmlentities($vo['node']); if(auth("admin/node/save")): ?>&nbsp;<input autocomplete="off" class='layui-input inline-block title-input' name='title' data-node="<?php echo htmlentities($vo['node']); ?>" value="<?php echo htmlentities($vo['title']); ?>"><?php endif; ?>
                    </td>
                    <td class='text-left nowrap text-middle'>
                        <?php if(auth("admin/node/save") and $vo['spt'] == 1): ?>
                        <label class="color-desc think-checkbox">
                            <input data-login-group="<?php echo htmlentities($vo['node']); ?>" type="checkbox"> 全部加入登录控制
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label class="notselect margin-left-15 color-desc think-checkbox">
                            <input data-auth-group="<?php echo htmlentities($vo['node']); ?>" type="checkbox"> 全部加入权限控制
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label class="notselect margin-left-15 color-desc think-checkbox">
                            <input data-menu-group="<?php echo htmlentities($vo['node']); ?>" type="checkbox"> 全部加入菜单节点选择器
                        </label>
                        <?php endif; if(auth("admin/node/save") and $vo['spt'] == 2): ?>
                        <span class="color-desc">&nbsp;├&nbsp;&nbsp;&nbsp;</span>
                        <label class="notselect margin-right-15 think-checkbox">
                            <!--<?php if(!(empty($vo['is_login']) || (($vo['is_login'] instanceof \think\Collection || $vo['is_login'] instanceof \think\Paginator ) && $vo['is_login']->isEmpty()))): ?>-->
                            <input data-login-filter="<?php echo htmlentities($vo['pnode']); ?>" checked='checked' class="check-box login_<?php echo htmlentities($key); ?>" type='checkbox' value='1' name='is_login' data-node="<?php echo htmlentities($vo['node']); ?>" onclick="!this.checked && ($('.auth_<?php echo htmlentities($key); ?>')[0].checked = !!this.checked)">
                            <!--<?php else: ?>-->
                            <input data-login-filter="<?php echo htmlentities($vo['pnode']); ?>" class="check-box login_<?php echo htmlentities($key); ?>" type='checkbox' value='1' name='is_login' data-node="<?php echo htmlentities($vo['node']); ?>" onclick="!this.checked && ($('.auth_<?php echo htmlentities($key); ?>')[0].checked = !!this.checked)">
                            <!--<?php endif; ?>-->
                            加入登录控制
                        </label>
                        <span class="color-desc">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├&nbsp;&nbsp;&nbsp;</span>
                        <label class="notselect margin-right-15 think-checkbox">
                            <!--<?php if(!(empty($vo['is_auth']) || (($vo['is_auth'] instanceof \think\Collection || $vo['is_auth'] instanceof \think\Paginator ) && $vo['is_auth']->isEmpty()))): ?>-->
                            <input data-auth-filter="<?php echo htmlentities($vo['pnode']); ?>" name='is_auth' data-node="<?php echo htmlentities($vo['node']); ?>" checked='checked' class="check-box auth_<?php echo htmlentities($key); ?>" type='checkbox' onclick="this.checked && ($('.login_<?php echo htmlentities($key); ?>')[0].checked = !!this.checked)" value='1'>
                            <!--<?php else: ?>-->
                            <input data-auth-filter="<?php echo htmlentities($vo['pnode']); ?>" name='is_auth' data-node="<?php echo htmlentities($vo['node']); ?>" class="check-box auth_<?php echo htmlentities($key); ?>" type='checkbox' value='1' onclick="this.checked && ($('.login_<?php echo htmlentities($key); ?>')[0].checked = !!this.checked)">
                            <!--<?php endif; ?>-->
                            加入权限控制
                        </label>
                        <span class="color-desc">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├&nbsp;&nbsp;&nbsp;</span>
                        <label class="notselect think-checkbox">
                            <!--<?php if(!(empty($vo['is_menu']) || (($vo['is_menu'] instanceof \think\Collection || $vo['is_menu'] instanceof \think\Paginator ) && $vo['is_menu']->isEmpty()))): ?>-->
                            <input data-menu-filter="<?php echo htmlentities($vo['pnode']); ?>" name='is_menu' data-node="<?php echo htmlentities($vo['node']); ?>" checked='checked' class='check-box menu_<?php echo htmlentities($key); ?>' type='checkbox' value='1'>
                            <!--<?php else: ?>-->
                            <input data-menu-filter="<?php echo htmlentities($vo['pnode']); ?>" name='is_menu' data-node="<?php echo htmlentities($vo['node']); ?>" class='check-box menu_<?php echo htmlentities($key); ?>' type='checkbox' value='1'>
                            <!--<?php endif; ?>-->
                            加入菜单节点选择器
                        </label>
                        <?php endif; ?>
                    </td>
                    <td data-tips-filter="<?php echo htmlentities($vo['pnode']); ?>" class="loading-tips nowrap full-width"></td>
                </tr>
                <!--<?php endforeach; ?>-->
                <!--<?php endif; ?>-->
            </table>
        </div>
        <?php endforeach; ?>
    </div>
</div>

<script>
    $(function () {

        $('.layui-tab ul.layui-tab-title li').on('click', function () {
            layui.data('node', {key: 'type', value: this.getAttribute('data-type')});
        });

        (function () {
            this.selectedType = layui.data('node')['type'] || '';
            this.selectedItem = $('.layui-tab ul.layui-tab-title li[data-type="' + this.selectedType + '"]');
            if (this.selectedItem.length < 1) this.selectedItem = $('.layui-tab ul.layui-tab-title li:first');
            this.selectedItem.trigger('click');
        }).call({});

        syncLoginGroup.call(this);
        $('[data-login-group]').on('click', function () {
            var twoNode = this.getAttribute('data-login-group');
            if (!checkRequestStatus(twoNode)) {
                this.checked = !this.checked;
                return $.msg.tips('正在处理中, 请稍候...');
            }
            var checked = !!this.checked;
            $('[data-login-filter="' + twoNode + '"]').map(function () {
                if (!(this.checked = checked)) {
                    $('[data-auth-filter="' + twoNode + '"]').map(function () {
                        this.checked = false;
                    });
                }
                update(this);
            });
        });

        syncAuthGroup.call(this);
        $('[data-auth-group]').on('click', function () {
            var twoNode = this.getAttribute('data-auth-group');
            if (!checkRequestStatus(twoNode)) {
                this.checked = !this.checked;
                return $.msg.tips('正在处理中, 请稍候...');
            }
            var checked = !!this.checked;
            $('[data-auth-filter="' + twoNode + '"]').map(function () {
                if ((this.checked = checked)) {
                    $('[data-login-filter="' + twoNode + '"]').map(function () {
                        this.checked = checked;
                    });
                }
                update(this);
            });
        });

        syncMenuGroup.call(this);
        $('[data-menu-group]').on('click', function () {
            var twoNode = this.getAttribute('data-menu-group');
            if (!checkRequestStatus(twoNode)) {
                this.checked = !this.checked;
                return $.msg.tips('正在处理中, 请稍候...');
            }
            var checked = !!this.checked;
            $('[data-menu-filter="' + twoNode + '"]').map(function () {
                this.checked = checked;
                update(this);
            });
        });

        // 更新触发更新
        $('input.check-box').on('click', function () {
            update(this);
        });

        $('input.title-input').on('blur', function () {
            update(this);
        });

        // 数据自动更新
        function update(self) {
            var $item = $(self).parents('tr'), data = {list: []};
            $item.find('input').map(function () {
                var value = this.type === 'text' ? this.value : (this.checked ? 1 : 0);
                data.list.push({name: this.name, value: value, node: this.getAttribute('data-node')});
            });
            $item.find('.loading-tips').html('<p class="color-green"><i class="fa fa-spinner fa-spin"></i> 更新数据...</p>');
            $.form.load('<?php echo url("save"); ?>', data, 'post', function (ret) {
                if (ret.code === 0) {
                    var tips = '<p class="color-red"><i class="fa fa-close"></i> 更新异常</p>';
                    return $item.find('.loading-tips').html(tips), false;
                }
                return $item.find('.loading-tips').html(''), false;
            }, false);
            return syncLoginGroup(), syncMenuGroup(), syncAuthGroup();
        }

        // 状态网络处理状态
        function checkRequestStatus(twoNode) {
            var status = true;
            $('.loading-tips[data-tips-filter="' + twoNode + '"]').map(function () {
                $(this).html() && (status = false);
            });
            return status;
        }

        // 同步登录分组状态
        function syncLoginGroup() {
            $('[data-login-group]').map(function () {
                var node = this.getAttribute('data-login-group'), checked = true;
                $('[data-login-filter="' + node + '"]').map(function () {
                    this.checked || (checked = false);
                });
                this.checked = checked;
            });
        }

        // 同步权限分组状态
        function syncAuthGroup() {
            $('[data-auth-group]').map(function () {
                var node = this.getAttribute('data-auth-group'), checked = true;
                $('[data-auth-filter="' + node + '"]').map(function () {
                    this.checked || (checked = false);
                });
                this.checked = checked;
            });
        }

        // 同步菜单分组状态
        function syncMenuGroup() {
            $('[data-menu-group]').map(function () {
                var node = this.getAttribute('data-menu-group'), checked = true;
                $('[data-menu-filter="' + node + '"]').map(function () {
                    this.checked || (checked = false);
                });
                this.checked = checked;
            });
        }
    });
</script>
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
