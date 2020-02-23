import instance from '@/api/instance'
export const enterpriseUserList = data => { return instance({ url: `/enterpriseUser/list`, method: 'GET', params: data }) }
export const enterpriseUserAdd = data => { return instance({ url: `/enterpriseUser/add`, method: 'POST', data }) }
export const enterpriseUserDetail = data => { return instance({ url: `/enterpriseUser/getById`, method: 'GET', params: data }) }
export const enterpriseUserReview = data => { return instance({ url: `/enterpriseUser/review`, method: 'GET', params: data }) }
export const enterpriseUserDelete = data => { return instance({ url: `/enterpriseUser/delete`, method: 'POST', data }) }

export const expertUserList = data => { return instance({ url: `/expertUser/list`, method: 'GET', params: data }) }
export const expertUserAdd = data => { return instance({ url: `/expertUser/add`, method: 'POST', data }) }
export const expertUserDetail = data => { return instance({ url: `/expertUser/getById`, method: 'GET', params: data }) }
export const expertUserReview = data => { return instance({ url: `/expertUser/review`, method: 'POST', data }) }
export const getServiceItemsById = data => { return instance({ url: `/expertUser/getServiceItemsById`, method: 'GET', params: data }) }
export const expertUserDelete = data => { return instance({ url: `/expertUser/delete`, method: 'POST', data }) }

export const superviseUserList = data => { return instance({ url: `/superviseUser/list`, method: 'GET', params: data }) }
export const superviseUserAdd = data => { return instance({ url: `/superviseUser/add`, method: 'POST', data }) }
export const superviseUserEdit = data => { return instance({ url: `/superviseUser/update`, method: 'POST', data }) }
export const superviseUserDetail = data => { return instance({ url: `/superviseUser/getById`, method: 'GET', params: data }) }
export const superviseUserReview = data => { return instance({ url: `/superviseUser/review`, method: 'POST', data }) }
export const superviseUserDelete = data => { return instance({ url: `/superviseUser/delete`, method: 'POST', data }) }

export const userSpecialList = data => { return instance({ url: `/expert/type/expert/special/list`, method: 'GET', params: data }) }
