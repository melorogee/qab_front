import instance from '@/api/instance'
export const inquiryList = data => { return instance({ url: `/order/consultation/list`, method: 'GET', params: data }) }
export const inquiryReminder = data => { return instance({ url: `/order/consultation/reminder`, method: 'GET', params: data }) }
export const inquiryDetail = data => { return instance({ url: `/order/consultation/detail`, method: 'GET', params: data }) }
export const inquiryDelete = data => { return instance({ url: `/order/consultation/delete`, method: 'GET', params: data }) }
export const inquiryClosed = data => { return instance({ url: `/order/consultation/closed`, method: 'GET', params: data }) }

export const callList = data => { return instance({ url: `/orderCall/list`, method: 'GET', params: data }) }
export const callDetail = data => { return instance({ url: `/orderCall/getByOrderId`, method: 'GET', params: data }) }
export const inquiryDunning = data => { return instance({ url: `/orderCall/dunning`, method: 'GET', params: data }) }
export const inquiryClose = data => { return instance({ url: `/orderCall/close`, method: 'GET', params: data }) }



export const registerList = data => { return instance({ url: `/order/examination/enroll/list`, method: 'GET', params: data }) }
export const registerDetail = data => { return instance({ url: `/order/examination/enroll/detail`, method: 'GET', params: data }) }
export const registerDelete = data => { return instance({ url: `/order/examination/enroll/delete`, method: 'GET', params: data }) }
export const registerClosed = data => { return instance({ url: `/order/examination/enroll/closed`, method: 'GET', params: data }) }
