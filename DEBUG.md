# 接口联调记录

## 20191029

* [x] 缺少根据账号获取用户接口
* [x] `/api/sys/user/validAccount/{account}`用户名存在时接口500
* [x] `/api/sys/user/add`添加用户500，不带机构相关信息
* [x] `/api/sys/user/forbiddenOrEnable/{userId}`修改用户状态用的GET方法
* [x] `/api/sys/user/deleteAccount`接口调用成功，用户还存在
* [x] 无批量删除接口
* [x] `/api/sys/user/userDetail/{userId}`无昵称字段
* [x] 用户更新保存500
* [x] `/api/sys/user/list`用户信息缺少角色字段
* [x] `/api/sys/user/changePasswordByAdmin`提示权限不足
* [x] `/api/sys/role/list`角色未区分平台角色还是机构角色

## 20191030

* [x] 数据审批使用的HTTP方法为GET
* [x] 开始时间-结束时间使用时间戳，现在使用的string
* [x] page接口没有按审批状态筛选参数
* [x] page接口无申报企业属性
* [x] 带过期的token调用登录接口，接口调用返回的是500
* [x] 登录接口地址是万维的
* [x] 用户删除500

## 20191031


## 20191101

* [x] 用户删除500
* [x] 用户编辑500
* [x] 用户禁用500
* [x] 缺少接口：机构禁用/启用
* [x] 缺少接口：机构删除
* [x] 缺少接口：分组名修改
* [x] 分组删除：机构分组置空了，但是分组还在
* [x] /api/sys/team/teamOrrganizeList，加了name参数500
* [x] 机构详情接口需要保存下机构分组id，因为是懒加载
* [x] 机构编辑时，报批对象和下发对象应该排出自身机构，获取机构列表新增参数：当前机构id
* [x] 结构列表接口，机构类型为上市公司时，没将上司公司的基础信息带出来

## 20191114

* [x] /api/sys/team/deleteTeam机构删除成功，刷新页面机构还在
* [x] /api/sys/team/forbiddenOrEnable机构禁用之后再启用，机构用户还是禁用状态
* [x] /api/sys/user/userDetail/402880026e68fbf2016e6966c6810005机构用户获取用户详情500（无法获取机构用户列表，无法测试）
* [x] /api/sys/team/team/402880026e68fbf2016e69b8c09d0015上市公司详情没有把公司信息带出来，编辑时需要展示
* [x] /api/sys/user/page带cnName查询条件500

## 20191115
* [x] 缺少接口：根据基础公司id获取基础公司信息
* [x] 基础公司表字段数据更新
* [x] 缺少接口：事件监测详情接口
* [x] 事件监测新增：预警配置：预警类型应该是多选的
* [x] 缺少接口：获取推送类型
* [x] 参数错误，事件监测新增周期、推送类型、预警类型应该是数组

## 20191118

* [x] 监测列表节点类型需要区分是事件监测还是企业监测，现在只有两种：monitor和group，需要区分事件监测、企业监测、事件监测分组
* [x] /api/sy/monitor/treeList?name=%E6%B5%8B&type=1，500
* [x] 企业监测预警参数与事件监测不一样
* [x] 缺少根据监测id获取监测任务详情，编辑用
* [x] 缺少接口：根据企业监测id获取监测企业的列表数据
* [x] /api/sy/monitor/comPanyMonitorList，缺少参数：企业监测ID，缺少分页

## 20191120


## 20191121

* [x] /api/sys/team/teamOrrganizeList?type=2上市公司列表默认分组的公司text属性为null
* [x] /api/sys/team/add创建机构设置的管理员默认角色为null

## 20191122
* [x] /api/sys/user/page查询机构用户带上teamId参数查询结果为空
* [x] /api/sys/group/groupList?type=2上市公司管理获取分组列表500

## 20191123
* [x] 机构使用期限控制
* [x] 用户及机构权限控制
* [x] 缺少接口：机构域名唯一性校验
* [x] /api/sys/group/delete分组删除之后，分组下的机构也没有了
* [x] /api/sy/portrait/all接口使用的是GET请求，参数用的是body，GET请求没有body
* [x] 缺少接口：根据画像id获取画像详情
* [x] /api/sy/monitor/comPanyMonitorList，返回结果需要封装成事件监测列表一样的，包含text，value，type属性
* [x] 事件分组列表权限控制，创建监测任务时不能看到其他用户的分组（无法获取用户teamId，无法测试）
* [x] 任务修改会单独修改监测配置和预警配置
* [x] /api/sy/report/all报告查询方法错误，用的GET，但是查询参数在Body
* [x] /api/sy/report/uploadFile报告上传参数：团队为多选
* [x] /api/sy/report/downloadAllFile，GET方法参数在body中
* [x] /api/sys/team/team/000000006e8d2623016e8d4d15af0003权限菜单列表为空
* [x] /api/sys/team/teamOrrganizeList?type=2上市公司管理默认分组的公司text字段为空
* [x] /api/sys/team/add，/api/sys/team/update报批对象和下发对象传到后台的值可能会有groupId，有groupId的将分组下的所有机构设置为报批对象或者下发对象
* [x] 缺少接口：获取框架通知消息列表
* [x] /api/sy/monitor/getEsCountData?id=000000006e92012d016e925519d0000d返回数组，包含{中文名，类型值，数量}，类型只有6个？
* [x] /api/sy/monitor/getById?id=000000006e92012d016e925519d0000d详情信息数据不完整
* [x] /api/sy/monitor/treeList?name=%E6%B5%8B%E8%AF%95&type=1搜索时需要返回类型：分组，事件监测，企业监测


## 20191124 新
* [x] /api/sys/team/update更新报错
* [x] /api/sy/monitor/updateEventMonitor 500
* [x] /api/sy/monitor/updateEventEarlyWarning 500
* [x] /api/sy/monitor/updateCompanyMonitor 500
* [x] /api/sy/monitor/updateCompanyEarlyWarning 500

## 20191125
* [x] /api/sy/monitor/treeList?type=1 事件监测任务列表返回了企业监测任务
* [x] /api/sy/reportCenter/saveReportFolder 新增报告夹之后需要返回报告夹信息，默认选中需要
* [x] /api/sy/reportCenter/addArticleToFolder 可以批量加入报告夹
* [x] 缺少接口：根据id获取企业监测详情，编辑企业监测用

## 20191130
1. [] 用户管理无批量导出接口
1. [] Token自动续期
1. [] /api/sys/team/team/000000006e981547016e9823ed7c0001返回的报批对象和下发对象没有选中的分组
1. [] /api/sy/monitor/page响应缺少分页数据，企业列表缺少地域信息
1. [] /api/sy/monitor/getEsList 响应无相似文章数，需要去掉content这些大字段属性
1. [] /api/sy/monitor/getEsList，缺少筛选条件：信息源类型，排列方式，情感倾向，时间范围，关键字
1. [] /api/sys/model/list菜单列表接口未排除禁用的菜单module_status=0
1. [x] 缺少接口：全局搜索的热门搜索词列表
1. [] /api/sy/monitor/getEsList 分页pageSize传5，无数据返回
1. [] 缺少接口：下载文章及其相似文章，批量下载文章
1. [] 发起报批如果带有文章id，需要将文章内容填充到报批内容中
1. [] /api/sy/reportCenter/queryReport接口/home/sytest/... 返回的路径隐藏前面的路径
1. [] /api/sy/reportCenter/addArticleToFolder 选择10条加入报告夹，实际只有一篇加入了
1. [] /api/sy/portrait/export 导出的excel无法打开
1. [] /api/sy/portrait/import 导入验重，导入数据默认状态为空
1. [] /api/sys/baseCompany/page 模糊查询
1. [] /api/sy/report/uploadFile pdf文件无法上传，word可以
1. [] /api/sy/report/downLoadFile 下载500：文件不存在
1. [x] /api/main/findComPanyInfo?id=000000006eb668ed016eb66f06aa0002 新增根据id查询，缺少响应：经营范围，所属行业，细分行业，所属市场，董事长，总经理，财务总监，董事会成员
1. [] /api/main/findClassfiyRiskLabel 新增根据企业id查询 不传类型返回所有的风险标签，事件案由，经营类型及其对应的值
1. [] /api/model/findSearchNoticeOrReport Page index must not be less than zero!
1. [] /api/model/findStockPost Page index must not be less than zero!
1. [] 缺少接口：微信/邮箱发送信息
1. [] 缺少接口：事件监测智能分析生成报告
1. [] 缺少接口：企业监测智能分析生成报告
1. [] /api/analysic/findClassiFyEventMonitorTotal 微博统计数据有两条
1. [] /api/sys/group/groupList?type=2 获取机构/上市公司分组500
1. [] /api/sys/group/delete 删除事件监测分组后，分组下的事件没了
1. [] /api/retrieve/queryArticleTrend 微博数据始终为空
1. [] 信息中心（模块化）/api/main/findClassfiyAreaTotal 应该返回所有的省的数据，现在只有10条

## 20191205
1. [] /api/comAnalysic/findMonitorCompanyTotal 企业监测-智能分析-监测总数 500
1. [] /api/comAnalysic/findCompanyTradeTotal 企业监测-智能分析-行业分类 500
1. [] /api/comAnalysic/findCompanyAreaTotal 企业监测-智能分析-地域分类 500
1. [] /api/comAnalysic/findCompanyHotAndSensitiveNews 企业监测-智能分析-敏感排行 model为2时500
1. [] /api/comAnalysic/findHotCompanyRankTotal 企业监测-智能分析-热点企业排行 无数据
1. [] /api/comAnalysic/findHotCompanyRankTotal 企业监测-智能分析-企业排行，需要返回企业的id，名称，股票代码
1. [] /api/comAnalysic/findInformationTrendData 企业监测-智能分析-信息趋势 应该返回舆情，司法，研报，公告，股吧的统计，现在返回的时舆情中各类型的统计
1. [] 缺少接口：企业监测-智能分析-信息分类占比：统计舆情、司法、经营、公告、研报
1. [] 缺少接口：企业监测-智能分析-热词