
import instance from '@/api/instance'
// 教育培训配置 - 行业类型配置
export const splitList = data => { return instance({ url: `/splitAccount/list`, method: 'GET', params: data }) }
export const splitGetByOrderId = data => { return instance({ url: `/splitAccount/getByOrderId`, method: 'GET', params: data }) }
export const splitAccount = data => { return instance({ url: `/splitAccount/splitAccount`, method: 'GET', params: data }) }


export const incomeList = data => { return instance({ url: `/order/examination/enroll/list`, method: 'GET', params: data }) }

export const withdrawList = data => { return instance({ url: `/withdraw/list`, method: 'GET', params: data }) }
export const confirmPayment = data => { return instance({ url: `/withdraw/confirmPayment`, method: 'GET', params: data }) }
export const auditReject = data => { return instance({ url: `/withdraw/auditReject`, method: 'GET', params: data }) }


export const finance = data => { return instance({ url: `/finance/list`, method: 'GET', params: data }) }
export const sourceOfIncome = data => { return instance({ url: `/finance/sourceOfIncome`, method: 'GET', params: data }) }
