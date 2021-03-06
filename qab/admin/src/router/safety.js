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
    path: '/Safety',
    redirect: '/Safety/SafetyStatics',
    meta: { title: '安全隐患管理', icon: 'el-icon-s-opportunity' },
    component: () => import('@/components/Content'),
    children: [
        { path: '/Safety/SafetyStatics', name: 'safetyStatics', component: () => import('@/views/safety/SafetyStatics'), meta: { title: '安全隐患统计' } },
        { path: '/Safety/OrgSelfCheck', name: 'orgSelfCheck', component: () => import('@/views/safety/orgSelfCheck'), meta: { title: '企业自查隐患' } },
        { path: '/Safety/OrderService', name: 'orderService', component: () => import('@/views/safety/orderService'), meta: { title: '订单服务隐患' } },
        { path: '/Safety/EmployeeSelfCheck', name: 'employeeSelfCheck', component: () => import('@/views/safety/employeeSelfCheck'), meta: { title: '员工上报隐患' } },
        { path: '/Safety/EmployeeSuggest', name: 'employeeSuggest', component: () => import('@/views/safety/employeeSuggest'), meta: { title: '员工建议' } },


    ]
}