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
        { path: '/Trainnew/YearplanAdd', name: 'YearplanAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '新增计划', parentTitle: '年度培训计划', isBack: true, backName: 'Yearplan', isHide: true,
                form: ['trainnewMonth','trainnewResult','trainnewTitle','trainnewContent'], isRequired: 'all', api: 'saveYearPlan'
            }
        },
        { path: '/Trainnew/Trainnewdetail', name: 'Trainnewdetail', component: () => import('@/views/trainnew/Trainnewdetail'), meta: { title: '实施培训' } },

        { path: '/Trainnew/Trainnewdetail_sub', name: 'Trainnewdetail_sub', component: () => import('@/views/trainnew/Trainnewdetail_sub'),
            meta: { title: '培训详情', parentTitle: '实施培训', isBack: true, backName: 'Trainnewdetail', isHide: true }
        },
        { path: '/Trainnew/Trainnewdetail_sub1', name: 'Trainnewdetail_sub1', component: () => import('@/views/trainnew/Trainnewdetail_sub1'),
            meta: { title: '培训详情', parentTitle: '实施培训', isBack: true, backName: 'Trainnewdetail', isHide: true }
        },
        { path: '/Trainnew/Examnew', name: 'Examnew', component: () => import('@/views/trainnew/Examnew'), meta: { title: '组织考试' } },
        { path: '/Trainnew/TrainnewData', name: 'TrainnewData', component: () => import('@/views/trainnew/TrainnewData'), meta: { title: '培训统计' } },
        { path: '/Trainnew/Trainnewdetail_add', name: 'Trainnewdetail_add', component: () => import('@/views/trainnew/Trainnewdetail_add'),
            meta: { title: '新增新员工培训', parentTitle: '实施培训', isBack: true, backName: 'Trainnewdetail_add', isHide: true }
        },
        { path: '/Trainnew/Trainnewdetail_add1', name: 'Trainnewdetail_add1', component: () => import('@/views/trainnew/Trainnewdetail_add1'),
            meta: { title: '新增全员工培训', parentTitle: '实施培训', isBack: true, backName: 'Trainnewdetail_add1', isHide: true }
        },
    ]
}