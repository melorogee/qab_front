export default {
    path: '/Basic',
    redirect: '/Basic/Setting',
    meta: { title: '基础数据配置', icon: 'iconfolder-add-fill' },
    component: () => import('@/components/Content'),
    children: [
        { path: '/Basic/Education', name: 'BasicEducation', component: () => import('@/views/basic/Education'), meta: { title: '教育培训配置' } },
        { path: '/Basic/Expert', name: 'BasicExpert', component: () => import('@/views/basic/Expert'), meta: { title: '专家类型配置' } },
        { path: '/Basic/Special', name: 'BasicSpecial', component: () => import('@/views/basic/Special'), meta: { title: '特殊作业人员配置' } },
        { path: '/Basic/Service', name: 'ServiceList', component: () => import('@/views/basic/ServiceList'), meta: { title: '服务内容配置'} },
        { path: '/Basic/ServiceAdd', name: 'ServiceAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '添加', parentTitle: '服务项目', msg: 'form', isBack: true, backName: 'ServiceList', isHide: true,
                form: ['serviceName'], isRequired: 'all', api: 'serviceAdd'

                // form: ['title', 'classHour', 'icon', 'introduce', 'educationType', 'content'], isRequired: 'all', api: 'caseSave'
            }
        },

    ]
}