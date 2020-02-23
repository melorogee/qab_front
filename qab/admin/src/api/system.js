import instance from '@/api/instance'
export const login = data => { return instance({ url: `/login`, method: 'GET', params: data }) }
export const menuList = data => { return instance({ url: `/menu/list`, method: 'GET', params: data }) }
export const userList = data => { return instance({ url: `/user/list`, method: 'GET', params: data }) }
export const userAdd = data => { return instance({ url: `/user/add`, method: 'POST', data }) }
export const userDelete = data => { return instance({ url: `/user/delete`, method: 'POST', data }) }
export const userUpdatePwd = data => { return instance({ url: `/user/updatePwd`, method: 'POST', data }) }
export const userUpdateUserName = data => { return instance({ url: `/user/updateUserName`, method: 'GET', params: data }) }