
import instance from '@/api/instance'

//参加保险企业列表
export const queryInsureList = data => { return instance({ url: `/insured/enterprise/list`, method: 'GET', params: data }) }

export const expertList = data => { return instance({ url: `/insured/enterprise/expertUser/list`, method: 'GET', params: data }) }

export const initOtherList = data => { return instance({ url: `/insured/enterprise/other/service/type/list`, method: 'GET', params: data }) }

export const queryExpert = data => { return instance({ url: `/insured/enterprise/service/expertUser/list`, method: 'GET', params: data }) }

export const goDis = data => { return instance({ url: `/insured/enterprise/order`, method: 'POST', data }) }

export const disDetail = data => { return instance({ url: `/insured/enterprise/order/detail`, method: 'GET', params: data }) }

export const insureImport = data => { return instance({ url: `/insured/enterprise/import`, method: 'POST', data }) }

