/**
 * 参数说明
 * @component<Function> {?<SubmitForm>} 增改查组件
 * @meta<Object> 注入配置
 * @meta.title<String> 标题
 * @meta.parentTitle<String> 父标题
 * @meta.isBack<Boolean> 是否显示返回按钮
 * @meta.backName<String> 返回组件名称
 * @meta.isHide<Boolean> 是否显示菜单
 * @meta.form<Array[String/Object]> 注入表单组件类型key/注入表单组件{type...}
 * @meta.isRequired<Array[String/Object]/'all'> 表单组件校验
 * @meta.api<String> 接口key
 */
export default {
    path: '/Question',
    redirect: '/Question/Exam',
    meta: { title: '题库管理', icon: 'icondetail-fill' },
    component: () => import('@/components/Content'),
    children: [
        { path: '/Question/Exam', name: 'Exam', component: () => import('@/views/question/Exam'), meta: { title: '考试题库' } },
        { path: '/Question/ExamDetail', name: 'ExamDetail', component: () => import('@/views/question/ExamDetail'), meta: { title: ['libraryName'], isBack: true, backName: 'Exam', isHide: true } },
        {
            path: '/Question/ExamDetail/Add', name: 'ExamDetailAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '添加', parentTitle: '题目', msg: 'form', isBack: true, backName: 'ExamDetail', backPara: ['libraryId', 'libraryName'], isHide: true,
                form: ['questionTitle', 'questionType', 'atitle', 'btitle', 'ctitle', 'dtitle', 'rightAnswer', 'tips'], isRequired: ['questionTitle', 'questionType', 'atitle', 'btitle', 'rightAnswer'], api: 'examDetailForm'
            }
        },
        {
            path: '/Question/ExamDetail/Edit', name: 'ExamDetailEdit', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '编辑', parentTitle: '题目', msg: 'form', isBack: true, backName: 'ExamDetail', backPara: ['libraryId', 'libraryName'], isHide: true,
                form: ['questionTitle', 'questionType', 'atitle', 'btitle', 'ctitle', 'dtitle', 'rightAnswer', 'tips'], isRequired: ['questionTitle', 'questionType', 'atitle', 'btitle', 'rightAnswer'], api: 'examDetailForm'
            }
        },
        { path: '/Question/Setting', name: 'QuestionSetting', component: () => import('@/views/question/Setting'), meta: { title: '组卷规则配置' } },
        {
            path: '/Question/Setting/Add', name: 'QuestionSettingAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '添加', parentTitle: '组卷规则配置', msg: 'form', isBack: true, backName: 'QuestionSetting', isHide: true,
                form: ['industryId', 'positionTypeId', 'educationType2.0', 'examinationPaperRulesPercentList'], isRequired: 'all', api: 'settingSave'
            }
        },
        {
            path: '/Question/Setting/Edit', name: 'QuestionSettingEdit', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '编辑', parentTitle: '组卷规则配置', msg: 'form', isBack: true, backName: 'QuestionSetting', isHide: true,
                form: ['industryId', 'positionTypeId', 'educationType2.0', 'examinationPaperRulesPercentList',], isRequired: 'all', api: 'settingUpdate'
            }
        }
    ]
}