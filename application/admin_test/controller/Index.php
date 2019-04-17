<?php
namespace app\admin_test\controller;
use think\Controller;
class Index extends Controller
{
    public function index()
    {
        return $this->fetch();
    }

    public function console()
    {
        return $this->fetch();
    }
    public function user()
    {
        return $this->fetch();
    }
}
