export default {
    path: '/Order',
    redirect: '/Order/Inquiry',
    meta: { title: '订单管理', icon: 'iconsnippets-fill' },
    component: () => import('@/components/Content'),
    children: [
        // { path: '/Order/Inquiry', name: 'Inquiry', component: () => import('@/views/order/Inquiry'), meta: { title: '问诊订单' } },
        // { path: '/Order/Inquiry/Detail', name: 'InquiryDetail', component: () => import('@/views/order/InquiryDetail'), meta: { title: '问诊订单详情', isBack: true, backName: 'Inquiry', isHide: true } },
        { path: '/Order/Call', name: 'Call', component: () => import('@/views/order/Call'), meta: { title: '约叫订单' } },
        { path: '/Order/Call/Detail', name: 'CallDetail', component: () => import('@/views/order/CallDetail'), meta: { title: '约叫订单详情', isBack: true, backName: 'Call', isHide: true } },
        { path: '/Order/Register', name: 'Register', component: () => import('@/views/order/Register'), meta: { title: '报考订单' } },
        { path: '/Order/Register/Detail', name: 'RegisterDetail', component: () => import('@/views/order/RegisterDetail'), meta: { title: '报考订单详情', isBack: true, backName: 'Register', isHide: true } },
    ]
}