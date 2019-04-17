<?php /*a:1:{s:64:"D:\phpStudy\WWW\qnm_manage\application\admin\view\auth\form.html";i:1554193551;}*/ ?>
<form class="layui-form layui-card" action="<?php echo request()->url(); ?>" data-auto="true" method="post" autocomplete="off">
    <div class="layui-card-body">
        <div class="layui-form-item">
            <label class="layui-form-label">权限名称</label>
            <div class="layui-input-block">
                <input type="text" name="title" value='<?php echo htmlentities((isset($vo['title']) && ($vo['title'] !== '')?$vo['title']:"")); ?>' required placeholder="请输入权限名称" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">权限描述</label>
            <div class="layui-input-block">
                <textarea placeholder="请输入权限描述" required class="layui-textarea" name="desc"><?php echo htmlentities((isset($vo['desc']) && ($vo['desc'] !== '')?$vo['desc']:"")); ?></textarea>
            </div>
        </div>
    </div>
    <div class="hr-line-dashed"></div>
    <div class="layui-form-item text-center">
        <!--<?php if(!(empty($vo['id']) || (($vo['id'] instanceof \think\Collection || $vo['id'] instanceof \think\Paginator ) && $vo['id']->isEmpty()))): ?>-->
        <input type='hidden' value='<?php echo htmlentities($vo['id']); ?>' name='id'>
        <!--<?php endif; ?>-->
        <button class="layui-btn" type='submit'>保存数据</button>
        <button class="layui-btn layui-btn-danger" type='button' data-confirm="确定要取消编辑吗？" data-close>取消编辑</button>
    </div>
</form>