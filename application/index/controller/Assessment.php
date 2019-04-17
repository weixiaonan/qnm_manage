<?php
namespace app\index\controller;

use think\Controller;
use think\Db;
use think\Session;
use think\Request;
/**
 * 应用入口控制器
 * @author Anyon <zoujingli@qq.com>
 */
class Assessment extends Controller
{
    public function index()
    {

        if (isset($_GET['debug'])) {
            $openid = 'oB4yY1VR44NKVBtcQkewQiGZBy9A';
            $wx_member_info = Db::name('member')->where("openid",$openid)->find();
            session('wx_member_info', $wx_member_info);
            action("index/assessment/index_html");
            return $this->fetch();
        }

        if(session("wx_member_info")){
            $this->redirect("index/assessment/index_html");

        }

        // 访问域名会优先执行index方法，用以获取到code
        $dbres = Db::name("wx_set")->find();
        $appid = $dbres['appid'];
        $redirect_uri = urlencode($dbres['back_url']);

        $url ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$appid."&redirect_uri=".$redirect_uri."&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        header("Location:".$url);exit;

    }

    public function getUserOpentId(){
        //回调地址会传回一个code，则我们根据code去获取openid和授权获取到的access_token
        $code   = $_GET['code'];
        $dbres  = Db::name("wx_set")->find();
        $appid  = $dbres['appid'];
        $secret = $dbres['appsecret'];
        $url    = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$appid."&secret=".$secret."&code=".$code."&grant_type=authorization_code";

        $res    = http_curl($url);

        $access_token = $res['access_token'];

        $getopenid = $res['openid'];
        //获取用户授权信息
        $urltoc = "https://api.weixin.qq.com/sns/userinfo?access_token=".$access_token."&openid=".$getopenid."&lang=zh_CN";
        $resinfos = http_curl($urltoc);
        $openid = $resinfos['openid'];
        $check_member = Db::name("member")->where('openid',$openid)->find();
        if(empty($check_member)){
            //首次进入，则获取用户信息，插入数据库
            $resinfo['openid'] = $openid;
            $insert_data = [
                'openid' => $openid,
                'nickname' => $resinfos['nickname'],
                'headimgurl' => $resinfos['headimgurl'],
                'add_time' => time()
            ];
            Db::name("member")->insert($insert_data);
            session('wx_member_info', $resinfo);
            $this->redirect('index/assessment/index_html');
        }else{
            //说明是已经是公众号成员，则调用用户信息存到session即可
            $insert_data = [
                'nickname' => $resinfos['nickname'],
                'headimgurl' => $resinfos['headimgurl'],
                'update_time' => time()
            ];
            Db::name("member")->where('openid', '=', $openid)->update($insert_data);

            $wx_member_info = Db::name('member')->where("openid",$openid)->find();
            session('wx_member_info', $wx_member_info);
            $this->redirect('index/assessment/index_html');
        }
    }

    public function index_html(){
        if(!session("wx_member_info")){
            action("index/assessment/index");
        }else{

            //获取下线人员
            $id = session("wx_member_info.id");
            $my_member_list = Db::name('member')->where("pid",$id)->select();
            $this->assign('my_member_list', $my_member_list);
            return $this->fetch('index');
        }
    }


    public function answer()
    {

        $member_id = $this->request->param('member_id', 0, 'intval');
        if(!session("wx_member_info") || !$member_id){
            action("index/assessment/index");
        }

        $last_month= $this->request->param('year_month', '');
        $wx_member_info = Db::name('member')->where("id",$member_id)->find();
        $score_sum  = 0;
        if ($last_month == '') {
            $last_month = date('Ym',strtotime('-1 month'));
        }
        $list = DB::name('subject')->select();
        foreach ($list as &$row) {
            $row['subject_title'] = DB::name('subject_title')->where('subject_id', '=', $row['id'])->order('score DESC')->select();
            //查询是否提交过
            //提交的选项ID
            $row['check_subject_title_id'] = 0;
            //提交的选项对应的分数
            $row['check_subject_score']    = 0;
            $subject_log = Db::name('trainee_subject_log')->where('year_month', '=', $last_month)->where('subject_id', '=', $row['id'])->find();
            if ($subject_log) {
                $row['check_subject_title_id'] = $subject_log['subject_title_id'];
                $score_sum += intval($subject_log['score']);
            }
        }

        $this->assign('list', $list);
        $this->assign('member_id', $member_id);
        $this->assign('member', $wx_member_info);
        $this->assign('last_month', $last_month);
        $this->assign('score_sum', $score_sum);
        return $this->fetch();
    }

    /**
     * 提交考核
     */
    function saveSubjectLog()
    {
        $data = $this->request->post();
        $last_month = strtotime('-1 month');
        $openid = 'abc123456';
        $subject_log_data = [];
        $years            = date('Y', $last_month);
        $months           = date('m', $last_month);
        $year_month       = date('Ym', $last_month);
        $member_id        = $data['member_id'];
        $time             = time();
        foreach ($data['subject_ids'] as $key=>$val) {
                $row_data = [];
                $row_data['member_id']  = $member_id;
                $row_data['subject_id'] = $val;
                $row_data['subject_title_id'] = $data['subject_title_ids'][$key];
                $row_data['score']      = $data['scores'][$key];
                $row_data['years']      = $years;
                $row_data['months']     = $months;
                $row_data['year_month'] = $year_month;
                $row_data['add_time']   = $time;
                $row_data['add_openid'] = $openid;

                $subject_log_data[] = $row_data;

        }
        $query = DB::name('trainee_subject_log')->insertAll($subject_log_data);
        if ($query) {
            echo json_encode(['code' => 0, 'msg' => '提交成功！']);
        } else {
            echo json_encode(['code' => 0, 'msg' => '提交失败！']);
        }
    }

    /**
     * 个人的考核
     */
    function memberSubjectLog()
    {
        $member_id = $this->request->param('id', 0, 'intval');
        $is_check_last_month = 0;
        if ($member_id) {
            $wx_member_info = Db::name('member')->where("id",$member_id)->find();
            $subject_log = DB::name('trainee_subject_log')
                                ->where('member_id', $member_id)
                                ->field('SUM(score)  AS score,`year_month`')
                                ->order('year_month',' DESC ')
                                ->group('`year_month`')
                                ->select();
            //判断上个月是否考核
            $last_month = date('Ym',strtotime('-1 month'));
            if (isset($subject_log[0]) && $subject_log[0]['year_month'] == $last_month) {
                $is_check_last_month = 1;
            }

            $this->assign('subject_log', $subject_log);
            $this->assign('member', $wx_member_info);
            $this->assign('is_check_last_month', $is_check_last_month);
        }
        return $this->fetch();
    }

}
