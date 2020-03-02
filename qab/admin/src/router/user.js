export default {
    path: '/User',
    redirect: '/User/New',
    meta: { title: '用户管理', icon: 'iconuser' },
    component: () => import('@/components/Content'),
    children: [
        { path: '/User/New', name: 'New', component: () => import('@/views/user/New'), meta: { title: '新注册用户' } },
        {
            path: '/User/New/enterpriseUserAdd', name: 'enterpriseUserAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '新增', parentTitle: '企业用户', msg: 'form', isBack: true, backName: 'New', isHide: true,
                form: ['enterpriseUser', 'idCode', 'businessLicenseUrl', 'districtCode', 'fullAddr', 'industryId', 'phone', 'password'], isRequired: 'all', api: 'enterpriseUserAdd'
            }
        },
        {
            path: '/User/New/expertUserAdd', name: 'expertUserAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '新增', parentTitle: '专家/特殊工种', msg: 'form', isBack: true, backName: 'New', isHide: true,
                form: ['expertUser', 'id', 'certificateUrl', 'districtCode', 'industryId', 'type', 'qualifications', 'fullAddr', 'phone', 'password', 'serviceItemsList', 'platformFee'], isRequired: 'all', api: 'expertUserAdd'
            }
        },
        {
            path: '/User/New/superviseUserAdd', name: 'superviseUserAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '新增', parentTitle: '监管部门', msg: 'form', isBack: true, backName: 'New', isHide: true,
                form: ['superviseUser', 'phone', 'districtCode', 'department', 'fullAddr', 'password'], isRequired: 'all', api: 'superviseUserAdd'
            }
        },
        {
            path: '/User/New/superviseUserEdit', name: 'superviseUserEdit', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '编辑', parentTitle: '监管部门', msg: 'form', isBack: true, backName: 'New', isHide: true,
                form: ['superviseUser', 'phone', 'districtCode', 'department', 'fullAddr'], isRequired: 'all', api: 'superviseUserEdit'
            }
        },

        { path: '/User/Has', name: 'Has', component: () => import('@/views/user/Has'), meta: { title: '已注册用户' } },
        {
            path: '/User/Has/enterpriseUserAdd', name: 'enterpriseUserCAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '新增', parentTitle: '企业用户', msg: 'form', isBack: true, backName: 'Has', isHide: true,
                form: ['enterpriseUser', 'idCode', 'businessLicenseUrl', 'districtCode', 'fullAddr', 'industryId', 'phone', 'password'], isRequired: 'all', api: 'enterpriseUserAdd'
            }
        },
        {
            path: '/User/Has/expertUserAdd', name: 'expertUserCAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '新增', parentTitle: '专家/特殊工种', msg: 'form', isBack: true, backName: 'Has', isHide: true,
                form: ['expertUser', 'id', 'certificateUrl', 'districtCode', 'industryId', 'type', 'qualifications', 'fullAddr', 'phone', 'password', 'serviceItemsList', 'platformFee'], isRequired: 'all', api: 'expertUserAdd'
            }
        },
        {
            path: '/User/Has/superviseUserAdd', name: 'superviseUserCAdd', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '新增', parentTitle: '监管部门', msg: 'form', isBack: true, backName: 'Has', isHide: true,
                form: ['superviseUser', 'phone', 'districtCode', 'department', 'fullAddr', 'password'], isRequired: 'all', api: 'superviseUserAdd'
            }
        },
        {
            path: '/User/Has/superviseUserEdit', name: 'superviseUserCEdit', component: () => import('@/components/SubmitForm'),
            meta: {
                title: '编辑', parentTitle: '监管部门', msg: 'form', isBack: true, backName: 'Has', isHide: true,
                form: ['superviseUser', 'phone', 'districtCode', 'department', 'fullAddr'], isRequired: 'all', api: 'superviseUserEdit'
            }
        },
    ]
}