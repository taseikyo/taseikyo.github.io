/**
 * 
 * @authors Lewis Tian (chasetichlewis@gmail.com)
 * @date    2017-10-15 19:46:00
 * @version $Id$
 */

/* 鼠标点击特效 */
var a_idx = 0;
jQuery(document).ready(function($) {
    $("body").click(function(e) {
        var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 9999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#ff6651"
        });
        $("body").append($i);
        $i.animate({
            "top": y - 180,
            "opacity": 0
        },
        1500,
        function() {
            $i.remove();
        });
    });
});

/* 点击头像更换b站挂件 */
var title = ['2018', '2018超', '2019创作新秀', '2019拜年祭·典藏', '2019拜年祭·纪念', '7月暑期打卡', '8月打卡肝帝', 'bilibili冬', 'bilibili夏', 'bilibili春', 'bilibili秋', 'BML2019 Lv1', 'BW广州指挥官', 'B站邮政限定', 'citrus', 'FFF团', 'Free！', 'Infini-T Force', 'OVERLORD', 'POWER UP 2018', 'RX-0 (NT-D)', 'S8-EDG战队', 'S8-IG战队', 'S8-RNG战队', 'S8冠军-IG', 'saber', 'UP主学园-学员', 'vlogger', 'X契约', '一起吃月饼', '七魔女应援', '万界仙踪', '不吉波普不笑', '不良人', '专栏2周年', '中野一花', '中野三玖', '中野二乃', '中野五月', '中野四叶', '主站主播头像框', '久美子', '买买买', '交汇的世界', '人形自走放炮姬', '从零开始的魔法书', '作文鬼才', '你好世界', '修仙做大牌', '充值礼包限定挂件', '全明星', '全职高手', '冯宝宝', '冰菓', '冲出太阳系', '凹凸世界', '刀说异数', '创作激励新秀奖', '创想无双', '刺客伍六七', '剑网3十周年', '加藤惠', '动感DJ', '危险的老婆', '叛逆性百万亚瑟王', '吉尔伽美什', '吐彩虹', '哈啦咻', '哔哩哔哩活动 2018冬', '哔哩哔哩活动 2018秋', '哔哩王', '喂，看见耳朵啦', '围观群众', '国宝锦鲤', '国民老公带回家', '圣诞帽', '圣诞节快乐', '地中海', '坂本', '埃罗芒阿老师', '声控', '夏日福利限定挂件', '夏目友人帐', '天谕', '头号玩家', '学霸', '守护之翼', '完美存档', '实验品家庭', '寒假玩什么', '小圆', '小绿和小蓝', '小试身手', '小魔女学园', '少女前线', '少年歌行', '局座', '工作细胞', '布洛妮娅', '幕后交易', '干杯十周年·典藏', '干杯十周年·珍藏', '平安物语', '年度猫片', '应援奖励', '开封奇谈', '异常生物', '张嘴吃药', '影帝', '御坂', '忍3夏日祭', '快把我哥带走', '恋爱暴君', '我与B站九周年', '我家大师兄脑子有坑', '我是江小白', '战斗吧歌姬', '拉文克劳', '择天记', '拳皇', '拾又之国', '攻略组', '放肆大学', '整装待发', '文豪', '斗破苍穹', '斩兽之刃', '断幺九干不死', '斯莱特林', '无限小电视', '春原庄的管理人小姐', '晴明', '暮光幻影', '有问哔答', '木之本樱', '格兰芬多', '梦100', '梦塔·雪谜城', '正义之士', '步天歌应援', '毕业季', '汉化日记', '沈剑心', '浴室情缘', '灵笼', '猪年专属', '王子碰碰球', '环游世界', '甜蜜告白', '用爱放铳', '电磁力机甲', '画江湖之侠岚', '真香', '碧蓝之海', '神乐', '神灵凭依', '神谕法阵', '纳米核心', '美术馆女神', '脑斧帽', '脑洞大开', '至高守护', '茶啊二中', '萌妻食神', '血色苍穹', '记忆U盘', '请吃红小豆', '赫奇帕奇', '跑跑卡丁车', '轻视频夏日祭', '轻车熟路', '远坂凛', '迷影者', '追番党', '霹雳布袋戏', '领风者', '首批购买大会员', '首批购买年度大会员', '高温', '魔法至上', '黑暗料理', '黑白无双', '龙族幻想']
var counts = title.length
var init = Math.floor(Math.random()*counts)
$(".site-author").prepend("<img class='site-avatar-plug-bilibili'/>");
$(".site-avatar-plug-bilibili").attr("src", "/blog/images/bili-pendant/bili-" + init + ".png")
$(".site-avatar-plug-bilibili").attr("title", '点我看看有什么效果~')
$(".site-author-image").attr("title", title[init])
jQuery(document).ready(function($) {
    $(".site-author-image").click(function(e) {
        init = Math.floor(Math.random()*counts)
		$(".site-avatar-plug-bilibili").attr("src", "/blog/images/bili-pendant/bili-" + init + ".png")
		$(".site-author-image").attr("title", title[init])
    });
});