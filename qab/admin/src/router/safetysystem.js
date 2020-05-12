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
    path: '/Safetysystem',
    redirect: '/Safetysystem/Threepic',
    meta: { title: '安全风险管控体系', icon: 'iconread' },
    component: () => import('@/components/Content'),
    children: [
        { path: '/Safetysystem/Threepic', name: 'Threepic', component: () => import('@/views/safetysystem/threepic'), meta: { title: '三图' } },
        { path: '/Safetysystem/Threepic2', name: 'Threepic2', component: () => import('@/views/safetysystem/threepic2'), meta: { title: '三图' } },

    ]
}