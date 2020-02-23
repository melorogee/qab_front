export default {
    path: '/System',
    redirect: '/System/New',
    meta: { title: '系统管理', icon: 'iconsetting' },
    component: () => import('@/components/Content'),
    children: [
        { path: '/System/Account', name: 'Account', component: () => import('@/views/system/Account'), meta: { title: '系统账号管理' } },
        {
            path: '/System/Account/Add', name: 'AccountAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '创建', parentTitle: '系统账号', msg: 'form', isBack: true, backName: 'Account', isHide: true,
                form: ['userName', 'loginName', 'password', 'menuIdList'], isRequired: 'all', api: 'userAdd'
            }
        },
        {
            path: '/System/Account/Edit', name: 'AccountEdit', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '创建', parentTitle: '系统账号', msg: 'form', isBack: true, backName: 'New', isHide: true,
                form: ['userName', 'loginName', 'password', 'menuIdList'], isRequired: 'all', api: 'userEdit'
            }
        },
        { path: '/System/AccountSetting', name: 'AccountSetting', component: () => import('@/views/system/AccountSetting'), meta: { title: '账户设置' } },
    ]
}