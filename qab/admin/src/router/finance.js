export default {
    path: '/Finance',
    redirect: '/Finance/Bill',
    meta: { title: '财务管理', icon: 'iconwallet-fill' },
    component: () => import('@/components/Content'),
    children: [
        { path: '/Finance/Split', name: 'Split', component: () => import('@/views/finance/Split'), meta: { title: '平台结算管理' } },
        { path: '/Finance/SplitDetailWZ', name: 'SplitDetailWZ', component: () => import('@/views/finance/SplitDetailWZ'), meta: { title: '结算', isBack: true, backName: 'Split', isHide: true } },
        { path: '/Finance/SplitDetailYJ', name: 'SplitDetailYJ', component: () => import('@/views/finance/SplitDetailYJ'), meta: { title: '结算', isBack: true, backName: 'Split', isHide: true, } },
        { path: '/Finance/Income', name: 'Income', component: () => import('@/views/finance/Income'), meta: { title: '考试收入' } },
        { path: '/Finance/Withdraw', name: 'Withdraw', component: () => import('@/views/finance/Withdraw'), meta: { title: '提现申请' } },
        { path: '/Finance/Report', name: 'Report', component: () => import('@/views/finance/Report'), meta: { title: '财务报表' } },
    ]
}