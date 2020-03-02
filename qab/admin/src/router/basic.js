export default {
    path: '/Basic',
    redirect: '/Basic/Setting',
    meta: { title: '基础数据配置', icon: 'iconfolder-add-fill' },
    component: () => import('@/components/Content'),
    children: [
        { path: '/Basic/Education', name: 'BasicEducation', component: () => import('@/views/basic/Education'), meta: { title: '教育培训配置' } },
        { path: '/Basic/Expert', name: 'BasicExpert', component: () => import('@/views/basic/Expert'), meta: { title: '专家类型配置' } },
        { path: '/Basic/Special', name: 'BasicSpecial', component: () => import('@/views/basic/Special'), meta: { title: '特殊作业人员配置' } },
    ]
}