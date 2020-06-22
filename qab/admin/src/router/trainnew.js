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
    path: '/Trainnew',
    redirect: '/Trainnew/Addyear',
    meta: { title: '教育培训', icon: 'iconread' },
    component: () => import('@/components/Content'),
    children: [
        { path: '/Trainnew/Yearplan', name: 'Yearplan', component: () => import('@/views/trainnew/Yearplan'), meta: { title: '年度计划' } },
        { path: '/Trainnew/YearplanAdd', name: 'YearplanAdd', component: () => import('@/views/trainnew/YearplanAdd'),
            meta: {
                title: '新增计划', parentTitle: '年度培训计划', isBack: true, backName: 'Yearplan', isHide: true,
            }
        },
        { path: '/Trainnew/Trainnewdetail', name: 'Trainnewdetail', component: () => import('@/views/trainnew/Trainnewdetail'), meta: { title: '实施培训' } },
        { path: '/Trainnew/Examnew', name: 'Examnew', component: () => import('@/views/trainnew/Examnew'), meta: { title: '组织考试' } }
    ]
}