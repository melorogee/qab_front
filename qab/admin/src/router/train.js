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
    path: '/Train',
    redirect: '/Train/Materials',
    meta: { title: '培训管理', icon: 'iconread' },
    component: () => import('@/components/Content'),
    children: [
        { path: '/Train/Archives', name: 'Archives', component: () => import('@/views/train/Archives'), meta: { title: '培训档案' } },
        { path: '/WebSite/Activity', name: 'Activity', component: () => import('@/views/website/Activity'), meta: { title: '自选课资料' } },
        {
            path: '/WebSite/Activity/CaseAdd', name: 'CaseAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '添加', parentTitle: '自选课资料', msg: 'form', isBack: true, backName: 'Activity', isHide: true,
                form: ['title', 'classHour', 'icon', 'introduce', 'educationType', 'content'], isRequired: 'all', api: 'caseSave'
            }
        },
        {
            path: '/WebSite/Activity/CaseEdit', name: 'CaseEdit', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '编辑', parentTitle: '自选课资料', msg: 'form', isBack: true, backName: 'Activity', isHide: true,
                form: ['title', 'classHour', 'icon', 'introduce', 'educationType', 'content'], isRequired: 'all', api: 'caseUpdate'
            }
        },
        { path: '/Train/Materials', name: 'Materials', component: () => import('@/views/train/Materials'), meta: { title: '必选课资料' } },
        {
            path: '/Train/Materials/Add', name: 'MaterialsAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '添加', parentTitle: '必选课资料', msg: 'form', isBack: true, backName: 'Materials', isHide: true,
                form: ['name', 'courseTypeId', 'educationType2.0', 'classHour', 'content'], isRequired: 'all', api: 'materialsSave'
            }
        },
        {
            path: '/Train/Materials/Import', name: 'MaterialsImport', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '批量导入', parentTitle: '必选课资料', msg: 'import', isBack: true, backName: 'Materials', isHide: true,
                form: ['courseTypeId', 'educationType2.0', 'classHour', 'importList'], isRequired: 'all', api: 'materialsImport'
            }
        },
        // { path: '/Train/Statutes', name: 'Statutes', component: () => import('@/views/train/Statutes'), meta: { title: '法规条文' } },
        // {
        //     path: '/Train/Statutes/Add', name: 'StatutesAdd', component: () => import('@/components/SubmitForm'),
        //     meta: {
        //         title: '添加', parentTitle: '法规条文', msg: 'form', isBack: true, backName: 'Statutes', isHide: true,
        //         form: ['name', 'districtCode', 'industryId', 'positionTypeId', 'classHour', 'content'], isRequired: [], api: 'statutesSave'
        //     }
        // },
        // {
        //     path: '/Train/Statutes/Import', name: 'StatutesImport', component: () => import('@/components/SubmitForm'),
        //     meta: {
        //         title: '批量导入', parentTitle: '法规条文', msg: 'import', isBack: true, backName: 'Statutes', isHide: true,
        //         form: ['districtCode', 'industryId', 'positionTypeId', 'classHour', 'importList'], isRequired: [], api: 'statutesImport'
        //     }
        // }
    ]
}