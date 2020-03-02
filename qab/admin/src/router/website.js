export default {
    path: '/WebSite',
    redirect: '/WebSite/Banner',
    meta: { title: '考试报名管理', icon: 'iconlayout-fill' },
    component: () => import('@/components/Content'),
    children: [
        // { path: '/WebSite/Banner', name: 'Banner', component: () => import('@/views/website/Banner'), meta: { title: 'banner管理' } },
        { path: '/WebSite/Template', name: 'Template', component: () => import('@/views/website/Template'), meta: { title: '正式考报名表管理' } } 
    ]
}