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
    path: '/Employee',
    redirect: '/Employee/EmployeeMgn',
    meta: { title: '员工管理', icon: 'iconread' },
    component: () => import('@/components/Content'),
    children: [
        { path: '/Employee/EmployeeMgn', name: 'employeeMgn', component: () => import('@/views/employee/employeeMgn'), meta: { title: '员工管理' } },
        {
            path: '/Employee/EmployeeAdd', name: 'employeeAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '新增', parentTitle: '员工', msg: 'form', isBack: true, backName: 'employeeMgn', isHide: true,
                form: ['empolyeeName', 'dept', 'positionEmploy',
                    // 'hiredate',
                    'employPhone'], isRequired: 'all', api: 'employeeAdd'
            }
        },
    ]
}